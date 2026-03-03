/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    mutation RequestTelegramVerification {\n        requestTelegramVerification {\n            token\n        }\n    }\n": typeof types.RequestTelegramVerificationDocument,
    "\n    query GetOAuthURL {\n        getOAuthURL\n    }\n": typeof types.GetOAuthUrlDocument,
    "\n    mutation RegisterWithEmailAndPassword($userPayload: RegisterWithEmailAndPasswordDto!) {\n        registerUserWithEmailAndPassword(userPayload: $userPayload)\n    }\n": typeof types.RegisterWithEmailAndPasswordDocument,
    "\n    mutation LoginWithEmailAndPassword($userPayload: LoginWithEmailAndPasswordDto!) {\n        loginWithEmailAndPassword(userPayload: $userPayload)\n    }\n": typeof types.LoginWithEmailAndPasswordDocument,
    "\n    mutation OAuth($oauthPayload: OAuthDto!) {\n        oauth(oauthPayload: $oauthPayload)\n    }\n": typeof types.OAuthDocument,
    "\n    mutation RefreshToken {\n        refreshToken\n    }\n": typeof types.RefreshTokenDocument,
    "\n    mutation VerifyUser($verifyUserPayload: VerifyUserDto!) {\n        verifyUser(verifyUserPayload: $verifyUserPayload)\n    }\n": typeof types.VerifyUserDocument,
    "\n    mutation RequestResetPassword {\n        requestResetPassword\n    }\n": typeof types.RequestResetPasswordDocument,
    "\n    mutation ResetPassword($resetPasswordPayload: ConfirmPasswordResetDto!) {\n        resetPassword(resetPasswordPayload: $resetPasswordPayload)\n    }\n": typeof types.ResetPasswordDocument,
    "\n  query GetQuizzes {\n    getQuizzes {\n      id\n      title\n      description\n      type\n      passingScore\n      questions {\n        explanation\n        id\n        mediaId\n        options {\n          id\n          isCorrect\n          text\n        }\n        order\n        text\n      }\n      createdAt\n    }\n  }\n": typeof types.GetQuizzesDocument,
};
const documents: Documents = {
    "\n    mutation RequestTelegramVerification {\n        requestTelegramVerification {\n            token\n        }\n    }\n": types.RequestTelegramVerificationDocument,
    "\n    query GetOAuthURL {\n        getOAuthURL\n    }\n": types.GetOAuthUrlDocument,
    "\n    mutation RegisterWithEmailAndPassword($userPayload: RegisterWithEmailAndPasswordDto!) {\n        registerUserWithEmailAndPassword(userPayload: $userPayload)\n    }\n": types.RegisterWithEmailAndPasswordDocument,
    "\n    mutation LoginWithEmailAndPassword($userPayload: LoginWithEmailAndPasswordDto!) {\n        loginWithEmailAndPassword(userPayload: $userPayload)\n    }\n": types.LoginWithEmailAndPasswordDocument,
    "\n    mutation OAuth($oauthPayload: OAuthDto!) {\n        oauth(oauthPayload: $oauthPayload)\n    }\n": types.OAuthDocument,
    "\n    mutation RefreshToken {\n        refreshToken\n    }\n": types.RefreshTokenDocument,
    "\n    mutation VerifyUser($verifyUserPayload: VerifyUserDto!) {\n        verifyUser(verifyUserPayload: $verifyUserPayload)\n    }\n": types.VerifyUserDocument,
    "\n    mutation RequestResetPassword {\n        requestResetPassword\n    }\n": types.RequestResetPasswordDocument,
    "\n    mutation ResetPassword($resetPasswordPayload: ConfirmPasswordResetDto!) {\n        resetPassword(resetPasswordPayload: $resetPasswordPayload)\n    }\n": types.ResetPasswordDocument,
    "\n  query GetQuizzes {\n    getQuizzes {\n      id\n      title\n      description\n      type\n      passingScore\n      questions {\n        explanation\n        id\n        mediaId\n        options {\n          id\n          isCorrect\n          text\n        }\n        order\n        text\n      }\n      createdAt\n    }\n  }\n": types.GetQuizzesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation RequestTelegramVerification {\n        requestTelegramVerification {\n            token\n        }\n    }\n"): (typeof documents)["\n    mutation RequestTelegramVerification {\n        requestTelegramVerification {\n            token\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetOAuthURL {\n        getOAuthURL\n    }\n"): (typeof documents)["\n    query GetOAuthURL {\n        getOAuthURL\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation RegisterWithEmailAndPassword($userPayload: RegisterWithEmailAndPasswordDto!) {\n        registerUserWithEmailAndPassword(userPayload: $userPayload)\n    }\n"): (typeof documents)["\n    mutation RegisterWithEmailAndPassword($userPayload: RegisterWithEmailAndPasswordDto!) {\n        registerUserWithEmailAndPassword(userPayload: $userPayload)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation LoginWithEmailAndPassword($userPayload: LoginWithEmailAndPasswordDto!) {\n        loginWithEmailAndPassword(userPayload: $userPayload)\n    }\n"): (typeof documents)["\n    mutation LoginWithEmailAndPassword($userPayload: LoginWithEmailAndPasswordDto!) {\n        loginWithEmailAndPassword(userPayload: $userPayload)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation OAuth($oauthPayload: OAuthDto!) {\n        oauth(oauthPayload: $oauthPayload)\n    }\n"): (typeof documents)["\n    mutation OAuth($oauthPayload: OAuthDto!) {\n        oauth(oauthPayload: $oauthPayload)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation RefreshToken {\n        refreshToken\n    }\n"): (typeof documents)["\n    mutation RefreshToken {\n        refreshToken\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation VerifyUser($verifyUserPayload: VerifyUserDto!) {\n        verifyUser(verifyUserPayload: $verifyUserPayload)\n    }\n"): (typeof documents)["\n    mutation VerifyUser($verifyUserPayload: VerifyUserDto!) {\n        verifyUser(verifyUserPayload: $verifyUserPayload)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation RequestResetPassword {\n        requestResetPassword\n    }\n"): (typeof documents)["\n    mutation RequestResetPassword {\n        requestResetPassword\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation ResetPassword($resetPasswordPayload: ConfirmPasswordResetDto!) {\n        resetPassword(resetPasswordPayload: $resetPasswordPayload)\n    }\n"): (typeof documents)["\n    mutation ResetPassword($resetPasswordPayload: ConfirmPasswordResetDto!) {\n        resetPassword(resetPasswordPayload: $resetPasswordPayload)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetQuizzes {\n    getQuizzes {\n      id\n      title\n      description\n      type\n      passingScore\n      questions {\n        explanation\n        id\n        mediaId\n        options {\n          id\n          isCorrect\n          text\n        }\n        order\n        text\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetQuizzes {\n    getQuizzes {\n      id\n      title\n      description\n      type\n      passingScore\n      questions {\n        explanation\n        id\n        mediaId\n        options {\n          id\n          isCorrect\n          text\n        }\n        order\n        text\n      }\n      createdAt\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;