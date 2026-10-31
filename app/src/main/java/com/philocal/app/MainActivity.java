package com.philocal.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.util.Base64;
import android.view.View;
import android.view.WindowInsets;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import android.content.ContentValues;
import android.content.Context;
import android.content.res.Configuration;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.os.Handler;
import android.os.Looper;
import android.content.Intent;
import android.net.Uri;
import android.provider.MediaStore;

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

    private WebView webView;
    private boolean loadedFallback = false;

    private WebView captureView;
    private String captureCallback;
    private String captureMode;
    private String captureData;
    private int captureCssW = 1200;
    private int captureCssH = 4000;
    private final ExecutorService pool = Executors.newFixedThreadPool(3);

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setStatusBarColor(Color.parseColor("#07090f"));
        getWindow().setNavigationBarColor(Color.parseColor("#07090f"));
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            getWindow().setDecorFitsSystemWindows(true);
        }

        webView = new WebView(this);
        webView.setBackgroundColor(Color.parseColor("#07090f"));
        webView.setOverScrollMode(View.OVER_SCROLL_NEVER);

        WebSettings s = webView.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccess(true);
        s.setAllowFileAccessFromFileURLs(true);
        s.setAllowUniversalAccessFromFileURLs(true);
        s.setCacheMode(WebSettings.LOAD_DEFAULT);
        s.setTextZoom(100);
        s.setSupportZoom(false);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return true;
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, android.webkit.WebResourceError error) {
                if (request.isForMainFrame() && !loadedFallback) {
                    loadedFallback = true;
                    view.loadUrl("file:///android_asset/www/index.html");
                }
            }

            @Override
            public android.webkit.WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                String host = request.getUrl().getHost();
                if (!"appassets.local".equals(host)) return null;
                String path = request.getUrl().getPath();
                if (path == null || path.equals("/") || path.isEmpty()) path = "/index.html";
                String assetPath = "www" + path;
                try {
                    java.io.InputStream in = getAssets().open(assetPath);
                    String mime = guessMime(assetPath);
                    return new android.webkit.WebResourceResponse(mime, "UTF-8", in);
                } catch (Exception e) {
                    return new android.webkit.WebResourceResponse("text/plain", "UTF-8",
                            new java.io.ByteArrayInputStream("Not found".getBytes()));
                }
            }
        });

        webView.addJavascriptInterface(new Bridge(), "NativeBridge");
        setContentView(webView);
        webView.loadUrl("https://appassets.local/index.html");
    }

    private String guessMime(String path) {
        if (path.endsWith(".html")) return "text/html";
        if (path.endsWith(".js")) return "application/javascript";
        if (path.endsWith(".css")) return "text/css";
        if (path.endsWith(".json")) return "application/json";
        if (path.endsWith(".png")) return "image/png";
        if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
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
                    if (value == null || !value.contains("sheet")) {
                        finish();
                    }
                });
    }

    @Override
    protected void onDestroy() {
        pool.shutdownNow();
        if (webView != null) {
            webView.destroy();
        }
        super.onDestroy();
    }

    private void resolve(String callbackId, String json) {
        final String js = "window.__nativeResolve(" + JSONObject.quote(callbackId) + "," + JSONObject.quote(json) + ");";
        runOnUiThread(() -> {
            if (webView != null) {
                webView.evaluateJavascript(js, null);
            }
        });
    }

    /** JS 桥：所有网络请求走原生，避免 WebView 的 CORS 限制 */
    public class Bridge {

        @JavascriptInterface
        public void httpGet(String url, String headersJson, String callbackId) {
            pool.execute(() -> {
                String result = fetch(url, headersJson, false);
                resolve(callbackId, result);
            });
        }

        @JavascriptInterface
        public void httpGetBase64(String url, String headersJson, String callbackId) {
            pool.execute(() -> {
                String result = fetch(url, headersJson, true);
                resolve(callbackId, result);
            });
        }

        @JavascriptInterface
        public void renderB19(String dataJson, String mode, String callbackId) {
            runOnUiThread(() -> startCapture(dataJson, mode, callbackId));
        }

        @JavascriptInterface
        public void saveImage(String base64, String name, String callbackId) {
            pool.execute(() -> resolveImage(callbackId, saveImageFile(base64, name, false)));
        }

        @JavascriptInterface
        public void shareImage(String base64, String name, String callbackId) {
            pool.execute(() -> resolveImage(callbackId, saveImageFile(base64, name, true)));
        }

        @JavascriptInterface
        public void toast(String text) {
            runOnUiThread(() -> Toast.makeText(MainActivity.this, text, Toast.LENGTH_SHORT).show());
        }

        @JavascriptInterface
        public String appVersion() {
            return "1.0.0";
        }
    }

    /** 用 1x 密度上下文创建 WebView，让 1200px 模板按原尺寸渲染 */
    private void startCapture(String dataJson, String mode, String callbackId) {
        cleanupCapture();
        captureData = dataJson;
        captureMode = mode;
        captureCallback = callbackId;

        Configuration cfg = new Configuration(getResources().getConfiguration());
        cfg.densityDpi = 160;
        cfg.fontScale = 1f;
        Context oneX = createConfigurationContext(cfg);

        captureView = new WebView(oneX);
        captureView.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
        captureView.setBackgroundColor(Color.WHITE);
        WebSettings cs = captureView.getSettings();
        cs.setJavaScriptEnabled(true);
        cs.setDomStorageEnabled(true);
        cs.setAllowFileAccess(true);
        cs.setAllowFileAccessFromFileURLs(true);
        cs.setAllowUniversalAccessFromFileURLs(true);
        cs.setLoadsImagesAutomatically(true);
        cs.setBlockNetworkImage(false);
        captureView.addJavascriptInterface(new CaptureBridge(), "CaptureBridge");
        captureView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                view.evaluateJavascript("window.__render(" + JSONObject.quote(captureData) + ")", null);
            }
        });
        captureView.loadUrl("https://appassets.local/plugin/render.html");
    }

    private class CaptureBridge {
        @JavascriptInterface
        public void ready(int w, int h) {
            runOnUiThread(() -> captureAndSave(Math.max(1, w), Math.max(1, h)));
        }

        @JavascriptInterface
        public void fail(String msg) {
            runOnUiThread(() -> {
                finishCapture(failJson("模板渲染失败：" + msg));
            });
        }
    }

    private void captureAndSave(int w, int h) {
        if (captureView == null) return;
        captureCssW = Math.min(w, 2000);
        captureCssH = Math.max(1, h);
        try {
            captureView.measure(
                    View.MeasureSpec.makeMeasureSpec(captureCssW, View.MeasureSpec.EXACTLY),
                    View.MeasureSpec.makeMeasureSpec(captureCssH, View.MeasureSpec.EXACTLY));
            captureView.layout(0, 0, captureCssW, captureCssH);
        } catch (Exception e) {
            finishCapture(failJson("页面布局失败：" + e.getMessage()));
            return;
        }
        new Handler(Looper.getMainLooper()).postDelayed(this::drawCapture, 400);
    }

    private void drawCapture() {
        if (captureView == null) return;
        Bitmap bmp = null;
        try {
            bmp = Bitmap.createBitmap(captureCssW, captureCssH, Bitmap.Config.ARGB_8888);
            Canvas canvas = new Canvas(bmp);
            canvas.drawColor(Color.WHITE);
            captureView.draw(canvas);
            // 采样若干点，若全是纯白，说明离屏 WebView 没真正绘制，交给 JS 回退
            if (isBlank(bmp)) {
                finishCapture(failJson("离屏渲染无内容"));
                return;
            }
            int sample = bmp.getPixel(Math.min(captureCssW - 1, 10), Math.min(captureCssH - 1, 10));
            java.io.ByteArrayOutputStream bos = new java.io.ByteArrayOutputStream();
            bmp.compress(Bitmap.CompressFormat.PNG, 100, bos);
            String json = savePngAndRespond(bos.toByteArray(), captureMode, sample);
            finishCapture(json);
        } catch (Throwable t) {
            finishCapture(failJson("截图失败：" + t.getMessage()));
        } finally {
            if (bmp != null) bmp.recycle();
        }
    }

    /** 判断截图是否一片空白（纯白/透明） */
    private boolean isBlank(Bitmap bmp) {
        int w = bmp.getWidth();
        int h = bmp.getHeight();
        int[][] pts = {{10, 10}, {w / 2, h / 2}, {w / 2, Math.max(1, h / 4)}, {w - 11, Math.max(1, h - 11)}, {w / 3, Math.max(1, (int) (h * 0.75))}};
        for (int[] pt : pts) {
            int x = Math.max(0, Math.min(w - 1, pt[0]));
            int y = Math.max(0, Math.min(h - 1, pt[1]));
            int c = bmp.getPixel(x, y);
            int a = (c >>> 24) & 0xff;
            int r = (c >> 16) & 0xff, g = (c >> 8) & 0xff, b = c & 0xff;
            if (a > 8 && !(r > 248 && g > 248 && b > 248)) return false;
        }
        return true;
    }

    private String savePngAndRespond(byte[] png, String mode, int sample) {
        try {
            ContentValues values = new ContentValues();
            String name = "phi-b30-" + System.currentTimeMillis() + ".png";
            values.put(MediaStore.Images.Media.DISPLAY_NAME, name);
            values.put(MediaStore.Images.Media.MIME_TYPE, "image/png");
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                values.put(MediaStore.Images.Media.RELATIVE_PATH, "Pictures/PhiLocal");
                values.put(MediaStore.Images.Media.IS_PENDING, 1);
            }
            Uri uri = getContentResolver().insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);
            if (uri == null) throw new IllegalStateException("无法创建相册条目");
            try (java.io.OutputStream os = getContentResolver().openOutputStream(uri)) {
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
            out.put("sample", sample);
            return out.toString();
        } catch (Exception e) {
            return failJson("保存失败：" + e.getMessage());
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

    private void finishCapture(String json) {
        String cb = captureCallback;
        cleanupCapture();
        if (cb != null) resolveImage(cb, json);
    }

    private void cleanupCapture() {
        captureCallback = null;
        captureMode = null;
        captureData = null;
        final WebView v = captureView;
        captureView = null;
        if (v != null) {
            try { v.loadUrl("about:blank"); v.destroy(); } catch (Exception ignored) { }
        }
    }

    private void resolveImage(String callbackId, String json) {
        final String js = "window.__imageResult(" + JSONObject.quote(callbackId) + "," + JSONObject.quote(json) + ");";
        runOnUiThread(() -> {
            if (webView != null) webView.evaluateJavascript(js, null);
        });
    }

    /** 把 PNG base64 写入相册 Pictures/PhiLocal，可选分享 */
    private String saveImageFile(String base64, String name, boolean share) {
        try {
            int comma = base64.indexOf(',');
            String pure = comma >= 0 ? base64.substring(comma + 1) : base64;
            byte[] png = Base64.decode(pure, Base64.DEFAULT);

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
            if (share) {
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
            try {
                JSONObject out = new JSONObject();
                out.put("ok", false);
                out.put("error", "保存失败：" + e.getMessage());
                return out.toString();
            } catch (Exception ignored) {
                return "{\"ok\":false,\"error\":\"保存失败\"}";
            }
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
            if (in == null) in = conn.getErrorStream();
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
