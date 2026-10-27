import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  // GitHub project Pages serves assets below the repository name.
  // Keep ordinary local development and builds at the domain root.
  base: mode === "github-pages" ? "/ROBOTiX_landing_page/" : "/",
  // Compile JSX with React's automatic runtime in development and production.
  esbuild: { jsx: "automatic" },
}));
