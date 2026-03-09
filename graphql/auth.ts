import { gql } from "@/graphql/generated"

export const VERIFY_USER = gql(`
    mutation VerifyUser($verifyUserPayload: VerifyUserDto!) {
        verifyUser(verifyUserPayload: $verifyUserPayload)
    }
`)

export const RESEND_VERIFICATION_EMAIL = gql(`
    mutation ResendVerificationEmail {
        resendVerificationEmail
    }
`)
