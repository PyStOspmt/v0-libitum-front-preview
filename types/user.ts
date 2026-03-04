import { UserRoles } from "@/graphql/generated/graphql"

export type BaseAuthenticatedUser = {
    id: string
    email: string
    role: UserRoles
    isVerified: boolean
    createdAt: string
    updatedAt: string
}
