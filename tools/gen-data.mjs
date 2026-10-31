#!/usr/bin/env node
// 生成离线曲目数据（来源：phi-plugin 的 resources/info）
import fs from 'node:fs';
import path from 'node:path';

const SRC = process.env.PHI_DIR || '/tmp/phi-plugin';
const infoDir = path.join(SRC, 'resources/info');
const outFile = process.argv[2] || path.join(import.meta.dirname, '../web/data.js');

const parseCsv = (text) => {
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length);
  const sep = lines[0].includes('\t') ? '\t' : ',';
  const head = lines[0].split(sep).map((s) => s.trim());
  return lines.slice(1).map((line) => {
    const cols = line.split(sep);
    const o = {};
    head.forEach((h, i) => (o[h] = (cols[i] ?? '').trim()));
    return o;
  });
};

const csv = parseCsv(fs.readFileSync(path.join(infoDir, 'info.csv'), 'utf8'));
const infolist = JSON.parse(fs.readFileSync(path.join(infoDir, 'infolist.json'), 'utf8'));
const spinfo = JSON.parse(fs.readFileSync(path.join(infoDir, 'spinfo.json'), 'utf8'));
const notes = JSON.parse(fs.readFileSync(path.join(infoDir, 'notesInfo.json'), 'utf8'));

const LEVELS = ['EZ', 'HD', 'IN', 'AT'];

const songs = [];
for (const row of csv) {
  if (!row.id || !row.song) continue;
  const id = row.id.replace(/\.0$/, '');
  const meta = infolist[id] || infolist[row.id] || {};
  const n = notes[id] || notes[row.id] || {};
  const item = {
    id,
    song: row.song,
    composer: row.composer || '',
    illustrator: row.illustrator || '',
    charters: {
      EZ: row.EZC || '',
      HD: row.HDC || '',
      IN: row.INC || '',
      AT: row.ATC || '',
    },
    bpm: meta.bpm || '',
    length: meta.length || '',
    chapter: meta.chapter || '',
    diffs: {},
    notes: {},
  };
  for (const lv of LEVELS) {
    const d = Number(row[lv]);
    if (d > 0) item.diffs[lv] = d;
    const nn = n[lv];
    if (nn && Array.isArray(nn.t)) {
      const [tap = 0, drag = 0, hold = 0, flick = 0] = nn.t.map(Number);
      item.notes[lv] = { tap, drag, hold, flick, combo: tap + drag + hold + flick, maxTime: nn.m ?? 0 };
    }
  }
  if (Object.keys(item.diffs).length) songs.push(item);
}

// SP 独占曲目（原曲不在 csv 中时补进去）
for (const [id0, sp] of Object.entries(spinfo)) {
  const id = id0.replace(/\.0$/, '');
  if (songs.some((s) => s.id === id)) continue;
  songs.push({
    id,
    song: sp.song || id,
    composer: sp.composer || '',
    illustrator: sp.illustrator || '',
    charters: { EZ: '', HD: '', IN: '', AT: '' },
    bpm: sp.bpm || '',
    length: sp.length || '',
    chapter: sp.chapter || 'SP',
    diffs: {},
    notes: {},
    sp: true,
  });
}

songs.sort((a, b) => a.song.localeCompare(b.song, 'zh-Hans-CN'));

const payload = {
  generatedAt: new Date().toISOString(),
  source: 'Catrong/phi-plugin',
  levels: LEVELS,
  songs,
};

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, `window.PHI_DATA=${JSON.stringify(payload)};\n`);
console.log(`songs=${songs.length} bytes=${fs.statSync(outFile).size}`);
