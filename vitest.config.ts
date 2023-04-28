import { join } from "path";
import { configDefaults, defineConfig } from "vitest/config";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude],
  },
  resolve: {
    alias: {
      "~/": join(__dirname, "./src/"),
    },
  },
});
