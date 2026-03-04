import { gql } from "@/graphql/generated"

export const LOGIN_WITH_EMAIL_PASSWORD = gql(`
    mutation LoginWithEmailAndPassword($userPayload: LoginWithEmailAndPasswordDto!) {
        user: loginWithEmailAndPassword(userPayload: $userPayload) {
            id
            email
            role
            isVerified
            createdAt
            updatedAt
        }
    }
`)
