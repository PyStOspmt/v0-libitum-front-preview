import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import nextPlugin from "eslint-config-next"
import prettierConfig from "eslint-config-prettier"
import importPlugin from "eslint-plugin-import"
import simpleImportSort from "eslint-plugin-simple-import-sort"

/** @type {import("eslint").Linter.Config[]} */
const config = [
    // Next.js recommended rules (already a flat config array)
    ...(Array.isArray(nextPlugin) ? nextPlugin : [nextPlugin]),

    // TypeScript files
    {
        files: ["**/*.ts", "**/*.tsx"],
        plugins: {
            "@typescript-eslint": tsPlugin,
            "simple-import-sort": simpleImportSort,
            import: importPlugin,
        },
        languageOptions: {
            parser: tsParser,
        },
        rules: {
            "react/no-unescaped-entities": "off",
            // Auto-sort imports by group
            "simple-import-sort/imports": [
                "warn",
                {
                    groups: [
                        ["^node:"],
                        ["^react$", "^next", "^@(?!/)"],
                        ["^@/"],
                        ["^\\."],
                    ],
                },
            ],
            "simple-import-sort/exports": "warn",
            "import/no-duplicates": "error",
            "import/first": "error",

            // TypeScript
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "@typescript-eslint/no-explicit-any": "warn",
        },
    },

    // JS/MJS config files
    {
        files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
        plugins: {
            "simple-import-sort": simpleImportSort,
        },
        rules: {
            "simple-import-sort/imports": "warn",
            "simple-import-sort/exports": "warn",
        },
    },

    // Ignore build artifacts
    {
        ignores: [".next/**", "node_modules/**", "*.tsbuildinfo", "public/**"],
    },

    // Prettier last — disables formatting-related rules
    prettierConfig,
]

export default config
