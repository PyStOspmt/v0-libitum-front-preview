import { gql } from "@/graphql/generated"

import type {
    LoginVariables,
    OAuthVariables,
    RegisterVariables,
    ResetPasswordVariables,
    VerifyUserVariables,
} from "@/features/auth/types/auth.types"

export type { RegisterVariables, LoginVariables, OAuthVariables, VerifyUserVariables, ResetPasswordVariables }

export const GET_OAUTH_URL = gql(`
    query GetOAuthURL {
        getOAuthURL
    }
`)

export const REGISTER = gql(`
    mutation RegisterWithEmailAndPassword($userPayload: RegisterWithEmailAndPasswordDto!) {
        registerUserWithEmailAndPassword(userPayload: $userPayload)
    }
`)

export const LOGIN = gql(`
    mutation LoginWithEmailAndPassword($userPayload: LoginWithEmailAndPasswordDto!) {
        loginWithEmailAndPassword(userPayload: $userPayload)
    }
`)

export const OAUTH = gql(`
    mutation OAuth($oauthPayload: OAuthDto!) {
        oauth(oauthPayload: $oauthPayload)
    }
`)

export const REFRESH_TOKEN = gql(`
    mutation RefreshToken {
        refreshToken
    }
`)

export const VERIFY_USER = gql(`
    mutation VerifyUser($verifyUserPayload: VerifyUserDto!) {
        verifyUser(verifyUserPayload: $verifyUserPayload)
    }
`)

export const REQUEST_RESET_PASSWORD = gql(`
    mutation RequestResetPassword {
        requestResetPassword
    }
`)

export const RESET_PASSWORD = gql(`
    mutation ResetPassword($resetPasswordPayload: ConfirmPasswordResetDto!) {
        resetPassword(resetPasswordPayload: $resetPasswordPayload)
    }
`)
