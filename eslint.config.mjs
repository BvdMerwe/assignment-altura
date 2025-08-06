import withNuxt from "./.nuxt/eslint.config.mjs";
import prettierPlugin from "eslint-plugin-prettier";
import stylistic from "@stylistic/eslint-plugin";
import jsonc from "eslint-plugin-jsonc";
import jsoncParser from "jsonc-eslint-parser";
import { globalIgnores } from "eslint/config";

export default withNuxt(globalIgnores([".config/*", "node_modules/*"]), {
    plugins: {
        prettier: prettierPlugin,
        "@stylistic": stylistic,
        jsonc: jsonc,
    },
    rules: {
        "prettier/prettier": "error",
        "@stylistic/no-trailing-spaces": "error",
        "@stylistic/no-multiple-empty-lines": [
            "error",
            {
                max: 1,
                maxEOF: 0,
                maxBOF: 0,
            },
        ],
        "@stylistic/padding-line-between-statements": [
            "error",
            {
                blankLine: "always",
                prev: "*",
                next: "return",
            },
            {
                blankLine: "always",
                prev: ["const", "let", "var"],
                next: "*",
            },
            {
                blankLine: "any",
                prev: ["const", "let", "var"],
                next: ["const", "let", "var"],
            },
            {
                blankLine: "always",
                prev: "block-like",
                next: "*",
            },
            {
                blankLine: "always",
                prev: "*",
                next: "block-like",
            },
        ],
        "vue/html-self-closing": [
            "error",
            {
                html: {
                    void: "always",
                    normal: "always",
                    component: "always",
                },
                svg: "always",
                math: "always",
            },
        ],
        "prefer-const": "error",
    },
}).append({
    ignores: ["package-lock."],
    files: ["**/*.json", "**/*.jsonc"],
    languageOptions: {
        parser: jsoncParser,
    },
    plugins: {
        jsonc: jsonc,
        prettier: prettierPlugin,
    },
    rules: {
        "prettier/prettier": "error",
        "jsonc/comma-dangle": ["error", "never"],
    },
});
