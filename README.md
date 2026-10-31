# Phi 本地版（phi-plugin 的离线安卓移植）

把 [Catrong/phi-plugin](https://github.com/Catrong/phi-plugin) 从「QQ 机器人插件」改写成**纯本机使用**的 Android 应用：
不再需要 QQ、不需要 Yunzai/Koishi 框架、也不需要服务器；打开 App、填入 TapTap 云存档的 Session Token，就能查看自己的成绩。

## 功能

| 模块 | 说明 |
| --- | --- |
| 账号 | 输入 25 位 Session Token（国服 / 国际服），拉取最新云存档 |
| 概览 | RKS、游玩曲目数、φ / FC 数、Data、B19 均 RKS、Challenge Mode |
| Best 19 | 按等效 RKS 排序的 B19 列表，含定数、分数、ACC、评级 |
| 曲库 | 346 首曲目离线数据：曲名、曲师、谱师、BPM、时长、章节、定数、物量（Tap/Drag/Hold/Flick/Combo），支持搜索与筛选 |
| 曲目详情 | 点击任意曲目查看各难度谱面信息与本机最好成绩 |
| 设置 | 更换 Token / 服务器、清除本机数据 |

原插件里的 QQ 相关能力（群聊指令、@、图片发送、排行、货币、猜歌、机器人管理、接口配置等）全部移除。

## 技术实现

- **原生壳**：单 Activity + WebView（Java，无第三方依赖），`app/src/main/java/com/philocal/app/MainActivity.java`
- **前端**：`web/` 下的 HTML/CSS/JS，直接运行在 WebView 中
  - `save.js`：从插件 `lib/` 移植的存档解析（ByteReader / AES-CBC / GameProgress / GameRecord / GameUser / Settings）
  - `app.js`：RKS 计算、B19 排序、评级、界面渲染
  - `data.js`：由 `tools/gen-data.mjs` 从插件 `resources/info`（info.csv / infolist.json / notesInfo.json / spinfo.json）生成的离线曲库
- **网络**：LeanCloud 云存档接口由 Java 侧 `HttpURLConnection` 代理（`NativeBridge.httpGet`），避免 WebView 跨域限制；JS 侧只做解析
- **页面来源**：通过 `shouldInterceptRequest` 把 `https://appassets.local/*` 映射到 `assets/www`，保证是安全源（localStorage 可用）

## 构建

### GitHub Actions（推荐）

推送到 GitHub 后，`.github/workflows/build.yml` 会在 `ubuntu-latest` 上用 JDK 17 + Gradle 8.7 编译：

```
Actions → Build APK → 运行结束在 Artifacts 下载 phi-local-debug
```

也可以 `workflow_dispatch` 手动触发；打 release 时会自动把 APK 附到 Release。

### 本地

```bash
cd app
../gradlew assembleDebug   # 需要 Android SDK + JDK 17
```

APK 输出：`app/build/outputs/apk/debug/app-debug.apk`。

## 目录

```
app/                      Android 工程（Java 壳 + 资源）
web/                      前端源码（会被同步到 assets/www）
tools/gen-data.mjs        曲库数据生成脚本
.github/workflows/        GitHub Actions 构建
```

## 隐私

- Token、同步结果只保存在设备本机（WebView localStorage），不会上传到任何第三方服务器。
- 除了访问 TapTap LeanCloud 云存档接口外，App 不发起其它网络请求。

## 致谢与许可

- 数据、存档格式与算法来自 [Catrong/phi-plugin](https://github.com/Catrong/phi-plugin)（ISC License）。
- Phigros 及相关素材版权归 Pigeon Games 所有；本项目仅供个人查看自己的游戏数据使用。
