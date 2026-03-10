import { gql } from "@/graphql/generated"

import { UserRoles } from "./generated/graphql"

export const VERIFY_USER = gql(`
    mutation VerifyUser($verifyUserPayload: VerifyUserDto!) {
        user: verifyUser(verifyUserPayload: $verifyUserPayload) {
            id
            isVerified
        }
    }
`)

export const RESEND_VERIFICATION_EMAIL = gql(`
    mutation ResendVerificationEmail {
        resendVerificationEmail
    }
`)
