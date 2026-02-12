import type { BuildEnvironmentOptions } from "vite";

import devServer, { defaultOptions } from "@hono/vite-dev-server";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import url from "node:url";
import { defineConfig, loadEnv } from "vite";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientBuildConfig: BuildEnvironmentOptions = {
  outDir: "dist/client",
  emitAssets: true,
  emptyOutDir: true,
  manifest: true,
  rollupOptions: {
    input: path.resolve(__dirname, "src/entry-client.tsx"),
    output: {
      entryFileNames: "[name].js",
      chunkFileNames: "assets/[name]-[hash].js",
      assetFileNames: "assets/[name]-[hash][extname]",
      manualChunks(id) {
        if (!id.includes("node_modules"))
          return;
        if (id.includes("@tanstack"))
          return "tanstack";

        return "vendor";
      },
    },
  },
};

const ssrBuildConfig: BuildEnvironmentOptions = {
  ssr: true,
  outDir: "dist/server",
  minify: true,
  copyPublicDir: false,
  emptyOutDir: true,
  rollupOptions: {
    input: path.resolve(__dirname, "src/entry-server.tsx"),
    output: {
      entryFileNames: "[name].js",
      chunkFileNames: "lib/[name]-[hash].js",
    },
    external: [/^node:.*/],
  },
};

// https://vite.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => {
  // eslint-disable-next-line node/prefer-global/process
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      port: Number(env.PORT) || 3000,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [
      tailwindcss(),
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
      }),
      devServer({
        env,
        entry: "./src/entry-server.tsx",
        injectClientScript: false,
        exclude: [
          /^\/src\/.+/,
          ...defaultOptions.exclude,
        ],
      }),
      react(),
    ],
    ssr: {
      target: "webworker",
    },
    build: isSsrBuild ? ssrBuildConfig : clientBuildConfig,
  };
});
