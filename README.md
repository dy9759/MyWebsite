# MyWebsite

李盛园（Chauncey Lee）的 AI 产品作品集与个人网站。

- 在线访问：[chauncey.myoii.com](https://chauncey.myoii.com/)
- 定位：AI 产品负责人 / Applied AI Builder
- 方向：Voice AI、Agent 编排、模型评测与 AI 产品增长
- 代表产品：SaySo Voice AI、SaySo Team、模型评测与 Agent 工具

## 网站内容

- **主页**：产品定位、核心能力、三项代表案例、经历与行动入口
- **代表案例**：问题、约束、决策、交付、证据与复盘
- **Builder Lab**：Agent、Skill、评测与开源实验
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

- `src/content/portfolio.ts`：主页、案例与 Builder Lab 的结构化双语内容
- `src/config.tsx`：个人信息、经历、项目档案与科研内容
- `src/ai-config.tsx`：中文 AI 资源库
- `src/ai-config-en.tsx`：英文 AI 资源库

每个项目、实验和未来方向均使用稳定 `id`，避免双语切换或排序变化导致状态错位。证据不足的案例字段会显式显示“待补充”，不使用推测数据。

## 页面架构

- `/`：主页
- `/projects/`：代表案例与项目档案
- `/projects/[slug]/`：独立案例页
- `/lab/`：Builder Lab
- `/research/`：研究与算法
- `/ai/`：AI Learning Library

Pull Request 会由 `quality.yml` 执行测试、Lint 与静态构建；推送到 `main` 后再由部署工作流发布 GitHub Pages。

## 部署

推送到 `main` 后，[GitHub Actions](./.github/workflows/deploy-pages.yml) 会执行静态构建并部署到 GitHub Pages。

## 隐私说明

公开网站仅保留求职与专业交流所需的联系方式。手机号、出生年月等个人信息不在公开页面展示。

## License

本项目代码遵循 [MIT License](./LICENSE)。个人履历、项目描述、研究成果与网站内容版权归作者所有。
