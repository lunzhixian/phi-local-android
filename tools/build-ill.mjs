#!/usr/bin/env node
/**
 * 把下载好的曲绘 PNG 压缩成 320px 宽的 JPEG，输出到 ill-src/（构建时再复制进 assets）。
 * 用法：node tools/build-ill.mjs <源目录> [最大宽度]
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const canvasMod = require(process.env.CANVAS_PATH || '@napi-rs/canvas');
const { createCanvas, loadImage } = canvasMod;

const SRC = process.argv[2] || '/tmp/ill-dl';
const WIDTH = Number(process.argv[3] || 320);
const OUT = path.join(import.meta.dirname, '../ill-src');

fs.mkdirSync(OUT, { recursive: true });
const files = fs.readdirSync(SRC).filter((f) => f.toLowerCase().endsWith('.png'));
let ok = 0, fail = [];
for (const f of files) {
  const id = f.replace(/\.png$/i, '');
  try {
    const img = await loadImage(path.join(SRC, f));
    const ratio = img.height / img.width;
    const w = Math.min(WIDTH, img.width);
    const h = Math.round(w * ratio);
    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, w, h);
    const buf = canvas.toBuffer('image/jpeg', 82);
    fs.writeFileSync(path.join(OUT, `${id}.jpg`), buf);
    ok++;
  } catch (e) {
    fail.push(id);
  }
}
let bytes = 0;
for (const f of fs.readdirSync(OUT)) bytes += fs.statSync(path.join(OUT, f)).size;
console.log(`ill: ${ok} ok, ${fail.length} failed, ${(bytes / 1024 / 1024).toFixed(1)} MB`);
if (fail.length) console.log('failed ids:', fail.slice(0, 10).join(', '));
