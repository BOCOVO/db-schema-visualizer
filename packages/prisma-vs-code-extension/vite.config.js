import vscode from "@tomjs/vite-plugin-vscode";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsMonoAlias from "vite-plugin-ts-mono-alias";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsMonoAlias({ ignorePackages: ["react"] }),
    react(),
    tsconfigPaths(),
    vscode({}),
  ],
});
