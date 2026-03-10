import { gql } from "@/graphql/generated"

export const RESET_PASSWORD_MUTATION = gql(`
    mutation ConfirmResetPassword($resetPasswordPayload: ConfirmPasswordResetDto!) {
        user: resetPassword(resetPasswordPayload: $resetPasswordPayload) {
            id
        } 
    }
`)
