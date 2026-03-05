import { gql } from "@/graphql/generated"

export const IS_TUTOR_VERIFIED = gql(`
    query IsTutorVerified {
        tutorVerified
    }
`)
