import { gql } from "@/graphql/generated"

export const REGISTER_WITH_EMAIL_PASSWORD = gql(`
    mutation RegisterWithEmailAndPassword($userPayload: RegisterWithEmailAndPasswordDto!) {
        user: registerUserWithEmailAndPassword(userPayload: $userPayload) {
            id
            email
            role
            isVerified
            createdAt
            updatedAt
        }
    }
`)
