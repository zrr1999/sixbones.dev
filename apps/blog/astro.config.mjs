import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import AstroPWA from "@vite-pwa/astro";
import pagefind from "astro-pagefind";
import mdx from "@astrojs/mdx";
import typst from "@zrr-blog/astro-typst";
import remarkMath from "remark-math";
import remarkCodeTitles from "remark-code-titles";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";

import { SITE } from "./src/config";

export default defineConfig({
  prefetch: true,
  site: SITE.website,
  integrations: [
    mdx(),
    typst(),
    sitemap(),
    vue(),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    pagefind(),
    AstroPWA(),
  ],
  markdown: {
    syntaxHighlight: "shiki",
    remarkPlugins: [
      [remarkToc, { heading: "目录" }],
      [
        remarkCollapse,
        {
          test: "目录",
          summary: "查看目录",
        },
      ],
      remarkCodeTitles,
      remarkMath,
    ],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeKatex],
    shikiConfig: {
      themes: { light: "min-light", dark: "night-owl" },
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  // scopedStyleStrategy: "where",
  // experimental: {
  //   contentLayer: true,
  // },
});
