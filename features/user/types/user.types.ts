// ===================== Enums =====================
import { UserRoles } from "@/graphql/generated/graphql"

export enum UserRelationTypes {
    PARENT_CHILD = "PARENT_CHILD",
    TEACHER_STUDENT = "TEACHER_STUDENT",
}

// ============== Response types (GraphQL) ==============

/** Тип користувача, який повертає сервер */
export interface User {
    id: string
    email: string
    isVerified: boolean
    role: UserRoles
    createdAt: string
    updatedAt: string
}

/** Тип зв'язку між користувачами */
export interface UserRelation {
    id: string
    relation: UserRelationTypes
    superior: User
    subordinate: User
    createdAt: string
    updatedAt: string
}

// ============== Input types (для mutations) ==============

export interface FindUserInput {
    email: string
}

export interface UpdateUserInput {
    id: string
    email?: string
    password?: string
    role?: UserRoles
}

export interface UpdatePasswordInput {
    email: string
    password: string
}

export interface DeleteUserInput {
    id: string
}

export interface CreateUserRelationsInput {
    superiorId: string
    subordinateId: string
    relation: UserRelationTypes
}

export interface FindUserRelationInput {
    id: string
}

export interface UpdateUserRelationsInput {
    id: string
    relation?: UserRelationTypes
}

export interface DeleteUserRelationsInput {
    id: string
}

// ============== GraphQL Variables ==============

export interface FindUserVariables {
    findUserDto: FindUserInput
}

export interface UpdateUserVariables {
    updateUserDto: UpdateUserInput
}

export interface UpdatePasswordVariables {
    updatePasswordDto: UpdatePasswordInput
}

export interface DeleteUserVariables {
    deleteUserDto: DeleteUserInput
}

export interface CreateUserRelationsVariables {
    createUserRelationsDto: CreateUserRelationsInput
}

export interface FindUserRelationsVariables {
    findUserRelationsDto: FindUserRelationInput
}

export interface UpdateUserRelationsVariables {
    updateUserRelationsDto: UpdateUserRelationsInput
}

export interface DeleteUserRelationsVariables {
    deleteUserRelationsDto: DeleteUserRelationsInput
}

// ============== GraphQL Response wrappers ==============

export interface FindUserResponse {
    findUser: User
}

export interface UpdateUserResponse {
    updateUser: User
}

export interface UpdatePasswordResponse {
    updatePassword: boolean
}

export interface DeleteUserResponse {
    deleteUser: boolean
}

export interface CreateUserRelationsResponse {
    createUserRelations: UserRelation
}

export interface FindUserRelationsResponse {
    findUserRelations: UserRelation
}

export interface UpdateUserRelationsResponse {
    updateUserRelations: UserRelation
}

export interface DeleteUserRelationsResponse {
    deleteUserRelations: boolean
}
