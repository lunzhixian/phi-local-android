#!/usr/bin/env node
/**
 * 把图片渲染成 ASCII 灰度图，便于在没有图像能力的环境里“看”结果。
 * 用法：node tools/ascii-preview.mjs <图片路径> [列数]
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let loadImage;
try {
  ({ loadImage } = require(process.env.CANVAS_PATH || '@napi-rs/canvas'));
} catch (e) {
  console.error('需要 @napi-rs/canvas：CANVAS_PATH=/path/to/node_modules/@napi-rs/canvas node tools/ascii-preview.mjs <img>');
  process.exit(1);
}
const { createCanvas } = require(process.env.CANVAS_PATH || '@napi-rs/canvas');

const file = process.argv[2];
const COLS = Number(process.argv[3] || 74);
if (!file || !fs.existsSync(file)) {
  console.error('用法：node tools/ascii-preview.mjs <图片路径> [列数]');
  process.exit(1);
}

const img = await loadImage(fs.readFileSync(file));
const aspect = img.height / img.width;
const rows = Math.max(1, Math.round((COLS * aspect) / 2.1)); // 终端字符约 2:1

const canvas = createCanvas(COLS, rows);
const ctx = canvas.getContext('2d');
ctx.drawImage(img, 0, 0, COLS, rows);
const data = ctx.getImageData(0, 0, COLS, rows).data;

const img2 = await loadImage(fs.readFileSync(file));
const small = createCanvas(COLS, rows);
const ctx2 = small.getContext('2d');
ctx2.drawImage(img2, 0, 0, COLS, rows);
const d2 = ctx2.getImageData(0, 0, COLS, rows).data;

const ramp = ' .:-=+*#%@';
const lines = [];
for (let y = 0; y < rows; y++) {
  let line = '';
  for (let x = 0; x < COLS; x++) {
    const i = (y * COLS + x) * 4;
    const r = d2[i], g = d2[i + 1], b = d2[i + 2];
    const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    line += ramp[Math.min(ramp.length - 1, Math.floor(lum * ramp.length))];
  }
  lines.push(line);
}

// 统计：内容分布（左右/上下半区的平均亮度与方差）
const stats = (x0, x1, y0, y1) => {
  let sum = 0, sum2 = 0, n = 0;
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const i = (y * COLS + x) * 4;
      const lum = (0.2126 * d2[i] + 0.7152 * d2[i + 1] + 0.0722 * d2[i + 2]) / 255;
      sum += lum; sum2 += lum * lum; n++;
    }
  }
  const mean = sum / n;
  return { mean: Number(mean.toFixed(3)), std: Number(Math.sqrt(sum2 / n - mean * mean).toFixed(3)) };
};

console.log(`file: ${path.basename(file)}  ${img.width}x${img.height}  ->  ${COLS}x${rows}`);
console.log(lines.join('\n'));
console.log('---- region stats (mean/std) ----');
console.log('left  half :', JSON.stringify(stats(0, Math.floor(COLS / 2), 0, rows)));
console.log('right half :', JSON.stringify(stats(Math.floor(COLS / 2), COLS, 0, rows)));
console.log('top   half :', JSON.stringify(stats(0, COLS, 0, Math.floor(rows / 2))));
console.log('bottom half:', JSON.stringify(stats(0, COLS, Math.floor(rows / 2), rows)));
console.log('whole      :', JSON.stringify(stats(0, COLS, 0, rows)));
