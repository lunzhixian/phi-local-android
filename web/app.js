/* Phi 本地版 — 界面与成绩计算 */
(function () {
  'use strict';

  const DATA = window.PHI_DATA || { songs: [] };
  const SONG_BY_ID = new Map();
  for (const s of DATA.songs) SONG_BY_ID.set(s.id, s);
  const LEVEL_NAMES = ['EZ', 'HD', 'IN', 'AT'];

  const LS_TOKEN = 'phi.token';
  const LS_SERVER = 'phi.server';
  const LS_LAST = 'phi.lastSync';

  // 某些 WebView 环境（如 file:// 源）访问 localStorage 会抛 SecurityError，这里做降级
  const store = (() => {
    try {
      localStorage.setItem('__phi_probe', '1');
      localStorage.removeItem('__phi_probe');
      return localStorage;
    } catch (e) {
      const mem = new Map();
      return {
        getItem: (k) => (mem.has(k) ? mem.get(k) : null),
        setItem: (k, v) => mem.set(k, String(v)),
        removeItem: (k) => mem.delete(k),
      };
    }
  })();

  const state = {
    token: store.getItem(LS_TOKEN) || '',
    server: store.getItem(LS_SERVER) || 'cn',
    save: null,
    computed: null,
    view: 'home',
    n: Number(store.getItem('phi.n')) || 30,
    diffFilter: '',
    sortMode: 'diff',
    query: '',
  };

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = (n, d = 4) => Number(n || 0).toFixed(d);
  const normId = (id) => String(id).replace(/\.0$/, '');

  /* ---------------- 成绩计算 ---------------- */

  function difficultyOf(id, level) {
    const song = SONG_BY_ID.get(normId(id));
    return song?.diffs?.[LEVEL_NAMES[level]] || 0;
  }

  function rksOf(acc, difficulty) {
    if (acc === 100) return Number(difficulty);
    if (acc < 70) return 0;
    return difficulty * (((acc - 55) / 45) ** 2);
  }

  function ratingOf(score, fc) {
    if (score >= 1000000) return 'phi';
    if (fc) return 'FC';
    if (!score) return 'NEW';
    if (score < 700000) return 'F';
    if (score < 820000) return 'C';
    if (score < 880000) return 'B';
    if (score < 920000) return 'A';
    if (score < 960000) return 'S';
    return 'V';
  }

  function compute(save) {
    const list = [];
    const rec = save.records || {};
    for (const id of Object.keys(rec)) {
      const arr = rec[id];
      for (let level = 0; level < 4; level++) {
        const r = arr[level];
        if (!r || !r.score) continue;
        const difficulty = difficultyOf(id, level);
        const song = SONG_BY_ID.get(normId(id));
        list.push({
          id: normId(id),
          song: song?.song || id,
          rank: LEVEL_NAMES[level],
          level,
          score: r.score,
          acc: r.acc,
          fc: !!r.fc,
          difficulty,
          rks: rksOf(r.acc, difficulty),
          rating: ratingOf(r.score, r.fc),
        });
      }
    }
    list.sort((a, b) => b.rks - a.rks);
    const phi = list.filter((x) => x.acc >= 100).slice(0, 3);
    const best19 = list.slice(0, 19);
    const summary = save.summary || {};
    const played = new Set(list.map((x) => x.id)).size;
    const fcCount = list.filter((x) => x.fc).length;
    const phiCount = list.filter((x) => x.acc >= 100).length;
    const money = save.progress?.money || [0, 0, 0, 0, 0];
    const dataSize = money[4] ? `${money[4]}PiB` : money[3] ? `${money[3]}TiB` : money[2] ? `${money[2]}GiB`
      : money[1] ? `${money[1]}MiB` : `${money[0] || 0}KiB`;
    const avgOf = (n) => (list.length ? list.slice(0, n).reduce((s, x) => s + x.rks, 0) / Math.min(n, list.length) : 0);
    const avg = avgOf(19);
    const maxDiff = list.reduce((m, x) => Math.max(m, x.difficulty), 0);
    return {
      list, phi, best19, avg, avgOf, played, fcCount, phiCount, dataSize, maxDiff,
      rks: summary.rankingScore || 0,
      challengeMode: save.progress?.challengeModeRank || summary.challengeModeRank || 0,
      nickname: save.nickname || 'Phigros Player',
      updatedAt: save.updatedAt || '',
    };
  }

  /* ---------------- 网络与同步 ---------------- */

  async function sync() {
    const token = state.token.trim();
    if (!/^[A-Za-z0-9]{25}$/.test(token)) {
      toast('Session Token 应为 25 位字母数字');
      return;
    }
    setStatus('同步中…', true);
    try {
      const { player, saveInfo } = await window.PhiSave.fetchAccount(token, state.server);
      const save = await window.PhiSave.loadSave(saveInfo);
      save.nickname = player.nickname || player.username || 'Phigros Player';
      save.updatedAt = new Date(saveInfo.modifiedAt?.iso || saveInfo.updatedAt || Date.now()).toLocaleString('zh-CN');
      state.save = save;
      state.computed = compute(save);
      store.setItem(LS_LAST, new Date().toISOString());
      setStatus('已同步');
      renderAll();
      toast('存档同步成功');
    } catch (err) {
      console.error(err);
      setStatus('同步失败');
      toast(String(err.message || err));
    }
  }

  function setStatus(text, busy) {
    const el = $('statusChip');
    if (!el) return;
    el.innerHTML = busy ? `<span class="loading"></span> ${esc(text)}` : esc(text);
  }

  /* ---------------- 渲染 ---------------- */

  function renderAll() {
    const has = !!state.computed;
    $('view-welcome').classList.toggle('hidden', has);
    $('view-home').classList.toggle('hidden', !has || state.view !== 'home');
    $('view-b19').classList.toggle('hidden', !has || state.view !== 'b19');
    $('view-library').classList.toggle('hidden', state.view !== 'library');
    $('view-settings').classList.toggle('hidden', state.view !== 'settings');
    document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.view === state.view));
    if (has) {
      renderHome();
      renderB19();
      $('brandSub').textContent = `${state.computed.nickname} · ${state.server === 'cn' ? '国服' : '国际服'}`;
    }
    $('tokenInput2').value = state.token;
    $('serverSelect2').value = state.server;
    $('serverSelect').value = state.server;
    $('songCount').textContent = DATA.songs.length;
    renderLibrary();
  }

  function renderHome() {
    const c = state.computed;
    $('avatar').textContent = (c.nickname || 'Φ').slice(0, 1).toUpperCase();
    $('playerName').textContent = c.nickname;
    $('playerSub').textContent = `更新于 ${c.updatedAt || '—'} · Challenge ${Math.floor(c.challengeMode / 100)}-${c.challengeMode % 100}`;
    $('rksValue').textContent = fmt(c.rks);
    $('statPlayed').textContent = c.played;
    $('statPhi').textContent = c.phiCount;
    $('statFc').textContent = c.fcCount;
    $('statData').textContent = c.dataSize;
    $('statAvg').textContent = fmt(c.avg, 2);
    $('statDiff').textContent = c.maxDiff.toFixed(1);

    const box = $('phiList');
    if (!c.phi.length) {
      box.innerHTML = '<div class="empty">还没有 φ 满分的成绩，先去收一首吧</div>';
      return;
    }
    box.innerHTML = c.phi.map((p, i) => `
      <div class="song-row" data-song="${esc(p.id)}">
        <div class="idx" style="width:22px;font-weight:800;color:var(--gold)">${i + 1}</div>
        <div class="txt">
          <div class="n">${esc(p.song)}</div>
          <div class="s"><span class="diff ${p.rank}">${p.rank}</span> ${p.difficulty.toFixed(1)}</div>
        </div>
        <div class="diffs"><span class="rating phi">φ</span></div>
      </div>`).join('');
    box.querySelectorAll('[data-song]').forEach((el) => el.addEventListener('click', () => openSong(el.dataset.song, c)));
  }

  function renderB19() {
    const c = state.computed;
    const n = state.n;
    const rows = c.list.slice(0, n);
    $('b19Rks').textContent = `RKS ${fmt(c.rks)} · B${n} 均 ${fmt(c.avgOf(n), 3)}`;
    const t = document.getElementById('b19Title');
    if (t) t.textContent = String(n);
    document.querySelectorAll('#b19Seg [data-n]').forEach((b) => b.classList.toggle('active', Number(b.dataset.n) === n));
    const box = $('b19List');
    if (!rows.length) {
      box.innerHTML = '<div class="empty"><div class="big">▤</div>暂无成绩数据</div>';
      return;
    }
    box.innerHTML = rows.map((x, i) => `
      <div class="row" data-song="${esc(x.id)}">
        <div class="idx ${i < 3 ? 'top' : ''}">${i + 1}</div>
        <div class="main">
          <div class="song">${esc(x.song)}</div>
          <div class="meta">
            <span class="diff ${x.rank}">${x.rank}</span>
            <span>定数 ${x.difficulty.toFixed(1)}</span>
            <span class="rating ${x.rating}">${x.rating}</span>
          </div>
        </div>
        <div class="side">
          <div class="score">${x.score}</div>
          <div class="rksv">${fmt(x.rks)} · ${x.acc.toFixed(2)}%</div>
        </div>
      </div>`).join('');
    box.querySelectorAll('[data-song]').forEach((el) => el.addEventListener('click', () => openSong(el.dataset.song, c)));
  }

  /* ---------- 原版模板数据 ---------- */

  let avatarList = null;
  async function avatarName() {
    const id = state.save?.user?.avatar || '';
    if (avatarList === null) {
      try { avatarList = await (await fetch('plugin/html/avatar/index.json')).json(); } catch (e) { avatarList = []; }
    }
    if (avatarList.includes(id)) return id;
    if (id === 'Cipher : /2&//<|0') return 'Cipher1';
    if (id === 'Oblivion: PHIN') return 'OblivionPHIN';
    return 'Introduction';
  }

  function rateScore(real, fc, total) {
    if (real === total && total > 0) return 'phi';
    if (fc) return 'FC';
    if (real >= total * 0.96) return 'V';
    if (real >= total * 0.92) return 'S';
    if (real >= total * 0.88) return 'A';
    if (real >= total * 0.82) return 'B';
    if (real >= total * 0.70) return 'C';
    if (real > 0) return 'F';
    return 'NEW';
  }

  function buildStats(computed) {
    const levels = ['EZ', 'HD', 'IN', 'AT'];
    const out = levels.map((title) => ({ title, tot: 0, unlock: 0, cleared: 0, fc: 0, phi: 0, real_score: 0, tot_score: 0, Rating: 'NEW' }));
    const tot = levels.map((lv) => DATA.songs.filter((s) => Number(s.diffs[lv]) > 0).length);
    const rec = state.save?.records || {};
    for (const id of Object.keys(rec)) {
      const song = SONG_BY_ID.get(normId(id));
      if (!song) continue;
      for (let lv = 0; lv < 4; lv++) {
        const r = rec[id][lv];
        if (!r || !Number(song.diffs[levels[lv]])) continue;
        out[lv].unlock++;
        if (r.score >= 700000) out[lv].cleared++;
        if (r.fc || r.score === 1000000) out[lv].fc++;
        if (r.score === 1000000) out[lv].phi++;
        out[lv].real_score += r.score;
        out[lv].tot_score += 1000000;
      }
    }
    out.forEach((o, i) => {
      o.tot = tot[i];
      o.Rating = rateScore(o.real_score, o.unlock > 0 && o.fc === o.unlock, o.tot_score);
    });
    return out;
  }

  function suggestFor(item, i, rest, minuprks) {
    if (!item.difficulty) return { text: '无法推分', type: 5 };
    const base = i < 26 ? item.rks : (rest[26]?.rks ?? item.rks);
    const target = base + minuprks * 30;
    const acc = 45 * Math.sqrt(Math.max(0, target) / item.difficulty) + 55;
    if (acc >= 100 || !isFinite(acc)) return { text: '无法推分', type: 5 };
    const type = acc < 98.5 ? 0 : acc < 99 ? 1 : acc < 99.5 ? 2 : acc < 99.7 ? 3 : acc < 99.85 ? 4 : 5;
    return { text: `${acc.toFixed(2)}%`, type };
  }

  async function buildB19Data(computed) {
    const list = computed.list;
    const phi = list.filter((x) => x.acc >= 100).slice(0, 3);
    const rest = list.filter((x) => !phi.includes(x));
    const best27 = rest.slice(0, 27);
    const phiSum = phi.reduce((s, x) => s + x.rks, 0);
    const bestSum = best27.reduce((s, x) => s + x.rks, 0);
    const comRks = (phiSum + bestSum) / 30;
    const userrks = Number(computed.rks) || 0;
    let minuprks = Math.floor(userrks * 100) / 100 + 0.005 - userrks;
    if (minuprks < 0) minuprks += 0.01;
    // 曲绘本地打包（由 tools/prepare-assets.mjs 生成），彻底离线
    const ill = (id) => `https://appassets.local/plugin/ill/${encodeURIComponent(id)}.jpg`;
    const n = Number(state.n) || 30;
    const rows = list.slice(0, n).map((x, i) => {
      const sug = suggestFor(x, i, rest, minuprks);
      return {
        id: x.id, song: x.song, rank: x.rank, difficulty: x.difficulty,
        score: x.score, acc: x.acc, rks: x.rks, Rating: x.rating,
        suggest: sug.text, suggestType: sug.type, illustration: ill(x.id), num: i + 1,
      };
    });
    return {
      phi: phi.length ? phi.map((x) => ({ ...x, Rating: x.rating, illustration: ill(x.id) })) : undefined,
      b19_list: rows,
      PlayerId: computed.nickname,
      Rks: comRks.toFixed(4),
      Date: computed.updatedAt || '',
      ChallengeMode: Math.floor(computed.challengeMode / 100),
      ChallengeModeRank: computed.challengeMode % 100,
      background: 'https://appassets.local/plugin/html/otherimg/phigros.png',
      theme: 'star',
      gameuser: {
        avatar: await avatarName(),
        PlayerId: computed.nickname,
        rks: comRks,
        data: computed.dataSize,
        ChallengeMode: Math.floor(computed.challengeMode / 100),
        ChallengeModeRank: computed.challengeMode % 100,
        selfIntro: state.save?.user?.selfIntro || '',
      },
      nnum: n,
      stats: buildStats(computed),
      spInfo: [],
      _res_path: 'https://appassets.local/plugin/',
      defaultLayout: '',
      renderNoJs: false,
      sys: { scale: '', copyright: '' },
      Version: { ver: '1.1.0', yunzai: '' },
    };
  }

  window.__buildB19Data = buildB19Data;
  window.__phiState = state;

  /* ---------- 图片保存 / 分享 ---------- */

  function cardDataUrl() {
    const c = state.computed;
    const label = `BEST ${state.n}`;
    return window.PhiCard.draw(c, state.n, label);
  }

  function bridgeImage(method) {
    return new Promise((resolve, reject) => {
      const id = `${method}_${Date.now()}`;
      window.__imageResolve = window.__imageResolve || {};
      window.__imageResolve[id] = { resolve, reject };
      try {
        window.NativeBridge[method](cardDataUrl(), `phi-b${state.n}-${Date.now()}.png`, id);
      } catch (e) { reject(e); }
      setTimeout(() => {
        if (window.__imageResolve[id]) { delete window.__imageResolve[id]; reject(new Error('保存超时')); }
      }, 20000);
    });
  }

  window.__imageResult = function (id, json) {
    const task = window.__imageResolve && window.__imageResolve[id];
    if (!task) return;
    delete window.__imageResolve[id];
    let res = {};
    try { res = JSON.parse(json); } catch (e) { /* ignore */ }
    if (res.ok) task.resolve(res); else task.reject(new Error(res.error || '操作失败'));
  };

  async function saveCard(share) {
    if (!state.computed) { toast('请先同步成绩'); return; }
    const mode = share ? 'share' : 'save';
    if (window.NativeBridge && typeof window.NativeBridge.renderCard === 'function') {
      toast('正在按原版模板生成…');
      try {
        const data = await buildB19Data(state.computed);
        const res = await nativePromise('renderCard', JSON.stringify(data), mode);
        showPreview(res && res.preview, res && res.meta);
        toast(share ? '已打开分享' : '已保存到相册 Pictures/PhiLocal');
        return res;
      } catch (e) {
        console.error(e);
        toast('原版模板渲染失败，改用内置绘制：' + (e.message || e));
      }
    }
    // 回退：Canvas 绘制
    try {
      let images = {};
      try { images = await window.PhiCard.preload(state.computed.list.slice(0, state.n)); } catch (e) { images = {}; }
      const url = window.PhiCard.draw(state.computed, state.n, `BEST ${state.n}`, images);
      if (window.NativeBridge && typeof window.NativeBridge.saveImage === 'function') {
        const id = `img_${Date.now()}`;
        window.__imageResolve = window.__imageResolve || {};
        const p = new Promise((resolve, reject) => {
          window.__imageResolve[id] = { resolve, reject };
          window.NativeBridge[mode === 'share' ? 'shareImage' : 'saveImage'](url, `phi-b${state.n}.png`, id);
        });
        await p;
        toast(share ? '已打开分享' : '已保存到相册');
      } else {
        const a = document.createElement('a');
        a.href = url; a.download = `phi-b${state.n}.png`; a.click();
      }
    } catch (e) {
      toast(String(e.message || e));
    }
  }

  function showPreview(url, meta) {
    if (!url) return;
    const box = document.getElementById('cardPreview');
    const img = document.getElementById('cardPreviewImg');
    if (!box || !img) return;
    img.src = url;
    box.classList.remove('hidden');
  }

  /** 调用原生桥并等待回调 */
  function nativePromise(method, ...args) {
    return new Promise((resolve, reject) => {
      const id = `${method}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const timer = setTimeout(() => { delete window.__imageResolve[id]; reject(new Error('生成超时')); }, 90000);
      window.__imageResolve = window.__imageResolve || {};
      window.__imageResolve[id] = {
        resolve: (v) => { clearTimeout(timer); resolve(v); },
        reject: (e) => { clearTimeout(timer); reject(e); },
      };
      window.NativeBridge[method](...args, id);
    });
  }

  function renderLibrary() {
    const box = $('songList');
    if (!box) return;
    const q = state.query.trim().toLowerCase();
    let songs = DATA.songs.filter((s) => {
      if (state.diffFilter && !s.diffs[state.diffFilter]) return false;
      if (!q) return true;
      return (
        s.song.toLowerCase().includes(q) ||
        s.composer.toLowerCase().includes(q) ||
        Object.values(s.charters || {}).some((c) => String(c).toLowerCase().includes(q))
      );
    });
    const maxDiff = (s) => Math.max(0, ...Object.values(s.diffs || {}).map(Number));
    if (state.sortMode === 'diff') songs = songs.sort((a, b) => maxDiff(b) - maxDiff(a));
    else if (state.sortMode === 'name') songs = songs.sort((a, b) => a.song.localeCompare(b.song, 'zh-Hans-CN'));
    else if (state.sortMode === 'bpm') songs = songs.sort((a, b) => (parseFloat(b.bpm) || 0) - (parseFloat(a.bpm) || 0));
    else if (state.sortMode === 'chapter') songs = songs.sort((a, b) => a.chapter.localeCompare(b.chapter, 'zh-Hans-CN'));

    const shown = songs.slice(0, 400);
    box.innerHTML = shown.length
      ? shown.map((s) => {
        const boxes = LEVEL_NAMES.filter((lv) => s.diffs[lv]).map((lv) => `
          <span class="dbox ok ${lv}"><span style="font-size:9px;color:var(--muted)">${lv}</span><b>${Number(s.diffs[lv]).toFixed(1)}</b></span>`).join('');
        return `<div class="song-row" data-song="${esc(s.id)}">
          <div class="txt"><div class="n">${esc(s.song)}</div><div class="s">${esc(s.composer)}${s.bpm ? ` · ${esc(s.bpm)} BPM` : ''}</div></div>
          <div class="diffs">${boxes || '<span class="dbox">SP</span>'}</div>
        </div>`;
      }).join('')
      : '<div class="empty">没有找到匹配的曲目</div>';
    box.querySelectorAll('[data-song]').forEach((el) => el.addEventListener('click', () => openSong(el.dataset.song, state.computed)));
  }

  function openSong(id, computed) {
    const s = SONG_BY_ID.get(normId(id));
    if (!s) return;
    const mine = (computed?.list || []).filter((x) => x.id === s.id);
    const blocks = LEVEL_NAMES.filter((lv) => s.diffs[lv] || s.notes[lv]).map((lv) => {
      const n = s.notes[lv];
      const best = mine.find((m) => m.rank === lv);
      return `
        <div class="chart-block">
          <h4><span class="diff ${lv}">${lv}</span> 定数 ${Number(s.diffs[lv] || 0).toFixed(1)}
            ${best ? ` · <span class="muted">你的成绩 ${best.score}（${best.acc.toFixed(2)}% · ${fmt(best.rks)}）</span>` : ''}</h4>
          ${n ? `<div class="note-grid">
            <div class="kv"><span>Tap</span><b>${n.tap}</b></div>
            <div class="kv"><span>Drag</span><b>${n.drag}</b></div>
            <div class="kv"><span>Hold</span><b>${n.hold}</b></div>
            <div class="kv"><span>Flick</span><b>${n.flick}</b></div>
          </div>
          <div class="kv" style="margin-top:8px;display:flex;justify-content:space-between">
            <span style="margin:0">物量合计</span><b>${n.combo}</b>
          </div>` : ''}
          <div class="kv" style="margin-top:8px"><span>谱师</span><b>${esc(s.charters[lv] || '—')}</b></div>
        </div>`;
    }).join('');

    $('sheetBody').innerHTML = `
      <h3>${esc(s.song)}</h3>
      <div class="sub">${esc(s.composer)}${s.illustrator ? ` · 曲绘 ${esc(s.illustrator)}` : ''}</div>
      <div class="grid2">
        <div class="kv"><span>BPM</span><b>${esc(s.bpm || '—')}</b></div>
        <div class="kv"><span>时长</span><b>${esc(s.length || '—')}</b></div>
      </div>
      <div class="kv" style="margin-top:10px"><span>章节</span><b>${esc(s.chapter || '—')}</b></div>
      ${blocks || '<div class="empty">暂无谱面数据</div>'}
    `;
    $('sheet').classList.add('show');
    $('sheetMask').classList.add('show');
  }

  function closeSheet() {
    $('sheet').classList.remove('show');
    $('sheetMask').classList.remove('show');
  }

  let toastTimer = null;
  function toast(msg) {
    const el = $('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
  }

  /* ---------------- 事件 ---------------- */

  function switchView(view) {
    state.view = view;
    renderAll();
  }

  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      if (!state.computed && tab.dataset.view !== 'settings') {
        toast('请先连接账号');
        state.view = 'settings';
        renderAll();
        return;
      }
      switchView(tab.dataset.view);
    });
  });

  $('bindBtn').addEventListener('click', () => {
    state.token = $('tokenInput').value.trim();
    state.server = $('serverSelect').value;
    store.setItem(LS_TOKEN, state.token);
    store.setItem(LS_SERVER, state.server);
    sync();
  });

  $('saveTokenBtn').addEventListener('click', () => {
    state.token = $('tokenInput2').value.trim();
    state.server = $('serverSelect2').value;
    store.setItem(LS_TOKEN, state.token);
    store.setItem(LS_SERVER, state.server);
    sync();
  });

  $('syncBtn').addEventListener('click', sync);
  $('cardPreviewClose')?.addEventListener('click', () => $('cardPreview').classList.add('hidden'));
  $('b19Seg')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-n]');
    if (!btn) return;
    state.n = Number(btn.dataset.n);
    store.setItem('phi.n', String(state.n));
    renderB19();
  });
  $('saveImgBtn')?.addEventListener('click', () => saveCard(false));
  $('shareImgBtn')?.addEventListener('click', () => saveCard(true));
  $('goB19Btn').addEventListener('click', () => switchView('b19'));
  $('clearBtn').addEventListener('click', () => {
    store.removeItem(LS_TOKEN);
    store.removeItem(LS_SERVER);
    store.removeItem(LS_LAST);
    state.token = '';
    state.save = null;
    state.computed = null;
    setStatus('未绑定');
    switchView('home');
    toast('已清除本机数据');
  });

  $('searchInput').addEventListener('input', (e) => {
    state.query = e.target.value;
    renderLibrary();
  });

  $('diffChips').addEventListener('click', (e) => {
    const chip = e.target.closest('.fchip');
    if (!chip) return;
    state.diffFilter = chip.dataset.diff;
    [...$('diffChips').children].forEach((c) => c.classList.toggle('active', c === chip));
    renderLibrary();
  });

  $('sortChips').addEventListener('click', (e) => {
    const chip = e.target.closest('.fchip');
    if (!chip) return;
    state.sortMode = chip.dataset.sort;
    [...$('sortChips').children].forEach((c) => c.classList.toggle('active', c === chip));
    renderLibrary();
  });

  $('sheetMask').addEventListener('click', closeSheet);

  /* ---------------- 启动 ---------------- */

  function boot() {
    try {
      const v = window.NativeBridge && window.NativeBridge.appVersion && window.NativeBridge.appVersion();
      const el = document.getElementById('appVersion');
      if (v && el) el.textContent = v;
    } catch (e) { /* 预览环境忽略 */ }
    if (state.token) {
      $('tokenInput').value = state.token;
      $('tokenInput2').value = state.token;
      sync();
    } else {
      setStatus('未绑定');
      renderAll();
    }
  }

  boot();
})();
