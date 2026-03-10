import { gql } from "@/graphql/generated"

export const REQUEST_PASSWORD_RESET_MUTATION = gql(`
    mutation RequestResetPassword ($requestResetPasswordPayload: RequestResetPasswordDto!){
        requestResetPassword (requestResetPasswordPayload: $requestResetPasswordPayload)
    }
`)
