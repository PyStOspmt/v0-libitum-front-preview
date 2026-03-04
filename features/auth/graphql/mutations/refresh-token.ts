import { gql } from "@/graphql/generated"

export const REFRESH_TOKEN = gql(`
    mutation RefreshToken {
        refreshToken
    }
`)
