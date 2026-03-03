import { gql } from "@/graphql/generated"

export const REQUEST_TELEGRAM_VERIFICATION = gql(`
    mutation RequestTelegramVerification {
        requestTelegramVerification {
            token
        }
    }
`)
