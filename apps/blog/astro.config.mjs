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
// import remarkToc from "remark-toc";
// import remarkCollapse from "remark-collapse";

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeToc from "rehype-toc";
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
    remarkPlugins: [remarkCodeTitles, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      [rehypeToc, { headings: ["h2", "h"], position: "beforeend" }],
      rehypeKatex,
    ],
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
