import { buildCode } from "bob-ts";
import { execaCommand } from "execa";
import image from "@rollup/plugin-image";

await Promise.all([
  buildCode({
    clean: true,
    entryPoints: ["src"],
    format: "esm",
    outDir: "dist",
    target: "es2019",
    rollup: {
      generatedCode: {
        constBindings: true
      }
    },
    keepDynamicImport: true,
    sourcemap: false,
    plugins: [image()]
  }),
  execaCommand("tsc", {
    stdin: "inherit"
  })
]);
