import type {
  AstroIntegration,
  AstroRenderer,
  ContentEntryType,
  HookParameters,
} from "astro";
import vitePluginTypst from "./vite.ts";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import matter from 'gray-matter';

const PACKAGE_NAME = "@zrr-blog/astro-typst";

function getRenderer(): AstroRenderer {
  return {
    name: PACKAGE_NAME,
    clientEntrypoint: `${PACKAGE_NAME}/src/renderer/index.ts`,
    serverEntrypoint: `${PACKAGE_NAME}/src/renderer/index.ts`,
  };
}

export function parseFrontmatter(code: string, id: string) {
  try {
    return matter(code);
  } catch (e: any) {
    if (e.name === 'YAMLException') {
      const err = e;
      err.id = id;
      err.loc = { file: e.id, line: e.mark.line + 1, column: e.mark.column };
      err.message = e.reason;
      throw err;
    } else {
      throw e;
    }
  }
}

export const getContainerRenderer = getRenderer;

type SetupHookParams = HookParameters<"astro:config:setup"> & {
  // `addPageExtension` and `contentEntryType` are not a public APIs
  // Add type defs here
  addPageExtension: (extension: string) => void;
  addContentEntryType: (contentEntryType: ContentEntryType) => void;
};

const typstIntegration: AstroIntegration = {
  name: "typst",
  hooks: {
    "astro:config:setup": async options => {
      const { addRenderer, addPageExtension, addContentEntryType, updateConfig } =
        options as SetupHookParams;
      addRenderer(getRenderer());
      addPageExtension(".typ");
      // addContentEntryType({
      //   extensions: ['.typ'],
      //   async getEntryInfo({ fileUrl, contents }: { fileUrl: URL; contents: string }) {
      //     const parsed = parseFrontmatter(contents, Bun.fileURLToPath(fileUrl));
      //     return {
      //       data: parsed.data,
      //       body: parsed.content,
      //       slug: parsed.data.slug,
      //       rawData: parsed.matter,
      //     };
      //   },
      //   contentModuleTypes: await Bun.file(
      //     new URL('../template/content-module-types.d.ts', import.meta.url),
      //   ).text(),
      //   // MDX can import scripts and styles,
      //   // so wrap all MDX files with script / style propagation checks
      //   handlePropagation: true,
      // });
      updateConfig({
        vite: {
          build: {
            rollupOptions: {
              external: ["@myriaddreamin/typst-ts-node-compiler"],
            },
          },
          plugins: [nodeResolve(), vitePluginTypst()],
        },
      });
    },
    // "astro:config:done": (options) => {
    //     console.log(options.config.vite)
    // }
  },
};

export default () => typstIntegration;
