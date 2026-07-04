# 世界监控（World Monitor）

**全中文视角的实时全球情报仪表板** —— AI 驱动的新闻聚合、地缘政治监控、基础设施追踪，统一态势感知界面。中国为主视角，支持中国股市、贵金属人民币计价、中国主流 AI 大模型。

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Latest release](https://img.shields.io/github/v/release/xfree2026/worldmonitor?style=flat)](https://github.com/xfree2026/worldmonitor/releases/latest)
[![Last commit](https://img.shields.io/github/last-commit/xfree2026/worldmonitor)](https://github.com/xfree2026/worldmonitor/commits/main)

<p align="center">
  <a href="https://github.com/xfree2026/worldmonitor/releases/latest"><img src="https://img.shields.io/badge/下载-Windows_(.exe)-0078D4?style=for-the-badge&logo=windows&logoColor=white" alt="下载 Windows 版"></a>&nbsp;
  <a href="https://github.com/xfree2026/worldmonitor/releases/latest"><img src="https://img.shields.io/badge/下载-Android_(.apk)-3DDC84?style=for-the-badge&logo=android&logoColor=white" alt="下载 Android 版"></a>&nbsp;
  <a href="https://github.com/xfree2026/worldmonitor/releases/latest"><img src="https://img.shields.io/badge/下载-macOS-000000?style=for-the-badge&logo=apple&logoColor=white" alt="下载 macOS 版"></a>&nbsp;
  <a href="https://github.com/xfree2026/worldmonitor/releases/latest"><img src="https://img.shields.io/badge/下载-Linux_(.AppImage)-FCC624?style=for-the-badge&logo=linux&logoColor=black" alt="下载 Linux 版"></a>
</p>

<p align="center">
  <a href="https://github.com/xfree2026/worldmonitor/releases"><strong>版本发布</strong></a> &nbsp;·&nbsp;
  <a href="https://github.com/xfree2026/worldmonitor/issues"><strong>问题反馈</strong></a> &nbsp;·&nbsp;
  <a href="./CONTRIBUTING.md"><strong>参与贡献</strong></a>
</p>

---

## 🇨🇳 中国视角核心特性

- **🤖 中国主流 AI 大模型优先**：支持 DeepSeek、通义千问（Qwen）、智谱 GLM、Kimi（月之暗面）、百川（Baichuan），均为 OpenAI 兼容接口，无需额外适配
- **📈 中国 A 股市场实时行情**：上证指数、深证成指、创业板指、科创 50，以及贵州茅台、工商银行、宁德时代、比亚迪等 27 只核心蓝筹股
- **💰 贵金属人民币计价**：黄金、白银、铂金以 ¥ 人民币（CNY）计价展示，独立「贵金属/人民币」面板
- **🌐 外文新闻自动翻译为中文**：所有外文新闻通过 AI 大模型自动翻译为中文显示
- **🇨🇳 全中文界面**：默认语言为中文（zh），涵盖所有面板、设置、提示与错误信息
- **🖥️ 桌面端原生应用**（Tauri 2）：Windows、macOS、Linux 全平台支持
- **📱 Android 原生应用**：APK / AAB 双格式打包
- **🚀 GitHub Actions 自动打包发布**：推送 `v*` 标签自动构建并发布 Release，自动生成中文更新日志

---

## 📥 下载安装

### Windows

1. 前往 [Releases 页面](https://github.com/xfree2026/worldmonitor/releases/latest)
2. 下载 `.exe`（NSIS 安装包）或 `.msi` 安装包
3. 双击运行安装程序，按提示完成安装
4. 首次启动后，在「设置 → AI 与摘要」中填入中国大模型 API Key

### Android

1. 前往 [Releases 页面](https://github.com/xfree2026/worldmonitor/releases/latest)
2. 下载 `world-monitor-v*-android.apk` 文件
3. 在 Android 设备上开启「允许安装未知来源应用」
4. 点击 APK 文件进行安装
5. 首次启动后，在「设置 → AI 与摘要」中填入中国大模型 API Key

### macOS / Linux

同样从 [Releases 页面](https://github.com/xfree2026/worldmonitor/releases/latest) 下载对应平台安装包。

---

## 🔑 中国 AI 大模型 API Key 获取

应用支持以下中国主流 AI 大模型，请按需注册并获取 API Key：

| 大模型 | 注册地址 | 默认模型 | 推荐场景 |
|--------|---------|---------|---------|
| **DeepSeek**（深度求索） | https://platform.deepseek.com/ | `deepseek-chat` | 通用摘要、性价比高 |
| **通义千问**（Qwen） | https://dashscope.console.aliyun.com/ | `qwen-plus` | 阿里云生态、多模态 |
| **智谱 GLM** | https://open.bigmodel.cn/ | `glm-4-flash` | 免费额度、响应快 |
| **Kimi**（月之暗面） | https://platform.moonshot.cn/ | `moonshot-v1-8k` | 长文本理解 |
| **百川**（Baichuan） | https://platform.baichuan-ai.com/ | `Baichuan4` | 中文创作 |

填入任一 API Key 即可启用 AI 摘要功能。多个 Key 同时配置时，按以下优先级顺序调用：DeepSeek → Qwen → GLM → Kimi → 百川 → Ollama → Groq → OpenRouter。

---

## 📈 中国股市覆盖

应用内置 27 只 A 股核心标的，通过 Yahoo Finance 接口实时获取行情：

**指数**：上证指数（000001.SS）、深证成指（399001.SZ）、创业板指（399006.SZ）、科创 50（000688.SS）

**蓝筹股**：贵州茅台、工商银行、中国石油、农业银行、招商银行、中国平安、中国石化、隆基绿能、恒瑞医药、宁德时代、五粮液、比亚迪、美的集团、格力电器、海康威视、东方财富、长江电力、紫金矿业、中国人寿、伊利股份、中国中免、中国核电、山西汾酒等

---

## 💰 贵金属人民币计价

「市场」面板下的「贵金属/人民币」标签页提供以下实时报价（基于 USD/CNY 汇率换算）：

- 🥇 **黄金**（XAU/CNY）
- 🥈 **白银**（XAG/CNY）
- 🥉 **铂金**（XPT/CNY）

---

## 🚀 自动打包发布

### 触发方式

推送以 `v` 开头的 Git 标签即可触发自动构建与发布：

```bash
git tag v2.8.0
git push origin v2.8.0
```

### 构建矩阵

| 工作流 | 平台 | 产物 | Release Tag |
|--------|------|------|-------------|
| `build-desktop.yml` | Windows / macOS (ARM+Intel) / Linux (x64+ARM64) | `.exe` `.msi` `.dmg` `.AppImage` | `v{版本号}` |
| `build-android.yml` | Android | `.apk` `.aab` | `v{版本号}-android` |

### 自动生成 Release Notes

构建完成后，`update-release-notes` job 会自动生成中文更新日志，包含：

- 📝 本次版本提交内容（从 git log 提取）
- 📥 平台安装说明
- ✨ 主要特性清单（中国视角）
- 🔗 完整版本对比链接

也可通过 GitHub Actions 界面手动触发（`workflow_dispatch`），支持选择是否创建为草稿 Release。

---

## 🛠️ 本地开发

### 环境要求

- Node.js 22+
- Rust stable
- （桌面端开发）系统依赖：见 [Tauri 2 前置要求](https://tauri.app/start/prerequisites/)
- （Android 开发）JDK 17、Android SDK、Android NDK

### 启动开发服务器

```bash
git clone https://github.com/xfree2026/worldmonitor.git
cd worldmonitor
npm install
npm run dev
```

打开 [localhost:3000](http://localhost:3000)（端口可通过 `.env.local` 中的 `DEV_PORT` 覆盖）。应用无需任何环境变量即可运行。

### 桌面端开发

```bash
npm run desktop:dev                # 启动桌面应用开发模式
npm run desktop:build:full         # 构建全功能桌面版
npm run desktop:build:tech         # 构建 Tech 变体
```

### Android 开发

```bash
# 首次需初始化 Android 项目
npx tauri android init --config src-tauri/tauri.android.conf.json

# 开发模式（需连接 Android 设备或模拟器）
npm run desktop:android:dev

# 构建 APK
npm run desktop:build:android:apk

# 构建 AAB（用于上架 Google Play）
npm run desktop:build:android:aab

# 同时构建 APK + AAB
npm run desktop:build:android
```

---

## 🏗️ 技术栈

| 类别 | 技术 |
|------|------|
| **前端** | Vanilla TypeScript、Vite、globe.gl + Three.js、deck.gl + MapLibre GL |
| **桌面端** | Tauri 2（Rust）+ Node.js sidecar |
| **移动端** | Tauri 2 Android（Rust + Kotlin） |
| **AI/ML** | DeepSeek / 通义千问 / 智谱 GLM / Kimi / 百川 / Ollama / Groq / OpenRouter |
| **国际化** | i18next（默认中文，支持 25 种语言） |
| **API 契约** | Protocol Buffers（276 个 proto、34 个服务）、sebuf HTTP 注解 |
| **部署** | Vercel Edge Functions（60+）、Railway relay、Tauri、PWA |
| **缓存** | Redis（Upstash）、三级缓存、CDN、Service Worker |
| **CI/CD** | GitHub Actions（Windows + macOS + Linux + Android 自动打包发布） |

---

## 📊 数据源

WorldMonitor 聚合 65+ 外部数据源与 API，覆盖地缘政治、金融、能源、气候、航空、网络安全、军事、基础设施与新闻情报，通过 500+ 精选订阅源呈现，并由覆盖 35 个源组的新鲜度监控器追踪。

中国相关数据源：
- **股市行情**：Yahoo Finance（`.SS` / `.SZ` 后缀）
- **汇率**：USDCNY=X 实时汇率
- **贵金属**：COMEX 期货价格 × USD/CNY 汇率换算

---

## 🤝 参与贡献

欢迎贡献！请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解指南。

```bash
npm run typecheck        # 类型检查
npm run build:full       # 生产构建
```

---

## 📄 许可证

**AGPL-3.0-only** 开源协议。商业使用在遵守 AGPL copyleft 与源代码公开条款的前提下允许。

| 使用场景 | 是否允许 |
|---------|---------|
| 个人 / 研究 / 教育 | 是，遵循 AGPL-3.0-only |
| 自托管部署 | 是，遵循 AGPL-3.0-only |
| Fork 并修改 | 是，按要求以 AGPL-3.0-only 公开源代码 |
| 商业使用 / SaaS | 是，在遵守 AGPL 义务的前提下 |
| 私有专有使用或官方品牌授权 | 需另行申请商业或商标许可 |

详见 [LICENSE](LICENSE) 完整许可证与 [docs/license.mdx](docs/license.mdx) 通俗说明。

---

## 🔒 安全

如发现安全问题，请按 [SECURITY.md](./SECURITY.md) 中的指引负责任披露。

---

<p align="center">
  <a href="https://github.com/xfree2026/worldmonitor">GitHub 仓库</a> &nbsp;·&nbsp;
  <a href="https://github.com/xfree2026/worldmonitor/releases">版本发布</a> &nbsp;·&nbsp;
  <a href="https://github.com/xfree2026/worldmonitor/issues">问题反馈</a>
</p>
