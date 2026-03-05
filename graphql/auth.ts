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

export const REQUEST_RESET_PASSWORD = gql(`
    mutation RequestResetPassword {
        requestResetPassword
    }
`)

export const RESET_PASSWORD = gql(`
    mutation ResetPassword($resetPasswordPayload: ConfirmPasswordResetDto!) {
        resetPassword(resetPasswordPayload: $resetPasswordPayload)
    }
`)
