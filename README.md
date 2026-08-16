# MyWebsite

李盛园（Chauncey Lee）的 AI 产品作品集与个人网站。

- 在线访问：[chauncey.myoii.com](https://chauncey.myoii.com/)
- 定位：AI 产品负责人 / Applied AI Builder
- 方向：Voice AI、Agent 编排、模型评测与 AI 产品增长
- 代表产品：SaySo Voice AI、SaySo Team、模型评测与 Agent 工具

## 网站内容

- **主页**：个人定位、工作经历、代表项目、研究与教育背景
- **项目**：AI 产品、Agent 工具、开源项目与正在开展的方向
- **研究**：期刊论文、会议论文与科研项目
- **AI 资源库**：个人持续使用和维护的 AI 学习资源

网站支持中英文与明暗主题，并通过 GitHub Pages 自动部署到自定义域名。

## 技术栈

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Radix UI
- Vitest
- GitHub Pages / GitHub Actions

## 本地开发

```bash
npm ci
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)。

## 检查与构建

```bash
npm test
npm run lint
npm run build
```

项目使用静态导出，构建产物位于 `out/`。

## 内容维护

当前主要内容位于：

- `src/config.tsx`：个人信息、经历、项目、科研与双语内容
- `src/ai-config.tsx`：中文 AI 资源库
- `src/ai-config-en.tsx`：英文 AI 资源库

后续计划将项目案例迁移为独立的结构化内容文件，减少中英文重复维护。

## 部署

推送到 `main` 后，[GitHub Actions](./.github/workflows/deploy-pages.yml) 会执行静态构建并部署到 GitHub Pages。

## 隐私说明

公开网站仅保留求职与专业交流所需的联系方式。手机号、出生年月等个人信息不在公开页面展示。

## License

本项目代码遵循 [MIT License](./LICENSE)。个人履历、项目描述、研究成果与网站内容版权归作者所有。
