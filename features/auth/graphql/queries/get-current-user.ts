import { gql } from "@/graphql/generated"

export const GET_CURRENT_USER = gql(
    `
    query GetCurrentUser {
        user: getCurrentUser {
            id
            email
            role
            isVerified
            createdAt
            updatedAt
        }
    }
    `,
)
