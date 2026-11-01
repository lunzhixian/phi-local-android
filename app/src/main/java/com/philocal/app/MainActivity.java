package com.philocal.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ContentValues;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Rect;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.provider.MediaStore;
import android.util.Base64;
import android.view.PixelCopy;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.Toast;

import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Iterator;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.zip.GZIPInputStream;

/**
 * 单 Activity + WebView 壳。
 *
 * 成绩图：用 setInitialScale 把「1200 CSS px 宽的卡片」正好缩放到屏幕物理宽度，
 * 于是排版宽度就是 1200 CSS px，整张卡片按真实像素绘制在屏幕上；
 * 再用 PixelCopy 抓窗口像素（不是 View.draw），按物理宽度缩放到 1200px 后纵向拼接。
 */
public class MainActivity extends Activity {

    private static final String ASSET_HOST = "appassets.local";
    private static final int CARD_CSS_W = 1200;

    private FrameLayout root;
    private WebView webView;
    private boolean loadedFallback = false;

    private final ExecutorService pool = Executors.newFixedThreadPool(3);

    private FrameLayout captureHost;
    private WebView captureView;
    private String captureCallback;
    private String captureMode;
    private String captureData;

    private int cardCssH = 1200;
    private int cardCssW = CARD_CSS_W;
    private float lastScale = 1f;
    private int tileCount = 0;
    private String captureMeta = "";
    private int viewWidthPx = 0;
    private int viewHeightPx = 0;
    private float zoom = 0.32f;
    private int tileCssH = 1000;
    private Bitmap outBitmap;
    private Canvas outCanvas;

    private final StringBuilder diag = new StringBuilder();

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setStatusBarColor(Color.parseColor("#07090f"));
        getWindow().setNavigationBarColor(Color.parseColor("#07090f"));

        root = new FrameLayout(this);
        root.setBackgroundColor(Color.parseColor("#07090f"));

