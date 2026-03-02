import { FlatCompat } from "@eslint/eslintrc"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import prettierConfig from "eslint-config-prettier"
import importPlugin from "eslint-plugin-import"
import simpleImportSort from "eslint-plugin-simple-import-sort"

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
})

export default [
    ...compat.extends("next/core-web-vitals"),

    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
            import: importPlugin,
            "simple-import-sort": simpleImportSort,
        },
        rules: {
            "react/no-unescaped-entities": "off",

            "simple-import-sort/imports": "warn",
            "simple-import-sort/exports": "warn",
            "import/no-duplicates": "error",
            "import/first": "error",

            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "@typescript-eslint/no-explicit-any": "warn",
        },
    },

    prettierConfig,
]
