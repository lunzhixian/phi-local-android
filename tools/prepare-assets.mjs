#!/usr/bin/env node
/**
 * 把 phi-plugin 的原版 B19 模板与素材复制进 web/plugin，并预编译 art-template。
 * 依赖：/tmp/phi-plugin（可用 PHI_DIR 覆盖）、npm 包 art-template
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const template = require('art-template');

const SRC = process.env.PHI_DIR || '/tmp/phi-plugin';
const RES = path.join(SRC, 'resources');
const OUT = path.join(import.meta.dirname, '../web/plugin');

const copy = (from, to) => {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
};

const copyDir = (from, to, filter = () => true) => {
  for (const name of fs.readdirSync(from)) {
    const s = path.join(from, name);
    const d = path.join(to, name);
    if (fs.statSync(s).isDirectory()) copyDir(s, d, filter);
    else if (filter(name)) copy(s, d);
  }
};

fs.rmSync(OUT, { recursive: true, force: true });

// 样式与模板
copy(path.join(RES, 'html/b19/b19.css'), path.join(OUT, 'html/b19/b19.css'));
copy(path.join(RES, 'html/common/common.css'), path.join(OUT, 'html/common/common.css'));
copyDir(path.join(RES, 'html/common/theme/star'), path.join(OUT, 'html/common/theme/star'));

// 字体（去掉体积过大的 emoji 与用不到的语种字体）
const FONTS = [
  'phi.ttf', 'HIMALAYA.TTF', 'Aldrich-Regular.ttf', 'NotoSans-Regular.ttf',
  'NotoSansJP.ttf', 'NotoSansSymbols2.ttf', 'NotoSansMath-Regular.ttf', '吞弥恰俊.ttf',
];
fs.mkdirSync(path.join(OUT, 'html/common/font'), { recursive: true });
for (const f of FONTS) copy(path.join(RES, 'html/common/font', f), path.join(OUT, 'html/common/font', f));

// 图标与头像
copyDir(path.join(RES, 'html/otherimg'), path.join(OUT, 'html/otherimg'));
copyDir(path.join(RES, 'html/avatar'), path.join(OUT, 'html/avatar'), (n) => n.endsWith('.png'));
fs.writeFileSync(
  path.join(OUT, 'html/avatar/index.json'),
  JSON.stringify(fs.readdirSync(path.join(RES, 'html/avatar')).filter((n) => n.endsWith('.png')).map((n) => n.replace(/\.png$/, '')))
);

// 预编译模板：把 layout 的 block 手工内联，得到无 extend/include 的单一模板
const layoutFile = path.join(RES, 'html/common/layout/default.art');
const tplFile = path.join(RES, 'html/b19/b19.art');
const layout = fs.readFileSync(layoutFile, 'utf8');
const child = fs.readFileSync(tplFile, 'utf8');

const grabBlock = (name) => {
  const re = new RegExp(`\\{\\{block '${name}'\\}\\}([\\s\\S]*?)\\{\\{/block\\}\\}`, 'm');
  const m = child.match(re);
  return m ? m[1] : '';
};
const css = grabBlock('css');
const main = grabBlock('main');
const body = child
  .replace(/^\s*\{\{extend[^}]*\}\}\s*/m, '')
  .replace(/\{\{block 'css'\}\}[\s\S]*?\{\{\/block\}\}/m, '')
  .replace(/\{\{block 'main'\}\}[\s\S]*?\{\{\/block\}\}/m, '')
  .trim();

const flattened = layout
  .replace(/\{\{block 'css'\}\}\s*\{\{\/block\}\}/, css)
  .replace(/\{\{block 'main'\}\}\{\{\/block\}\}/, main + '\n' + body);

const fn = template.compile(flattened, { minimize: false, bail: true });
const runtime = `var $imports={
  $escape:function(c){var s=(c===undefined||c===null)?'':String(c);return s.replace(/["&'<>]/g,function(ch){return {'"':'&#34;','&':'&amp;',"'":'&#39;','<':'&lt;','>':'&gt;'}[ch];});},
  $each:function(d,cb){if(Array.isArray(d)){for(var i=0;i<d.length;i++)cb(d[i],i);}else{for(var k in d)cb(d[k],k);}}
};`;
fs.copyFileSync(path.join(import.meta.dirname, 'plugin-src/render.html'), path.join(OUT, 'render.html'));

fs.writeFileSync(
  path.join(OUT, 'b19-tpl.js'),
  `window.__B19_TPL=(function(){${runtime}return (${fn.toString()});})();\n`
);

let bytes = 0;
const walk = (dir) => {
  for (const n of fs.readdirSync(dir)) {
    const p = path.join(dir, n);
    if (fs.statSync(p).isDirectory()) walk(p);
    else bytes += fs.statSync(p).size;
  }
};
walk(OUT);
console.log(`plugin assets ready: ${(bytes / 1024 / 1024).toFixed(1)} MB`);
