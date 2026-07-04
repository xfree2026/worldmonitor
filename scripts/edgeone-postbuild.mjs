/**
 * EdgeOne 部署构建后处理
 *
 * 项目原架构：index.html 被 vite 插件重命名为 dashboard.html，
 * 配合 Vercel rewrite 规则把 / 路由到 /dashboard.html 或 /pro/welcome.html。
 * EdgeOne 没有这些 rewrite，根路径访问会 545。
 *
 * 本脚本在 dist 生成后：
 * 1. 创建 index.html（重定向到 /dashboard.html），解决根路径 545
 * 2. 创建 404.html（复制 dashboard.html 内容），作为 SPA fallback
 * 3. 创建 _redirects 文件（EdgeOne 边缘托管兼容 Cloudflare Pages 格式）
 *
 * 用法：npm run build:edgeone
 */
import { writeFileSync, existsSync, copyFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');

// 1. 创建 index.html 重定向到 dashboard.html
const indexPath = resolve(distDir, 'index.html');
const redirectHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta http-equiv="refresh" content="0; url=/dashboard.html">
<meta name="robots" content="noindex">
<title>世界监控</title>
<script>window.location.replace('/dashboard.html');</script>
</head>
<body>
<a href="/dashboard.html">正在跳转…</a>
</body>
</html>
`;
writeFileSync(indexPath, redirectHtml, 'utf-8');
console.log('[edgeone] 已生成 dist/index.html（重定向到 /dashboard.html）');

// 2. 创建 404.html（SPA fallback），复制 dashboard.html
const dashboardPath = resolve(distDir, 'dashboard.html');
const notFoundPath = resolve(distDir, '404.html');
if (existsSync(dashboardPath)) {
  copyFileSync(dashboardPath, notFoundPath);
  console.log('[edgeone] 已生成 dist/404.html（SPA fallback）');
} else {
  console.warn('[edgeone] 警告：dist/dashboard.html 不存在，跳过 404.html 生成');
}

// 3. 创建 _redirects 文件（EdgeOne 边缘托管兼容格式）
// 参考 Cloudflare Pages / Netlify 的 _redirects 规范
const redirectsPath = resolve(distDir, '_redirects');
const redirectsContent = `# EdgeOne 边缘托管 SPA 路由规则
# 所有未匹配静态文件的路径都返回 dashboard.html（200，非 301）
# 这样深链接刷新不会 404
/api/*  /api/:splat  200
/dashboard  /dashboard.html  200
/embed  /embed.html  200
/settings  /settings.html  200
/mcp-grant  /mcp-grant.html  200
/live-channels  /live-channels.html  200
/*  /dashboard.html  200
`;
writeFileSync(redirectsPath, redirectsContent, 'utf-8');
console.log('[edgeone] 已生成 dist/_redirects（SPA 路由规则）');

// 4. 输出部署提示
console.log('');
console.log('=== EdgeOne 部署完成 ===');
console.log('构建产物在 dist/ 目录，包含：');
console.log('  - index.html（根路径重定向到 dashboard）');
console.log('  - dashboard.html（主仪表盘）');
console.log('  - 404.html（SPA fallback）');
console.log('  - _redirects（路由规则，如 EdgeOne 不识别请忽略）');
console.log('');
console.log('EdgeOne 控制台配置建议：');
console.log('  1. 接入方式：边缘托管（静态站点），非 CDN 加速');
console.log('  2. 构建命令：npm run build:edgeone');
console.log('  3. 输出目录：dist');
console.log('  4. 环境变量：VITE_VARIANT=full, VITE_WS_API_URL=https://api.worldmonitor.app');
console.log('  5. SPA fallback：404 时返回 /dashboard.html（如控制台支持）');
