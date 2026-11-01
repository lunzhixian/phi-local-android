package com.philocal.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.provider.MediaStore;
import android.util.Base64;
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
import java.util.Iterator;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.zip.GZIPInputStream;

public class MainActivity extends Activity {

    private static final String ASSET_HOST = "appassets.local";
    private static final int CARD_WIDTH = 1200;

    private FrameLayout root;
    private WebView webView;
    private boolean loadedFallback = false;

    /** 离屏渲染状态 */
    private FrameLayout captureHost;
    private WebView captureView;
    private String captureCallback;
    private String captureMode;
    private String captureData;
    private int captureW = CARD_WIDTH;
    private int captureH = 1200;
    private float pageDpr = 1f;
    private int tileCssH = 900;
    private int tileIndex = 0;
    private Bitmap tileBitmap;
    private Canvas tileCanvas;
    private int cssW = CARD_WIDTH;
    private int cssH = 1200;
    private int captureTries = 0;
    private final StringBuilder diag = new StringBuilder();

    private final ExecutorService pool = Executors.newFixedThreadPool(3);

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // 整页绘制：让 WebView.draw() 抓到完整文档，而不是仅可视区域
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            WebView.enableSlowWholeDocumentDraw();
        }

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

        // 安装后首次启动跑一次自检，诊断结果写入 Download/DSHA/phi-diag.txt
        android.content.SharedPreferences sp = getSharedPreferences("phi", MODE_PRIVATE);
        if (!sp.getBoolean("selftest_v2", false)) {
            sp.edit().putBoolean("selftest_v2", true).apply();
            webView.postDelayed(() -> {
                if (webView == null) return;
                log("self-test start");
                webView.evaluateJavascript(
                        "window.__selfTest ? window.__selfTest() : 'no-selftest'", null);
            }, 4000);
        }
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

    private java.io.File cardDir() {
        java.io.File dir = new java.io.File(getCacheDir(), "cards");
        if (!dir.exists()) dir.mkdirs();
        return dir;
    }

    /** 把 https://appassets.local/* 映射到 assets/www/* */
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
                    return new WebResourceResponse("text/plain", "UTF-8", 404, "Not Found",
                            new java.util.HashMap<>(), new java.io.ByteArrayInputStream(new byte[0]));
                }
            }
            String assetPath = "www" + path;
            try {
                InputStream in = getAssets().open(assetPath);
                return new WebResourceResponse(mimeOf(assetPath), "UTF-8", in);
            } catch (Exception e) {
                return new WebResourceResponse("text/plain", "UTF-8", 404, "Not Found",
                        new java.util.HashMap<>(), new java.io.ByteArrayInputStream(new byte[0]));
            }
        }
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

    /* ---------------- JS 桥 ---------------- */

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
            pool.execute(() -> resolveImage(callbackId, saveImageFromBase64(base64, name, false)));
        }

        @JavascriptInterface
        public void shareImage(String base64, String name, String callbackId) {
            pool.execute(() -> resolveImage(callbackId, saveImageFromBase64(base64, name, true)));
        }

        @JavascriptInterface
        public void toast(String text) {
            runOnUiThread(() -> Toast.makeText(MainActivity.this, text, Toast.LENGTH_SHORT).show());
        }

        @JavascriptInterface
        public String appVersion() {
            return "1.2.3";
        }
    }

    /* ---------------- 离屏渲染（原版模板 → 位图） ---------------- */

    private void log(String msg) {
        android.util.Log.i("PhiCard", msg);
        diag.append(System.currentTimeMillis() % 100000).append("ms ").append(msg).append('\n');
    }

    /** 把成图缩成 240px 宽的 JPEG，base64 写进文本文件，方便 adb 侧直接查看 */
    private void dumpPreview(Bitmap src, String tag) {
        try {
            int w = 240;
            int h = Math.max(1, Math.round(w * (float) src.getHeight() / src.getWidth()));
            Bitmap small = Bitmap.createScaledBitmap(src, w, h, true);
            ByteArrayOutputStream jb = new ByteArrayOutputStream();
            small.compress(Bitmap.CompressFormat.JPEG, 72, jb);
            small.recycle();
            String b64 = Base64.encodeToString(jb.toByteArray(), Base64.NO_WRAP);
            String text = "tag=" + tag + "\nsrc=" + src.getWidth() + "x" + src.getHeight()
                    + "\nsize=" + b64.length() + "\n" + b64 + "\n";
            java.io.File ext = getExternalFilesDir(null);
            if (ext != null) {
                try (java.io.FileOutputStream fos = new java.io.FileOutputStream(new java.io.File(ext, "phi-preview.b64.txt"))) {
                    fos.write(text.getBytes("UTF-8"));
                }
            }
            log("preview dumped " + w + "x" + h + " b64=" + b64.length());
        } catch (Throwable t) {
            log("preview dump failed " + t);
        }
    }

    private void writeDiag() {
        try {
            java.io.File ext = getExternalFilesDir(null);
            if (ext != null) {
                java.io.File f = new java.io.File(ext, "phi-diag.txt");
                try (java.io.FileOutputStream fos = new java.io.FileOutputStream(f)) {
                    fos.write(diag.toString().getBytes("UTF-8"));
                }
            }
        } catch (Exception e) {
            android.util.Log.e("PhiCard", "ext diag failed", e);
        }
        try {
            ContentValues v = new ContentValues();
            v.put(MediaStore.MediaColumns.DISPLAY_NAME, "phi-diag.txt");
            v.put(MediaStore.MediaColumns.MIME_TYPE, "text/plain");
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                v.put(MediaStore.MediaColumns.RELATIVE_PATH, "Download/DSHA");
                v.put(MediaStore.MediaColumns.IS_PENDING, 1);
            }
            Uri uri = getContentResolver().insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, v);
            if (uri == null) return;
            try (java.io.OutputStream os = getContentResolver().openOutputStream(uri)) {
                os.write(diag.toString().getBytes("UTF-8"));
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                ContentValues done = new ContentValues();
                done.put(MediaStore.MediaColumns.IS_PENDING, 0);
                getContentResolver().update(uri, done, null, null);
            }
        } catch (Exception e) {
            android.util.Log.e("PhiCard", "diag write failed", e);
        }
    }

    private void startCapture(String dataJson, String mode, String callbackId) {
        destroyCapture();
        captureData = dataJson;
        captureMode = mode;
        captureCallback = callbackId;
        captureTries = 0;

        // 用系统真实密度：WebView 的 devicePixelRatio 取的是屏幕密度，
        // 伪造 1x 上下文只会让“排版 1:1、绘制 3.75x”，结果就是只剩左上角一块。
        float d0 = Math.max(1f, getResources().getDisplayMetrics().density);
        int initW = Math.round(CARD_WIDTH * d0);
        int initH = Math.round(1200 * d0);
        diag.append("=== render ").append(System.currentTimeMillis()).append(" mode=").append(mode).append(" ===\n");
        log("data bytes=" + dataJson.length());

        captureHost = new FrameLayout(this);
        captureHost.setBackgroundColor(Color.parseColor("#F2070A12"));

        captureView = new WebView(this);
        captureView.setBackgroundColor(Color.WHITE);

        configure(captureView.getSettings());
        captureView.addJavascriptInterface(new CaptureBridge(), "CaptureBridge");
        captureView.setWebViewClient(new AssetClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                log("page finished: " + url);
                try {
                    view.evaluateJavascript("window.__render(" + JSONObject.quote(captureData) + ")", null);
                } catch (Throwable t) {
                    log("evaluate failed: " + t);
                }
            }
        });
        captureW = initW;
        captureH = initH;
        captureHost.addView(captureView, new FrameLayout.LayoutParams(initW, initH));

        // 必须真正参与绘制：作为最上层、大小等于卡片，短暂覆盖在界面上
        FrameLayout.LayoutParams lp = new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
        root.addView(captureHost, lp);
        log("host added " + initW + "x" + initH + " density=" + d0 + " dprFromPage=" + 0);

        captureView.loadUrl("https://" + ASSET_HOST + "/plugin/render.html");
        log("loading render.html");
    }

    private class CaptureBridge {
        @JavascriptInterface
        public void readyInfo(int w, int h, String info) {
            runOnUiThread(() -> {
                log("page info " + info);
                float d = viewDensity();
                try {
                    JSONObject o = new JSONObject(info);
                    float pd = (float) o.optDouble("dpr", d);
                    if (pd > 1f) d = pd;
                } catch (Exception ignored) { }
                pageDpr = d;

                // 1) 把视口调成一块：CSS 宽 1200，高 = 一块
                tileCssH = 700;
                int viewW = Math.round(CARD_WIDTH * d);
                int viewH = Math.round(tileCssH * d);
                resizeCapture(viewW, viewH);

                // 2) 重新量一次真实内容高度
                new Handler(Looper.getMainLooper()).postDelayed(() -> {
                    if (captureView == null) return;
                    captureView.evaluateJavascript("window.scrollTo(0,0); window.__measure ? window.__measure() : null",
                            value -> {
                                int mw = CARD_WIDTH, mh = h;
                                try {
                                    String json = unquote(value);
                                    JSONObject m = new JSONObject(json);
                                    mw = m.optInt("w", CARD_WIDTH);
                                    mh = m.optInt("h", h);
                                } catch (Exception ex) {
                                    log("measure parse failed " + ex + " raw=" + value);
                                }
                                log("measure css=" + mw + "x" + mh + " dpr=" + pageDpr);
                                beginTiles(Math.max(600, Math.min(mw, 2000)), Math.max(1, mh));
                            });
                }, 500);
            });
        }

        @JavascriptInterface
        public void ready(int w, int h) {
            runOnUiThread(() -> {
                log("js ready " + w + "x" + h);
                captureAndSave(Math.max(1, w), Math.max(1, h));
            });
        }

        @JavascriptInterface
        public void fail(String msg) {
            runOnUiThread(() -> {
                log("js fail: " + msg);
                finishCapture(failJson("模板渲染失败：" + msg));
            });
        }
    }

    private void resizeCapture(int w, int h) {
        if (captureView == null) return;
        captureW = Math.max(200, w);
        captureH = Math.max(200, h);
        ViewGroup.LayoutParams lp = captureView.getLayoutParams();
        lp.width = captureW;
        lp.height = captureH;
        captureView.setLayoutParams(lp);
        captureView.requestLayout();
        log("resize view " + captureW + "x" + captureH);
    }

    private float viewDensity() {
        try {
            return Math.max(1f, captureView.getResources().getDisplayMetrics().density);
        } catch (Exception e) {
            return Math.max(1f, getResources().getDisplayMetrics().density);
        }
    }

    private String unquote(String value) {
        if (value == null) return "";
        String v = value;
        if (v.startsWith("\"") && v.endsWith("\"") && v.length() >= 2) {
            v = v.substring(1, v.length() - 1).replace("\\\"", "\"").replace("\\\\", "\\");
        }
        return v;
    }

    private void beginTiles(int w, int h) {
        if (captureView == null || captureHost == null) return;
        cssW = w;
        cssH = h;
        float d = pageDpr > 1 ? pageDpr : viewDensity();
        log("begin tiles css=" + cssW + "x" + cssH + " dpr=" + d);
        if (tileBitmap != null && !tileBitmap.isRecycled()) tileBitmap.recycle();
        tileBitmap = Bitmap.createBitmap(cssW, cssH, Bitmap.Config.ARGB_8888);
        tileCanvas = new Canvas(tileBitmap);
        tileCanvas.drawColor(Color.WHITE);
        captureTile(0);
    }

    /** 按 CSS 尺寸输出：view 按设备密度布局，画布缩放 1/density */
    private void drawScaledCapture() {
        if (captureView == null) return;
        Bitmap bmp = null;
        try {
            float d = pageDpr > 1 ? pageDpr : viewDensity();
            bmp = Bitmap.createBitmap(cssW, cssH, Bitmap.Config.ARGB_8888);
            Canvas canvas = new Canvas(bmp);
            canvas.drawColor(Color.WHITE);
            canvas.scale(1f / d, 1f / d);
            captureView.draw(canvas);
            if (isBlank(bmp)) {
                log("scaled draw blank, fallback pixelcopy");
                bmp.recycle();
                bmp = null;
                pixelCopyCapture();
                return;
            }
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            bmp.compress(Bitmap.CompressFormat.PNG, 100, bos);
            byte[] png = bos.toByteArray();
            String name = "phi-card-" + System.currentTimeMillis() + ".png";
            try (java.io.FileOutputStream fos = new java.io.FileOutputStream(new java.io.File(cardDir(), name))) {
                fos.write(png); fos.flush();
            }
            log("captured css=" + cssW + "x" + cssH + " png=" + png.length);
            dumpPreview(bmp, "scaled");
            String result = writeToGallery(png, captureMode, name);
            log("gallery: " + result);
            finishCapture(withPreview(result, name));
        } catch (Throwable t) {
            log("scaled draw failed: " + t);
            if (bmp != null && !bmp.isRecycled()) bmp.recycle();
            bmp = null;
            pixelCopyCapture();
        } finally {
            if (bmp != null && !bmp.isRecycled()) bmp.recycle();
        }
    }

    private void drawCapture() {
        if (captureView == null) return;
        Bitmap bmp = null;
        try {
            bmp = Bitmap.createBitmap(captureW, captureH, Bitmap.Config.ARGB_8888);
            Canvas canvas = new Canvas(bmp);
            canvas.drawColor(Color.WHITE);
            captureView.draw(canvas);

            if (isBlank(bmp)) {
                bmp.recycle();
                bmp = null;
                captureTries++;
                log("blank capture, try " + captureTries);
                if (captureTries <= 2) {
                    new Handler(Looper.getMainLooper()).postDelayed(this::drawCapture, 700);
                    return;
                }
                finishCapture(failJson("离屏渲染无内容"));
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
            log("captured " + captureW + "x" + captureH + " bytes=" + png.length);
            String result = writeToGallery(png, captureMode, name);
            log("gallery: " + result);
            finishCapture(withPreview(result, name));
        } catch (Throwable t) {
            log("draw failed: " + t);
            finishCapture(failJson("截图失败：" + t.getMessage()));
        } finally {
            if (bmp != null && !bmp.isRecycled()) bmp.recycle();
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
        log("finish: " + (json != null && json.length() > 160 ? json.substring(0, 160) : json));
        writeDiag();
        String cb = captureCallback;
        captureCallback = null;
        destroyCapture();
        if (cb != null) resolveImage(cb, json);
    }

    private void destroyCapture() {
        if (tileBitmap != null && !tileBitmap.isRecycled()) tileBitmap.recycle();
        tileBitmap = null;
        tileCanvas = null;
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

    /* ---------------- 图片落地 ---------------- */

    private String saveImageFromBase64(String base64, String name, boolean share) {
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

    private String withPreview(String json, String name) {
        try {
            JSONObject o = new JSONObject(json);
            if (o.optBoolean("ok")) o.put("preview", "https://" + ASSET_HOST + "/card/" + name);
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

    /* ---------------- 网络 ---------------- */

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
            out.put("body", base64 ? Base64.encodeToString(bytes, Base64.NO_WRAP)
                    : new String(bytes, "UTF-8"));
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
