#!/usr/bin/env node
/**
 * 生成一份用于渲染校验的 B30 数据（结构等同 apps/b19.js 传给模板的 data）。
 * 用法：node tools/sample-data.mjs [n] > data.json
 */
import fs from 'node:fs';
import path from 'node:path';

const N = Number(process.argv[2] || 30);
const dataFile = path.join(import.meta.dirname, '../web/data.js');
const src = fs.readFileSync(dataFile, 'utf8');
const json = JSON.parse(src.slice(src.indexOf('{'), src.lastIndexOf('}') + 1));
const LEVELS = ['EZ', 'HD', 'IN', 'AT'];

const list = [];
const pool = json.songs.filter((s) => s.diffs.IN);
for (let i = 0; i < 120; i++) {
  const s = pool[(i * 37) % pool.length];
  const lv = s.diffs.AT && i % 4 === 0 ? 'AT' : 'IN';
  const diff = Number(s.diffs[lv]);
  const isPhi = i % 17 === 3;
  const score = isPhi ? 1000000 : 940000 + ((i * 7919) % 60001);
  const acc = isPhi ? 100 : Math.min(100, 92 + ((i * 131) % 800) / 100);
  const rks = acc === 100 ? diff : diff * (((acc - 55) / 45) ** 2);
  list.push({
    id: s.id, song: s.song, rank: lv, difficulty: diff, score,
    acc, fc: isPhi || i % 11 === 0, rks,
    rating: score >= 1000000 ? 'phi' : i % 11 === 0 ? 'FC' : score >= 960000 ? 'V' : score >= 920000 ? 'S' : 'A',
  });
}
list.sort((a, b) => b.rks - a.rks);

const phi = list.filter((x) => x.acc >= 100).slice(0, 3);
const rest = list.filter((x) => !phi.includes(x));
const comRks = (phi.reduce((s, x) => s + x.rks, 0) + rest.slice(0, 27).reduce((s, x) => s + x.rks, 0)) / 30;
const userrks = 13.7421;
let minuprks = Math.floor(userrks * 100) / 100 + 0.005 - userrks;
if (minuprks < 0) minuprks += 0.01;

const ill = (id) => `https://appassets.local/plugin/ill/${encodeURIComponent(id)}.jpg`;

const rows = list.slice(0, N).map((x, i) => {
  const base = i < 26 ? x.rks : (rest[26]?.rks ?? x.rks);
  const target = base + minuprks * 30;
  const accNeed = 45 * Math.sqrt(Math.max(0, target) / x.difficulty) + 55;
  const ok = accNeed < 100 && isFinite(accNeed);
  const type = !ok ? 5 : accNeed < 98.5 ? 0 : accNeed < 99 ? 1 : accNeed < 99.5 ? 2 : accNeed < 99.7 ? 3 : accNeed < 99.85 ? 4 : 5;
  return {
    id: x.id, song: x.song, rank: x.rank, difficulty: x.difficulty, score: x.score,
    acc: x.acc, rks: x.rks, Rating: x.rating,
    suggest: ok ? `${accNeed.toFixed(2)}%` : '无法推分', suggestType: type,
    illustration: ill(x.id), num: i + 1,
  };
});

const data = {
  phi: phi.length ? phi.map((x) => ({ ...x, Rating: x.rating, illustration: ill(x.id) })) : undefined,
  b19_list: rows,
  PlayerId: '测试玩家 TestPlayer',
  Rks: comRks.toFixed(4),
  Date: '2026/10/31 21:40',
  ChallengeMode: 12,
  ChallengeModeRank: 3,
  background: 'https://appassets.local/plugin/html/otherimg/Star1.png',
  theme: 'star',
  gameuser: {
    avatar: 'Introduction', PlayerId: '测试玩家 TestPlayer', rks: comRks,
    data: '1MiB ', ChallengeMode: 12, ChallengeModeRank: 3, selfIntro: '',
  },
  nnum: N,
  stats: LEVELS.map((title) => ({
    title, tot: 300, unlock: 200, cleared: 150, fc: 60, phi: 6,
    real_score: 150000000, tot_score: 200000000, Rating: 'V', highest: 0, lowest: 0,
  })),
  spInfo: [],
  _res_path: 'https://appassets.local/plugin/',
  defaultLayout: '',
  renderNoJs: false,
  sys: { scale: '', copyright: '' },
  Version: { ver: '1.2.3', yunzai: '' },
};

process.stdout.write(JSON.stringify(data));
