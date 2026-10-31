/* 成绩卡片绘制：用 Canvas 生成可保存/分享的 B19 / B30 长图 */
(function (global) {
  'use strict';

  const COLOR = {
    EZ: '#3ddc97',
    HD: '#4aa8ff',
    IN: '#ff5d7a',
    AT: '#b06bff',
    phi: '#ffd166',
    V: '#ffd166',
    S: '#9fe870',
    A: '#7dd3fc',
    B: '#c4b5fd',
    C: '#fda4af',
    F: '#94a3b8',
    FC: '#a5f3fc',
    NEW: '#64748b',
  };

  const W = 1080;
  const PAD = 48;
  const ROW_H = 104;
  const ROW_GAP = 14;

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function ellipsis(ctx, text, maxWidth) {
    if (ctx.measureText(text).width <= maxWidth) return text;
    let lo = 0, hi = text.length;
    while (lo < hi) {
      const mid = Math.ceil((lo + hi) / 2);
      const t = text.slice(0, mid) + '…';
      if (ctx.measureText(t).width <= maxWidth) lo = mid;
      else hi = mid - 1;
    }
    return text.slice(0, lo) + '…';
  }

  function textOn(hex) {
    const h = hex.replace('#', '');
    const r = parseInt(h.slice(0, 2), 16) / 255;
    const g = parseInt(h.slice(2, 4), 16) / 255;
    const b = parseInt(h.slice(4, 6), 16) / 255;
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return lum > 0.55 ? '#08111f' : '#ffffff';
  }

  function badge(ctx, text, x, y, color, size) {
    ctx.save();
    ctx.font = `800 ${size}px sans-serif`;
    const w = ctx.measureText(text).width + size * 0.9;
    const h = size * 1.55;
    ctx.fillStyle = color;
    roundRect(ctx, x, y, w, h, size * 0.35);
    ctx.fill();
    ctx.fillStyle = textOn(color);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x + size * 0.45, y + h / 2 + 1);
    ctx.restore();
    return w;
  }

  /**
   * @param {object} c compute() 的结果
   * @param {number} n 展示条数（19 / 30 / 50）
   * @param {string} modeLabel
   */
  function draw(c, n, modeLabel) {
    const list = (c.list || []).slice(0, n);
    const listTop = 400;
    const footerH = 130;
    const H = listTop + list.length * (ROW_H + ROW_GAP) + footerH;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    // 背景
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#0a0e18');
    bg.addColorStop(0.55, '#101827');
    bg.addColorStop(1, '#0b1020');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // 顶部光晕
    const glow = ctx.createRadialGradient(W * 0.18, 0, 40, W * 0.18, 0, 760);
    glow.addColorStop(0, 'rgba(125,92,255,0.42)');
    glow.addColorStop(1, 'rgba(125,92,255,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, 620);
    const glow2 = ctx.createRadialGradient(W * 0.95, 80, 20, W * 0.95, 80, 560);
    glow2.addColorStop(0, 'rgba(56,217,255,0.28)');
    glow2.addColorStop(1, 'rgba(56,217,255,0)');
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, W, 560);

    // 标题
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = '600 26px sans-serif';
    ctx.fillText('PHI · LOCAL', PAD, 76);
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 62px sans-serif';
    ctx.fillText(modeLabel, PAD, 146);

    // 玩家信息
    const nameY = 214;
    ctx.beginPath();
    ctx.arc(PAD + 34, nameY - 16, 34, 0, Math.PI * 2);
    const av = ctx.createLinearGradient(PAD, nameY - 50, PAD + 68, nameY + 18);
    av.addColorStop(0, '#7d5cff');
    av.addColorStop(1, '#38d9ff');
    ctx.fillStyle = av;
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 34px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText((c.nickname || 'Φ').slice(0, 1).toUpperCase(), PAD + 34, nameY - 4);
    ctx.textAlign = 'left';

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 36px sans-serif';
    ctx.fillText(ellipsis(ctx, c.nickname || 'Phigros Player', 520), PAD + 92, nameY);
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = '500 24px sans-serif';
    ctx.fillText(`${c.updatedAt || ''}`, PAD + 92, nameY + 36);

    // 右侧 RKS
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '600 22px sans-serif';
    ctx.fillText('RANKING SCORE', W - PAD, 196);
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 64px sans-serif';
    ctx.fillText(Number(c.rks || 0).toFixed(4), W - PAD, 258);
    ctx.textAlign = 'left';

    // 统计行
    const stats = [
      ['游玩曲目', String(c.played)],
      ['φ', String(c.phiCount)],
      ['FC', String(c.fcCount)],
      ['B' + n + '均 RKS', Number(c.avg || 0).toFixed(2)],
    ];
    ctx.font = '500 22px sans-serif';
    let sx = PAD;
    for (const [k, v] of stats) {
      ctx.fillStyle = 'rgba(255,255,255,0.04)';
      roundRect(ctx, sx, 276, 224, 64, 16);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '500 20px sans-serif';
      ctx.fillText(k, sx + 18, 302);
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 28px sans-serif';
      ctx.fillText(v, sx + 18, 332);
      sx += 240;
    }

    // 分割线
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(PAD, 368);
    ctx.lineTo(W - PAD, 368);
    ctx.stroke();

    // 列表
    let y = listTop;
    list.forEach((item, i) => {
      ctx.fillStyle = i < 3 ? 'rgba(255,209,102,0.06)' : 'rgba(255,255,255,0.035)';
      roundRect(ctx, PAD, y, W - PAD * 2, ROW_H, 20);
      ctx.fill();

      ctx.textAlign = 'left';
      ctx.fillStyle = i < 3 ? '#ffd166' : 'rgba(255,255,255,0.45)';
      ctx.font = '800 34px sans-serif';
      ctx.fillText(String(i + 1), PAD + 22, y + ROW_H / 2 + 12);

      const nameX = PAD + 96;
      ctx.fillStyle = '#ffffff';
      ctx.font = '600 30px sans-serif';
      ctx.fillText(ellipsis(ctx, item.song, 470), nameX, y + 44);

      // 难度 + 定数 + 评级
      let bx = nameX;
      const chipW = badge(ctx, item.rank, bx, y + 60, COLOR[item.rank] || '#7a7f91', 20);
      bx += chipW + 10;
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.font = '500 24px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(`定数 ${Number(item.difficulty || 0).toFixed(1)}`, bx, y + 76);
      ctx.textBaseline = 'alphabetic';
      bx += 130;
      badge(ctx, item.rating, bx, y + 60, COLOR[item.rating] || '#94a3b8', 20);

      // 右侧成绩
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 32px sans-serif';
      ctx.fillText(String(item.score), W - PAD - 26, y + 46);
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '500 23px sans-serif';
      ctx.fillText(`${item.acc.toFixed(2)}%  ·  ${Number(item.rks).toFixed(4)}`, W - PAD - 26, y + 80);
      ctx.textAlign = 'left';

      y += ROW_H + ROW_GAP;
    });

    // 页脚
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = '500 22px sans-serif';
    ctx.fillText('Phi 本地版 · 数据来自 TapTap 云存档 · 仅供个人查看', W / 2, H - 58);

    return canvas.toDataURL('image/png');
  }

  global.PhiCard = { draw };
})(window);
