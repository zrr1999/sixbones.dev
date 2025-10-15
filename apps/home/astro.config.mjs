import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  prefetch: true,
  site: "https://sixbones.dev",
  i18n: {
    locales: ["en", "zh-cn"],
    defaultLocale: "zh-cn",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
