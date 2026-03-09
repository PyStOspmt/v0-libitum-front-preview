import { gql } from "@/graphql/generated"

export const REQUEST_OAUTH_URL = gql(`
    mutation requestOAuthUrl($payload: RequestOAuthUrlDto!) {
        url: requestOAuthUrl(requestOAuthUrlDto: $payload)
    }
`)
