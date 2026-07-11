import js from "@eslint/js";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";

// Flat config. Two runtime contexts in this repo (see CLAUDE.md's
// Architecture section):
//   - build/**, content/** — Node ES modules (build/build.js imports them
//     directly), linted as modules with Node globals.
//   - src/js/**, src/data/* — plain browser <script> tags loaded in
//     sequence per page, not modules; they share globals across files by
//     design (e.g. `store` from ui.js, `t` from the generated strings.js,
//     `MANUAL`/`OFFSET` from src/data/manual-*.js, `searchAll` from
//     search.js). Both no-undef (can't resolve a cross-file global without
//     bundling) and top-level no-unused-vars (a file's whole purpose is
//     often to define globals for a *later* script tag to consume) are
//     unreliable there, so this repo relies on the browser's own script
//     execution order — verified by loading pages, not by lint — instead.
const sharedGlobalScript = {
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "script",
    globals: { ...globals.browser },
  },
  rules: {
    "no-var": "error",
    "prefer-const": "error",
    eqeqeq: ["error", "always"],
    "no-undef": "off",
    "no-unused-vars": [
      "warn",
      { vars: "local", args: "after-used", argsIgnorePattern: "^_", caughtErrors: "none" },
    ],
  },
};

export default [
  {
    ignores: ["docs/**", "src/js/vendor/**", "X-H2S Reisebegleiter.html", "node_modules/**"],
  },
  js.configs.recommended,
  {
    files: ["build/**/*.js", "content/**/*.js", "*.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node },
    },
    rules: {
      "no-var": "error",
      "prefer-const": "error",
      eqeqeq: ["error", "always"],
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", caughtErrors: "none" }],
    },
  },
  { files: ["src/js/**/*.js", "src/data/*.js"], ...sharedGlobalScript },
  {
    // pdf-viewer.js is dynamically import()-ed, so unlike its src/js/**
    // siblings it's an actual ES module, not a shared-globals script.
    files: ["src/js/pdf-viewer.js"],
    languageOptions: { sourceType: "module" },
  },
  eslintConfigPrettier,
];
