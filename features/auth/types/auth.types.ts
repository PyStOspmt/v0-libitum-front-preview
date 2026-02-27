export enum UserRoles {
    GUEST = "GUEST",
    PARENT = "PARENT",
    STUDENT = "STUDENT",
    SPECIALIST = "SPECIALIST",
    SUPER_ADMIN = "SUPER_ADMIN",
}

export enum AuthProviderTypes {
    GOOGLE = "google",
    EMAIL_PASSWORD = "email_password",
    TELEGRAM = "telegram",
}

export interface RegisterWithEmailAndPasswordInput {
    email: string
    password: string
    role: UserRoles
}

export interface LoginWithEmailAndPasswordInput {
    email: string
    password: string
}

export interface OAuthInput {
    idToken: string
    role: UserRoles
}

export interface VerifyUserInput {
    token: string
}

export interface ConfirmPasswordResetInput {
    token: string
    password: string
}

export interface User {
    id: string
    email: string
    isVerified: boolean
    role: UserRoles
    createdAt: string
    updatedAt: string
}

export interface ResetPasswordData {
    resetPassword: boolean
}

export interface ForceLogoutEvent {
    message: string
    timestamp: string
}

export interface RegisterVariables {
    userPayload: RegisterWithEmailAndPasswordInput
}

export interface LoginVariables {
    userPayload: LoginWithEmailAndPasswordInput
}

export interface OAuthVariables {
    oauthPayload: OAuthInput
}

export interface VerifyUserVariables {
    verifyUserPayload: VerifyUserInput
}

export interface ResetPasswordVariables {
    resetPasswordPayload: ConfirmPasswordResetInput
}

export const PASSWORD_RULES = {
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
} as const

export const ROLE_MAP = {
    client: UserRoles.STUDENT,
    specialist: UserRoles.SPECIALIST,
} as const

export type FrontendRole = keyof typeof ROLE_MAP
