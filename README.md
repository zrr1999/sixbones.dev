# sixbones.dev

个人网站项目，包含主页、博客和幻灯片展示功能。

## 📖 项目简介

这是一个基于 Astro 构建的个人网站项目，包含以下功能：

- **个人主页**：卡片式布局展示个人信息和各个网站入口
- **博客系统**：使用 Astro 内容集合管理，支持 Markdown 和 Typst 格式
- **幻灯片展示**：展示个人演示文稿和技术分享
- **响应式设计**：适配各种设备尺寸
- **SEO优化**：内置 Open Graph 和 Twitter Card 支持

## 🚀 技术栈

- **框架**: [Astro](https://astro.build)
- **样式**: [Tailwind CSS](https://tailwindcss.com)
- **内容**: Markdown, Typst
- **部署**: 支持各种静态网站托管平台

## 🧞 开发命令

所有命令都需要在项目根目录下执行：

| 命令                   | 说明                         |
| :--------------------- | :--------------------------- |
| `bun install`          | 安装依赖                     |
| `bun run dev`          | 启动本地开发服务器           |
| `bun run build`        | 构建生产环境代码到 `./dist/` |
| `bun run preview`      | 本地预览构建后的网站         |
| `bun run format`       | 格式化代码                   |
| `bun run format:check` | 检查代码格式                 |
| `bun run lint`         | 运行代码检查                 |
| `bun run lint:check`   | 静默模式运行代码检查         |

## 📁 项目结构

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

## 🏠 个人主页

个人主页采用卡片式布局，展示以下内容：

- 个人简介和教育背景
- 博客入口
- 幻灯片集合入口
- GitHub 主页链接
- 简历链接
- 关于页面

主页部署在根域名 `sixbones.dev`。

## 📝 博客

博客文章存放在 `apps/blog/data/blog/` 目录下，支持以下格式：

- **Markdown** (.md): 标准的 Markdown 格式
- **Typst** (.typ): Typst 格式，适合技术文档

每篇文章需要包含以下元数据：

```yaml
---
title: "文章标题"
author: "作者名称"
description: "文章简介"
pubDatetime: 2024-01-01
modDatetime: 2024-01-02 # 可选
tags: ["标签1", "标签2"]
---
```

### 配置文件

- `apps/blog/src/config.ts` - 博客站点配置
- `apps/blog/src/content.config.ts` - 内容集合配置

## 📊 幻灯片

幻灯片文件存放在 `apps/slides/public/slides/` 目录下，每个幻灯片为独立的目录。

## 🔧 配置

主要配置文件：

- `package.json` - 项目依赖和脚本配置
- `turbo.json` - Turborepo 构建配置

## 📄 许可证

本项目采用 MIT 许可证。详见 LICENSE 文件。
