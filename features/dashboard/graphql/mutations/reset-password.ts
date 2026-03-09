import { gql } from "@/graphql/generated"

export const RESET_PASSWORD_MUTATION = gql(`
    mutation ConfirmResetPassword($resetPasswordPayload: ConfirmPasswordResetDto!) {
        resetPassword(resetPasswordPayload: $resetPasswordPayload) 
    }
`)
