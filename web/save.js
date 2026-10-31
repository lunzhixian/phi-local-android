/* 存档解析：由 phi-plugin 的 lib/ 移植（ByteReader / AES / GameRecord / GameProgress / GameUser / Summary） */
(function (global) {
  'use strict';

  const KEY_B64 = '6Jaa0qVAJZuXkZCLiOa/Ax5tIZVu+taKUN1V1nqwkks=';
  const IV_B64 = 'Kk/wisgNYwcAV8WVGMgyUw==';

  const CryptoJS = global.CryptoJS;
  const key = CryptoJS.enc.Base64.parse(KEY_B64);
  const iv = CryptoJS.enc.Base64.parse(IV_B64);

  const hexOf = (u8) => Array.from(u8, (b) => b.toString(16).padStart(2, '0')).join('');

  class ByteReader {
    constructor(data, position = 0) {
      if (typeof data === 'string') {
        const clean = data.replace(/[^0-9a-fA-F]/g, '');
        const out = new Uint8Array(clean.length / 2);
        for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.substr(i * 2, 2), 16);
        this.data = out;
      } else if (data instanceof ArrayBuffer) {
        this.data = new Uint8Array(data);
      } else {
        this.data = data;
      }
      this.position = position;
    }
    remaining() { return this.data.length - this.position; }
    getByte() { return this.data[this.position++]; }
    getShort() {
      this.position += 2;
      return (this.data[this.position - 1] << 8) ^ (this.data[this.position - 2] & 0xff);
    }
    getInt() {
      this.position += 4;
      return (
        (this.data[this.position - 1] << 24) ^
        ((this.data[this.position - 2] & 0xff) << 16) ^
        ((this.data[this.position - 3] & 0xff) << 8) ^
        (this.data[this.position - 4] & 0xff)
      );
    }
    getFloat() {
      const v = new DataView(this.data.buffer, this.data.byteOffset + this.position, 4).getFloat32(0, true);
      this.position += 4;
      return v;
    }
    getVarInt() {
      if (this.data[this.position] > 127) {
        this.position += 2;
        return Number(0b01111111 & this.data[this.position - 2]) ^ (this.data[this.position - 1] << 7);
      }
      return this.data[this.position++];
    }
    skipVarInt() {
      if (this.data[this.position] < 0 || this.data[this.position] > 127) this.position += 2;
      else this.position++;
    }
    getString() {
      const length = this.getVarInt();
      this.position += length;
      const start = this.position - length;
      return new TextDecoder('utf-8', { fatal: false }).decode(this.data.subarray(start, this.position));
    }
    /** 取出从 position 开始到末尾的 base64 */
    getAllByteB64() {
      const rest = this.data.subarray(this.position);
      let bin = '';
      for (let i = 0; i < rest.length; i++) bin += String.fromCharCode(rest[i]);
      return btoa(bin);
    }
  }

  const decrypt = (b64) => CryptoJS.AES.decrypt(b64, key, { iv }).toString(CryptoJS.enc.Hex);
  const b64ToBytes = (b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

  function getBit(data, index) { return (data & (1 << index)) ? true : false; }

  /* ---------- 游戏存档结构 ---------- */

  function parseProgress(data) {
    const r = new ByteReader(data);
    let tem = r.getByte();
    const p = {
      isFirstRun: getBit(tem, 0), legacyChapterFinished: getBit(tem, 1),
      alreadyShowCollectionTip: getBit(tem, 2), alreadyShowAutoUnlockINTip: getBit(tem, 3),
    };
    p.completed = r.getString();
    p.songUpdateInfo = r.getVarInt();
    p.challengeModeRank = r.getShort();
    p.money = [];
    for (let i = 0; i < 5; i++) p.money.push(r.getVarInt());
    p.unlockFlagOfSpasmodic = r.getByte();
    p.unlockFlagOfIgallta = r.getByte();
    p.unlockFlagOfRrharil = r.getByte();
    p.flagOfSongRecordKey = r.getByte();
    p.randomVersionUnlocked = r.getByte();
    tem = r.getByte();
    p.chapter8UnlockBegin = getBit(tem, 0);
    p.chapter8UnlockSecondPhase = getBit(tem, 1);
    p.chapter8Passed = getBit(tem, 2);
    p.chapter8SongUnlocked = r.getByte();
    return p;
  }

  function parseUser(data) {
    const r = new ByteReader(data);
    return {
      showPlayerId: getBit(r.getByte(), 0),
      selfIntro: r.getString(),
      avatar: r.getString(),
      background: r.getString(),
    };
  }

  function parseSettings(data) {
    const r = new ByteReader(data);
    const tem = r.getByte();
    const s = {
      chordSupport: getBit(tem, 0), fcAPIndicator: getBit(tem, 1),
      enableHitSound: getBit(tem, 2), lowResolutionMode: getBit(tem, 3),
    };
    s.deviceName = r.getString();
    ['bright', 'musicVolume', 'effectVolume', 'hitSoundVolume', 'soundOffset', 'noteScale']
      .forEach((k) => { s[k] = r.getFloat(); });
    return s;
  }

  function parseGameRecord(data) {
    const r = new ByteReader(data);
    const Record = {};
    r.getVarInt(); // songsnum
    while (r.remaining() > 0) {
      const key = r.getString();
      r.skipVarInt();
      const length = r.getByte();
      const fc = r.getByte();
      const song = [];
      for (let level = 0; level < 5; level++) {
        if (getBit(length, level)) {
          const rec = { score: 0, acc: 0, fc: false };
          rec.score = r.getInt();
          rec.acc = r.getFloat();
          rec.fc = rec.score === 1000000 && rec.acc === 100 ? true : getBit(fc, level);
          song[level] = rec;
        }
      }
      Record[key] = song;
    }
    return Record;
  }

  function parseSummary(b64) {
    const r = new ByteReader(b64ToBytes(b64));
    const s = {
      updatedAt: '',
      saveVersion: r.getByte(),
      challengeModeRank: r.getShort(),
      rankingScore: r.getFloat(),
      gameVersion: r.getVarInt(),
      avatar: r.getString(),
      cleared: [], fullCombo: [], phi: [],
    };
    for (let level = 0; level < 4; level++) {
      s.cleared[level] = r.getShort();
      s.fullCombo[level] = r.getShort();
      s.phi[level] = r.getShort();
    }
    return s;
  }

  /* ---------- 网络 ---------- */

  const SERVERS = {
    cn: {
      baseUrl: 'https://rak3ffdi.cloud.tds1.tapapis.cn/1.1',
      headers: {
        'X-LC-Id': 'rAK3FfdieFob2Nn8Am',
        'X-LC-Key': 'Qr9AEqtuoSVS3zeD6iVbM4ZC0AtkJcQ89tywVyi0',
        'User-Agent': 'LeanCloud-CSharp-SDK/1.0.3',
        Accept: 'application/json',
      },
    },
    global: {
      baseUrl: 'https://kviehlel.cloud.ap-sg.tapapis.com/1.1',
      headers: {
        'X-LC-Id': 'kviehleldgxsagpozb',
        'X-LC-Key': 'tG9CTm0LDD736k9HMM9lBZrbeBGRmUkjSfNLDNib',
        'User-Agent': 'LeanCloud-CSharp-SDK/1.0.3',
        Accept: 'application/json',
      },
    },
  };

  const pending = new Map();
  let seq = 0;
  window.__nativeResolve = function (id, json) {
    const task = pending.get(id);
    if (!task) return;
    pending.delete(id);
    let res;
    try { res = JSON.parse(json); } catch (e) { task.reject(new Error('网络返回异常')); return; }
    if (!res.ok) {
      task.reject(new Error(res.error || `请求失败 (HTTP ${res.status || '?'})`));
    } else {
      task.resolve(res.body);
    }
  };

  function nativeCall(method, url, headers) {
    return new Promise((resolve, reject) => {
      const id = `${method}_${++seq}`;
      pending.set(id, { resolve, reject });
      try {
        global.NativeBridge[method](url, JSON.stringify(headers || {}), id);
      } catch (e) {
        pending.delete(id);
        reject(e);
      }
      setTimeout(() => {
        if (pending.has(id)) {
          pending.delete(id);
          reject(new Error('网络超时，请检查网络后重试'));
        }
      }, 45000);
    });
  }

  const hasBridge = () => !!(global.NativeBridge && typeof global.NativeBridge.httpGet === 'function');

  async function request(url, headers) {
    if (hasBridge()) {
      const body = await nativeCall('httpGet', url, headers);
      try { return JSON.parse(body); } catch (e) { return body; }
    }
    const resp = await fetch(url, { headers });
    if (!resp.ok) throw new Error(`请求失败 (HTTP ${resp.status})`);
    return resp.json();
  }

  async function requestBinary(url) {
    if (hasBridge()) {
      const b64 = await nativeCall('httpGetBase64', url, {});
      return b64ToBytes(b64);
    }
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`下载存档失败 (HTTP ${resp.status})`);
    return new Uint8Array(await resp.arrayBuffer());
  }

  async function fetchAccount(session, server) {
    const cfg = SERVERS[server] || SERVERS.cn;
    const h = { ...cfg.headers, 'X-LC-Session': session };
    const me = await request(`${cfg.baseUrl}/users/me`, h);
    const where = encodeURIComponent(JSON.stringify({ user: { __type: 'Pointer', className: '_User', objectId: me.objectId } }));
    const list = await request(
      `${cfg.baseUrl}/gamesaves/?skip=0&limit=100&where=${where}&include=cover,gameFile`,
      h
    );
    const saves = (list.results || []).filter((x) => x && x.gameFile && x.gameFile.url);
    if (!saves.length) throw new Error('该 Token 下没有云存档，请先在游戏内同步存档');
    saves.sort((a, b) => new Date(b.modifiedAt?.iso || b.updatedAt || 0) - new Date(a.modifiedAt?.iso || a.updatedAt || 0));
    return { player: me, saveInfo: saves[0], baseUrl: cfg.baseUrl, headers: h };
  }

  async function loadSave(saveInfo) {
    const bytes = await requestBinary(saveInfo.gameFile.url);
    const zip = await global.JSZip.loadAsync(bytes);
    const readPart = async (name) => {
      const file = zip.file(name);
      if (!file) return null;
      const buf = await file.async('uint8array');
      const body = buf.subarray(1); // 跳过版本字节
      let bin = '';
      for (let i = 0; i < body.length; i++) bin += String.fromCharCode(body[i]);
      return decrypt(btoa(bin));
    };
    const progressHex = await readPart('gameProgress');
    const userHex = await readPart('user');
    const settingsHex = await readPart('settings');
    const recordHex = await readPart('gameRecord');

    let summary = null;
    try { summary = parseSummary(saveInfo.summary); } catch (e) { summary = null; }

    return {
      progress: progressHex ? parseProgress(progressHex) : null,
      user: userHex ? parseUser(userHex) : null,
      settings: settingsHex ? parseSettings(settingsHex) : null,
      records: recordHex ? parseGameRecord(recordHex) : {},
      summary,
    };
  }

  global.PhiSave = { ByteReader, SERVERS, fetchAccount, loadSave, parseSummary, _internal: { decrypt, parseProgress, parseUser, parseSettings, parseGameRecord } };
})(window);