        webView = new WebView(this);
        webView.setBackgroundColor(Color.parseColor("#07090f"));
        webView.setOverScrollMode(View.OVER_SCROLL_NEVER);
        configure(webView.getSettings());
        webView.addJavascriptInterface(new Bridge(), "NativeBridge");
        webView.setWebViewClient(new AssetClient() {
            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, android.webkit.WebResourceError error) {
                if (request.isForMainFrame() && !loadedFallback) {
                    loadedFallback = true;
                    view.loadUrl("file:///android_asset/www/index.html");
                }
            }
        });
        root.addView(webView, new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        setContentView(root);

        webView.loadUrl("https://" + ASSET_HOST + "/index.html");

    }

    private void configure(WebSettings s) {
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccess(true);
        s.setAllowFileAccessFromFileURLs(true);
        s.setAllowUniversalAccessFromFileURLs(true);
        s.setLoadsImagesAutomatically(true);
        s.setBlockNetworkImage(false);
        s.setSupportZoom(false);
        s.setBuiltInZoomControls(false);
        s.setTextZoom(100);
        s.setUseWideViewPort(false);
        s.setLoadWithOverviewMode(false);
        s.setCacheMode(WebSettings.LOAD_DEFAULT);
    }

    private class AssetClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            return true;
        }

        @Override
        public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
            String host = request.getUrl().getHost();
            if (!ASSET_HOST.equals(host)) return null;
            String path = request.getUrl().getPath();
            if (path == null || path.isEmpty() || path.equals("/")) path = "/index.html";
            if (path.startsWith("/card/")) {
                try {
                    java.io.File f = new java.io.File(cardDir(), path.substring("/card/".length()));
                    return new WebResourceResponse("image/png", null, new java.io.FileInputStream(f));
                } catch (Exception e) {
                    return notFound();
                }
            }
            String assetPath = "www" + path;
            try {
                return new WebResourceResponse(mimeOf(assetPath), "UTF-8", getAssets().open(assetPath));
            } catch (Exception e) {
                return notFound();
            }
        }
    }

    private WebResourceResponse notFound() {
        return new WebResourceResponse("text/plain", "UTF-8", 404, "Not Found",
                new HashMap<>(), new java.io.ByteArrayInputStream(new byte[0]));
    }

    private String mimeOf(String path) {
        if (path.endsWith(".html")) return "text/html";
        if (path.endsWith(".js")) return "application/javascript";
        if (path.endsWith(".css")) return "text/css";
        if (path.endsWith(".json")) return "application/json";
        if (path.endsWith(".png")) return "image/png";
        if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
        if (path.endsWith(".webp")) return "image/webp";
        if (path.endsWith(".svg")) return "image/svg+xml";
        if (path.endsWith(".ttf")) return "font/ttf";
        if (path.endsWith(".otf")) return "font/otf";
        if (path.endsWith(".woff")) return "font/woff";
        if (path.endsWith(".woff2")) return "font/woff2";
        return "application/octet-stream";
    }

    private java.io.File cardDir() {
        java.io.File dir = new java.io.File(getCacheDir(), "cards");
        if (!dir.exists()) dir.mkdirs();
        return dir;
    }

    @Override
    public void onBackPressed() {
        webView.evaluateJavascript(
                "(function(){var s=document.getElementById('sheet');" +
                        "if(s&&s.classList.contains('show')){document.getElementById('sheetMask').click();return 'sheet';}" +
                        "return 'exit';})()",
                value -> {
                    if (value == null || !value.contains("sheet")) finish();
                });
    }

    @Override
    protected void onDestroy() {
        pool.shutdownNow();
        destroyCapture();
        if (webView != null) webView.destroy();
        super.onDestroy();
    }

    private void log(String msg) {
        android.util.Log.i("PhiCard", msg);
        diag.append(System.currentTimeMillis() % 100000).append("ms ").append(msg).append('\n');
    }

    private void flushDiag() {
        try {
            java.io.File ext = getExternalFilesDir(null);
            if (ext != null) {
                try (java.io.FileOutputStream fos = new java.io.FileOutputStream(new java.io.File(ext, "phi-diag.txt"))) {
                    fos.write(diag.toString().getBytes("UTF-8"));
                }
            }
        } catch (Exception ignored) { }
    }

    private void resolve(String callbackId, String json) {
        final String js = "window.__nativeResolve(" + JSONObject.quote(callbackId) + "," + JSONObject.quote(json) + ");";
        runOnUiThread(() -> {
            if (webView != null) webView.evaluateJavascript(js, null);
        });
    }

    private void resolveImage(String callbackId, String json) {
        final String js = "window.__imageResult(" + JSONObject.quote(callbackId) + "," + JSONObject.quote(json) + ");";
        runOnUiThread(() -> {
            if (webView != null) webView.evaluateJavascript(js, null);
        });
    }

    public class Bridge {

        @JavascriptInterface
        public void httpGet(String url, String headersJson, String callbackId) {
            pool.execute(() -> resolve(callbackId, fetch(url, headersJson, false)));
        }

        @JavascriptInterface
        public void httpGetBase64(String url, String headersJson, String callbackId) {
            pool.execute(() -> resolve(callbackId, fetch(url, headersJson, true)));
        }

        @JavascriptInterface
        public void renderCard(String dataJson, String mode, String callbackId) {
            runOnUiThread(() -> startCapture(dataJson, mode, callbackId));
        }

        @JavascriptInterface
        public void saveImage(String base64, String name, String callbackId) {
            pool.execute(() -> resolveImage(callbackId, saveBase64(base64, name, false)));
        }

        @JavascriptInterface
        public void shareImage(String base64, String name, String callbackId) {
            pool.execute(() -> resolveImage(callbackId, saveBase64(base64, name, true)));
        }

        @JavascriptInterface
        public void toast(String text) {
            runOnUiThread(() -> Toast.makeText(MainActivity.this, text, Toast.LENGTH_SHORT).show());
        }

        @JavascriptInterface
        public String appVersion() {
            return "1.5.0";
        }
    }

    private void startCapture(String dataJson, String mode, String callbackId) {
        destroyCapture();
        captureData = dataJson;
        captureMode = mode;
        captureCallback = callbackId;

        android.util.DisplayMetrics dm = getResources().getDisplayMetrics();
        float density = Math.max(1f, dm.density);
        viewWidthPx = root.getWidth() > 0 ? root.getWidth() : dm.widthPixels;
        viewHeightPx = root.getHeight() > 0 ? root.getHeight() : dm.heightPixels;

        zoom = viewWidthPx / ((float) CARD_CSS_W * density);
        int percent = Math.max(10, Math.round(zoom * 100));
        log("start view=" + viewWidthPx + "x" + viewHeightPx + " density=" + density
                + " zoom=" + zoom + " initialScale=" + percent);

        captureHost = new FrameLayout(this);
        captureHost.setBackgroundColor(Color.WHITE);

        captureView = new WebView(this);
        captureView.setBackgroundColor(Color.WHITE);
        configure(captureView.getSettings());
        captureView.getSettings().setUseWideViewPort(true);
        captureView.getSettings().setLoadWithOverviewMode(true);
        captureView.addJavascriptInterface(new CaptureBridge(), "CaptureBridge");
        captureView.setWebViewClient(new AssetClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                log("page finished");
                try {
                    view.evaluateJavascript("window.__render(" + JSONObject.quote(captureData) + ")", null);
                } catch (Throwable t) {
                    log("evaluate failed " + t);
                }
            }
        });
        captureHost.addView(captureView, new FrameLayout.LayoutParams(viewWidthPx, viewHeightPx));
        root.addView(captureHost, new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        captureView.loadUrl("https://" + ASSET_HOST + "/plugin/render.html");
    }

    private class CaptureBridge {
        @JavascriptInterface
        public void readyInfo(int w, int h, String info) {
            runOnUiThread(() -> {
                log("page info " + info + " css=" + w + "x" + h);
                cardCssH = Math.max(1, h);
                int cssW = w > 0 ? w : CARD_CSS_W;
                cardCssW = cssW;
                float physPerCss = viewWidthPx / (float) cssW;
                tileCssH = Math.max(200, (int) (viewHeightPx / Math.max(0.2f, physPerCss)));
                log("physPerCss=" + physPerCss + " tileCssH=" + tileCssH);
                outBitmap = Bitmap.createBitmap(cssW, cardCssH, Bitmap.Config.ARGB_8888);
                outCanvas = new Canvas(outBitmap);
                outCanvas.drawColor(Color.WHITE);
                captureTilePhys(0);
            });
        }

        @JavascriptInterface
        public void ready(int w, int h) {
            readyInfo(w, h, "{}");
        }

        @JavascriptInterface
        public void fail(String msg) {
            runOnUiThread(() -> {
                log("js fail " + msg);
                finishCapture(failJson("模板渲染失败：" + msg));
            });
        }
    }

    private void captureTilePhys(final int index) {
        if (captureView == null || outBitmap == null) return;
        final int offsetCss = index * tileCssH;
        if (offsetCss >= cardCssH) {
            finishCaptureImage();
            return;
        }
        captureView.evaluateJavascript("window.scrollTo(0," + offsetCss + ")", null);
        new Handler(Looper.getMainLooper()).postDelayed(() -> {
            if (captureView == null || outBitmap == null) return;
            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
                drawTileFallback(index, offsetCss);
                return;
            }
            try {
                final Bitmap tile = Bitmap.createBitmap(viewWidthPx, viewHeightPx, Bitmap.Config.ARGB_8888);
                Rect rect = new Rect(0, 0, viewWidthPx, viewHeightPx);
                PixelCopy.request(getWindow(), rect, tile, result -> {
                    if (result == PixelCopy.SUCCESS) {
                        float k = outBitmap.getWidth() / (float) viewWidthPx;
                        lastScale = k;
                        tileCount = index + 1;
                        outCanvas.save();
                        outCanvas.translate(0, offsetCss);
                        outCanvas.scale(k, k);
                        outCanvas.drawBitmap(tile, 0, 0, null);
                        outCanvas.restore();
                        log("tile " + index + " offset=" + offsetCss + " k=" + k);
                        tile.recycle();
                    } else {
                        log("tile " + index + " pixelcopy fail " + result);
                        tile.recycle();
                        drawTileFallback(index, offsetCss);
                        return;
                    }
                    captureTilePhys(index + 1);
                }, new Handler(Looper.getMainLooper()));
            } catch (Throwable t) {
                log("tile " + index + " exception " + t);
                drawTileFallback(index, offsetCss);
            }
        }, 340);
    }

    private void drawTileFallback(int index, int offsetCss) {
        if (captureView == null || outBitmap == null) return;
        log("tile " + index + " fallback view.draw");
        try {
            float k = outBitmap.getWidth() / (float) viewWidthPx;
            outCanvas.save();
            outCanvas.translate(0, offsetCss);
            outCanvas.scale(k, k);
            captureView.draw(outCanvas);
            outCanvas.restore();
        } catch (Throwable t) {
            log("fallback draw failed " + t);
        }
        captureTilePhys(index + 1);
    }

    private void finishCaptureImage() {
        Bitmap bmp = outBitmap;
        outBitmap = null;
        outCanvas = null;
        if (bmp == null) {
            finishCapture(failJson("截图为空"));
            return;
        }
        try {
            if (isBlank(bmp)) {
                log("image blank");
                finishCapture(failJson("截图空白"));
                return;
            }
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            bmp.compress(Bitmap.CompressFormat.PNG, 100, bos);
            byte[] png = bos.toByteArray();
            String name = "phi-card-" + System.currentTimeMillis() + ".png";
            try (java.io.FileOutputStream fos = new java.io.FileOutputStream(new java.io.File(cardDir(), name))) {
                fos.write(png);
                fos.flush();
            }
            log("captured " + bmp.getWidth() + "x" + bmp.getHeight() + " png=" + png.length);
            String result = writeToGallery(png, captureMode, name);
            log("gallery " + result);
            finishCapture(withPreview(result, name));
        } catch (Throwable t) {
            log("finish image failed " + t);
            finishCapture(failJson("保存失败：" + t.getMessage()));
        } finally {
            if (!bmp.isRecycled()) bmp.recycle();
        }
    }

    private boolean isBlank(Bitmap bmp) {
        int w = bmp.getWidth(), h = bmp.getHeight();
        int[][] pts = {{10, 10}, {w / 2, h / 2}, {w / 2, Math.max(1, h / 4)},
                {w - 11, Math.max(1, h - 11)}, {w / 3, Math.max(1, (int) (h * 0.75))}};
        for (int[] pt : pts) {
            int c = bmp.getPixel(Math.max(0, Math.min(w - 1, pt[0])), Math.max(0, Math.min(h - 1, pt[1])));
            int a = (c >>> 24) & 0xff, r = (c >> 16) & 0xff, g = (c >> 8) & 0xff, b = c & 0xff;
            if (a > 8 && !(r > 248 && g > 248 && b > 248)) return false;
        }
        return true;
    }

    private void finishCapture(String json) {
        log("finish " + (json != null && json.length() > 120 ? json.substring(0, 120) : json));
        flushDiag();
        String cb = captureCallback;
        captureCallback = null;
        destroyCapture();
        if (cb != null) resolveImage(cb, json);
    }

    private void destroyCapture() {
        if (outBitmap != null && !outBitmap.isRecycled()) outBitmap.recycle();
        outBitmap = null;
        outCanvas = null;
        captureMode = null;
        captureData = null;
        final FrameLayout host = captureHost;
        final WebView view = captureView;
        captureHost = null;
        captureView = null;
        if (host != null) {
            try {
                if (view != null) {
                    view.stopLoading();
                    host.removeView(view);
                    view.destroy();
                }
                root.removeView(host);
            } catch (Exception ignored) { }
        }
    }

    private String withPreview(String json, String name) {
        try {
            JSONObject o = new JSONObject(json);
            if (o.optBoolean("ok")) {
                o.put("preview", "https://" + ASSET_HOST + "/card/" + name);
            }
            return o.toString();
        } catch (Exception e) {
            return json;
        }
    }

    private String failJson(String msg) {
        try {
            JSONObject out = new JSONObject();
            out.put("ok", false);
            out.put("error", msg);
            return out.toString();
        } catch (Exception e) {
            return "{\"ok\":false}";
        }
    }

    private String saveBase64(String base64, String name, boolean share) {
        try {
            int comma = base64.indexOf(',');
            String pure = comma >= 0 ? base64.substring(comma + 1) : base64;
            return writeToGallery(Base64.decode(pure, Base64.DEFAULT), share ? "share" : "save", name);
        } catch (Exception e) {
            return failJson("保存失败：" + e.getMessage());
        }
    }

    private String writeToGallery(byte[] png, String mode, String name) {
        try {
            ContentValues values = new ContentValues();
            values.put(MediaStore.Images.Media.DISPLAY_NAME, name);
            values.put(MediaStore.Images.Media.MIME_TYPE, "image/png");
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                values.put(MediaStore.Images.Media.RELATIVE_PATH, "Pictures/PhiLocal");
                values.put(MediaStore.Images.Media.IS_PENDING, 1);
            }
            Uri uri = getContentResolver().insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);
            if (uri == null) throw new IllegalStateException("无法创建相册条目");
            try (java.io.OutputStream os = getContentResolver().openOutputStream(uri)) {
                if (os == null) throw new IllegalStateException("无法写入图片");
                os.write(png);
                os.flush();
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                ContentValues done = new ContentValues();
                done.put(MediaStore.Images.Media.IS_PENDING, 0);
                getContentResolver().update(uri, done, null, null);
            }
            if ("share".equals(mode)) {
                runOnUiThread(() -> {
                    Intent it = new Intent(Intent.ACTION_SEND);
                    it.setType("image/png");
                    it.putExtra(Intent.EXTRA_STREAM, uri);
                    it.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                    startActivity(Intent.createChooser(it, "分享成绩图"));
                });
            }
            JSONObject out = new JSONObject();
            out.put("ok", true);
            out.put("uri", uri.toString());
            return out.toString();
        } catch (Exception e) {
            return failJson("保存失败：" + e.getMessage());
        }
    }

    private String fetch(String url, String headersJson, boolean base64) {
        HttpURLConnection conn = null;
        try {
            conn = (HttpURLConnection) new URL(url).openConnection();
            conn.setConnectTimeout(15000);
            conn.setReadTimeout(30000);
            conn.setInstanceFollowRedirects(true);
            conn.setRequestProperty("Accept-Encoding", "gzip");
            if (headersJson != null && !headersJson.isEmpty()) {
                JSONObject h = new JSONObject(headersJson);
                Iterator<String> it = h.keys();
                while (it.hasNext()) {
                    String k = it.next();
                    conn.setRequestProperty(k, h.optString(k));
                }
            }
            int status = conn.getResponseCode();
            InputStream in = status >= 400 ? conn.getErrorStream() : conn.getInputStream();
            if ("gzip".equalsIgnoreCase(conn.getContentEncoding()) && in != null) {
                in = new GZIPInputStream(in);
            }
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            byte[] buf = new byte[16384];
            int n;
            while (in != null && (n = in.read(buf)) != -1) bos.write(buf, 0, n);
            byte[] bytes = bos.toByteArray();

            JSONObject out = new JSONObject();
            out.put("ok", status >= 200 && status < 300);
            out.put("status", status);
            out.put("body", base64 ? Base64.encodeToString(bytes, Base64.NO_WRAP) : new String(bytes, "UTF-8"));
            return out.toString();
        } catch (Exception e) {
            try {
                JSONObject out = new JSONObject();
                out.put("ok", false);
                out.put("status", 0);
                out.put("error", e.getClass().getSimpleName() + ": " + e.getMessage());
                return out.toString();
            } catch (Exception ignored) {
                return "{\"ok\":false,\"status\":0,\"error\":\"unknown\"}";
            }
        } finally {
            if (conn != null) conn.disconnect();
        }
    }
}
