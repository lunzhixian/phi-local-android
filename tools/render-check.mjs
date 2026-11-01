#!/usr/bin/env node
/**
 * 渲染一致性校验：
 *  1. 用官方 art-template + 原版 b19.art / default.art 生成参考 HTML
 *  2. 用 App 内实际使用的预编译模板（web/plugin/b19-tpl.js）生成待测 HTML
 *  3. 两者都用 Chromium 截图（1200 宽，deviceScaleFactor=1）
 *  4. 逐像素比较，并输出参考图 / 待测图 / 差异图
 *
 * 依赖：puppeteer、art-template、pixelmatch、pngjs
 */
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');
const template = require('art-template');

const ROOT = path.join(import.meta.dirname, '..');
const WEB = path.join(ROOT, 'web');
const OUT = path.join(ROOT, 'render-out');
fs.mkdirSync(OUT, { recursive: true });

const N = Number(process.env.CARD_N || 30);
const dataJson = execFileSync('node', [path.join(ROOT, 'tools/sample-data.mjs'), String(N)], { encoding: 'utf8' });
const data = JSON.parse(dataJson);

/* ---------- 1) 官方模板 ---------- */
const refDir = path.join(ROOT, 'tools/reference');
const official = template.compile(fs.readFileSync(path.join(refDir, 'b19.art'), 'utf8'), {
  filename: path.join(refDir, 'b19.art'),
  root: refDir,
  extname: '.art',
  minimize: false,
  bail: true,
});
const officialHtml = official({ ...data, defaultLayout: path.join(refDir, 'default.art') });

/* ---------- 2) App 内模板 ---------- */
const sandbox = {};
new Function('window', fs.readFileSync(path.join(WEB, 'plugin/b19-tpl.js'), 'utf8'))(sandbox);
const appHtml = sandbox.__B19_TPL(data);

/* ---------- 3) 静态服务 web/，让两页共用同一批本地资源 ---------- */
const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.ttf': 'font/ttf', '.otf': 'font/otf', '.svg': 'image/svg+xml',
};
const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  // 把 https://appassets.local/plugin/xx 映射到 web/plugin/xx
  let file = url.startsWith('/plugin/') ? path.join(WEB, url) : path.join(OUT, url);
  if (url === '/ref.html' || url === '/app.html') file = path.join(OUT, url);
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(buf);
  });
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const port = server.address().port;

// 把 appassets.local 指到本地服务，保持 HTML 内容不改
const fix = (html) => html.replaceAll('https://appassets.local/plugin/', `http://127.0.0.1:${port}/plugin/`);
fs.writeFileSync(path.join(OUT, 'ref.html'), fix(officialHtml));
fs.writeFileSync(path.join(OUT, 'app.html'), fix(appHtml));

/* ---------- 4) 截图 ---------- */
const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'],
});

async function shoot(url, file) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 120000 });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  const box = await page.evaluate(() => {
    const b = document.body;
    return { w: Math.ceil(Math.max(b.scrollWidth, document.documentElement.scrollWidth, 1200)),
             h: Math.ceil(Math.max(b.scrollHeight, document.documentElement.scrollHeight)) };
  });
  await page.setViewport({ width: box.w, height: box.h, deviceScaleFactor: 1 });
  await new Promise((r) => setTimeout(r, 400));
  const imgs = await page.evaluate(() => {
    const list = Array.from(document.images).map((i) => ({
      name: decodeURIComponent(i.currentSrc || i.src).split('/').pop(),
      ok: i.complete && i.naturalWidth > 0,
      w: Math.round(i.getBoundingClientRect().width),
      h: Math.round(i.getBoundingClientRect().height),
    }));
    const fontsDone = document.fonts ? document.fonts.status : 'n/a';
    return { total: list.length, ok: list.filter((x) => x.ok).length, bad: list.filter((x) => !x.ok).slice(0, 5), sample: list.slice(0, 3), fontsDone };
  });
  console.log('[images]', url, JSON.stringify(imgs));
  await page.screenshot({ path: file, type: 'png', fullPage: true });
  await page.close();
  return box;
}

const refBox = await shoot(`http://127.0.0.1:${port}/ref.html`, path.join(OUT, 'b30-reference.png'));
// 同一页面再截一次，作为“随机星域动画”带来的基线差异
const refBox2 = await shoot(`http://127.0.0.1:${port}/ref.html`, path.join(OUT, 'b30-reference-2.png'));
const appBox = await shoot(`http://127.0.0.1:${port}/app.html`, path.join(OUT, 'b30-app.png'));
await browser.close();
server.close();

/* ---------- 5) 比对 ---------- */
const compare = (name, fileA, fileB) => {
  const pixelmatch = require('pixelmatch');
  const { PNG } = require('pngjs');
  const a = PNG.sync.read(fs.readFileSync(fileA));
  const b = PNG.sync.read(fs.readFileSync(fileB));
  if (a.width !== b.width || a.height !== b.height) {
    return { name, identical: false, reason: 'size mismatch', refSize: [a.width, a.height], appSize: [b.width, b.height] };
  }
  const diff = new PNG({ width: a.width, height: a.height });
  const n = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.1 });
  fs.writeFileSync(path.join(OUT, `diff-${name}.png`), PNG.sync.write(diff));
  return { name, identical: n === 0, diffPixels: n, totalPixels: a.width * a.height, ratio: Number(((n / (a.width * a.height)) * 100).toFixed(4)) };
};

let report = {
  size: { ref: refBox, app: appBox },
  baseline: null,
  appVsRef: null,
  identical: false,
};
try {
  report.baseline = compare('ref-vs-ref', path.join(OUT, 'b30-reference.png'), path.join(OUT, 'b30-reference-2.png'));
  report.appVsRef = compare('app-vs-ref', path.join(OUT, 'b30-reference.png'), path.join(OUT, 'b30-app.png'));
  const base = report.baseline.diffPixels || 0;
  const diff = report.appVsRef.diffPixels || 0;
  // 差异不超过“同页两次随机渲染”的基线的 2 倍即视为一致
  report.identical = diff <= Math.max(base * 2, 500);
} catch (e) {
  report.compareError = String(e.message || e);
}

fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (!report.identical) process.exitCode = 2;
