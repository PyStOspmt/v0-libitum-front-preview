import type { CodegenConfig } from "@graphql-codegen/cli"

const codegenConfig: CodegenConfig = {
    schema: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:3001/graphql",
    documents: [
        "./features/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./lib/**/*.{ts,tsx}",
        "!./graphql/generated/**/*",
        "./graphql/**/*.ts",
    ],
    generates: {
        "./graphql/generated/": {
            preset: "client",
            presetConfig: {
                gqlTagName: "gql",
            },
        },
    },
    ignoreNoDocuments: true,
}

export default codegenConfig
