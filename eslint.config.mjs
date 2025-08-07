import withNuxt from "./.nuxt/eslint.config.mjs";
import stylistic from "@stylistic/eslint-plugin";
import jsonc from "eslint-plugin-jsonc";
import jsoncParser from "jsonc-eslint-parser";
import { globalIgnores } from "eslint/config";

export default withNuxt(globalIgnores([".config/*", "node_modules/*"]), {
    plugins: {
        "@stylistic": stylistic,
        jsonc: jsonc,
    },
    rules: {
        "@stylistic/semi": ["error", "always"],
        "@stylistic/comma-dangle": ["error", "always-multiline"],
        "@stylistic/max-len": ["error", {
            code: 150,
            ignoreUrls: true,
            ignoreRegExpLiterals: true,
            ignoreComments: false,
            ignoreTrailingComments: true,
        }],
        "@stylistic/arrow-parens": ["error", "always"],
        "@stylistic/indent": ["error", 4],
        "@stylistic/no-tabs": "error",
        "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: true }],
        "@stylistic/object-curly-newline": [
            "error",
            {
                multiline: true,
                consistent: true,
            },
        ],
        "@stylistic/quotes": ["error", "double"],
        "@stylistic/object-curly-spacing": ["error", "always"],
        "@stylistic/array-bracket-spacing": ["error", "never"],
        "@stylistic/space-before-function-paren": [
            "error",
            {
                anonymous: "always",
                named: "never",
                asyncArrow: "always",
            },
        ],
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
        "vue/html-indent": ["error", 4, {
            attribute: 1,
            baseIndent: 1,
            closeBracket: 0,
            alignAttributesVertically: true,
            ignores: [],
        }],
        "vue/script-indent": ["error", 4, {
            baseIndent: 0,
            switchCase: 1,
            ignores: [],
        }],
        "vue/html-self-closing": [
            "error",
            {
                html: {
                    void: "always",
                    normal: "never",
                    component: "always",
                },
                svg: "always",
                math: "always",
            },
        ],
        "vue/html-closing-bracket-newline": ["error", {
            singleline: "never",
            multiline: "always",
        }],
        "vue/html-closing-bracket-spacing": ["error", {
            startTag: "never",
            endTag: "never",
            selfClosingTag: "always",
        }],
        "vue/max-attributes-per-line": ["error", {
            singleline: { max: 3 },
            multiline: { max: 1 },
        }],
        "prefer-const": "error",
    },
}, {
    // JSON files configuration
    files: ["**/*.json", "**/*.jsonc"],
    languageOptions: {
        parser: jsoncParser,
    },
    plugins: {
        "@stylistic": stylistic,
        jsonc: jsonc,
    },
    rules: {
        "jsonc/indent": ["error", 4],
        "jsonc/comma-dangle": ["error", "never"],
        "@stylistic/indent": "off",
        "@stylistic/comma-dangle": "off",
    },
});
