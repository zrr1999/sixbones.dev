# sixbones.dev

个人网站项目，包含主页、博客和幻灯片展示功能。

## 项目简介

基于 Astro 的个人网站，包含：

- **个人主页**：卡片式布局展示个人信息和各个网站入口
- **博客系统**：使用 Astro 内容集合管理，支持 Markdown 和 Typst 格式
- **幻灯片展示**：展示个人演示文稿和技术分享
- **响应式设计**：适配各种设备尺寸
- **SEO优化**：内置 Open Graph 和 Twitter Card 支持

## 技术栈

- **框架**：[Astro](https://astro.build)
- **样式**：[Tailwind CSS](https://tailwindcss.com)
- **内容**：Markdown、Typst
- **部署**：支持各类静态托管

## 开发命令

项目使用 [Vite+](https://vite-plus.dev)（`vp`），在根目录执行：

| 命令             | 说明                   |
| :--------------- | :--------------------- |
| `vp install`     | 安装依赖               |
| `vp run dev`     | 启动开发服务器         |
| `vp run build`   | 构建到 `./dist/`       |
| `vp run preview` | 预览构建结果           |
| `vp fmt`         | 格式化代码             |
| `vp lint`        | 代码检查               |
| `vp check`       | 格式 + lint + 类型检查 |

## 项目结构

```
sixbones.dev/
├── apps/
│   ├── root/            # 个人主页应用（根域名）
│   ├── blog/            # 博客应用
│   │   ├── src/         # 源代码
│   │   └── data/blog/   # 博客文章
│   └── slides/          # 幻灯片应用
├── hosting/             # 托管相关配置
└── package.json         # 项目配置
```

## 个人主页

卡片式布局，展示：

- 个人简介和教育背景
- 博客入口
- 幻灯片集合入口
- GitHub 主页链接
- 简历链接
- 关于页面

主页部署在根域名 `sixbones.dev`。

## 博客

文章位于 `apps/blog/data/blog/`，支持 Markdown (.md) 和 Typst (.typ)。Frontmatter 与正文规范见 [AGENTS.md](./AGENTS.md#博客编写规范)。

- `apps/blog/src/config.ts` - 站点配置
- `apps/blog/src/content.config.ts` - 内容集合配置

## 幻灯片

文件位于 `apps/slides/public/slides/`，每个幻灯片为独立目录。

## 配置

- `package.json` / `turbo.json` - 依赖与 Turborepo 构建
- [AGENTS.md](./AGENTS.md) - AI 代理工作流与规范

## 许可证

MIT，详见 [LICENSE](./LICENSE)。
