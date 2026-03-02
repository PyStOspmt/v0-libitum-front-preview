/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type ApproveQuizDto = {
  answers: Array<QuizAnswerDto>;
  quizId: Scalars['String']['input'];
};

export type AuthProviderType = {
  __typename?: 'AuthProviderType';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  provider: AuthProviderTypes;
  providerId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
};

export enum AuthProviderTypes {
  EmailPassword = 'EMAIL_PASSWORD',
  Google = 'GOOGLE',
  Telegram = 'TELEGRAM'
}

export type AuthSessionType = {
  __typename?: 'AuthSessionType';
  createdAt: Scalars['DateTime']['output'];
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  ipAddress: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  isExpired: Scalars['Boolean']['output'];
  provider: AuthProviderTypes;
  user: UserType;
  userAgent: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type CityType = {
  __typename?: 'CityType';
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  population: Scalars['Int']['output'];
  region: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type ClientProfileType = {
  __typename?: 'ClientProfileType';
  createdAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  phoneNumber: Scalars['String']['output'];
  specialistIds: Array<Scalars['ID']['output']>;
  specialists: Array<TutorProfileType>;
  subjectIds: Array<Scalars['ID']['output']>;
  subjects: Array<SubjectType>;
  updatedAt: Scalars['DateTime']['output'];
  user: UserType;
  userId: Scalars['ID']['output'];
};

export type ConfirmPasswordResetDto = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type CountryType = {
  __typename?: 'CountryType';
  cities?: Maybe<Array<CityType>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CreateQuizDto = {
  description: Scalars['String']['input'];
  passingScore: Scalars['Float']['input'];
  questions: Array<QuizQuestionInputDto>;
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type CreateReferralDto = {
  payload: Scalars['JSON']['input'];
  referredId?: InputMaybe<Scalars['String']['input']>;
  referrerId: Scalars['String']['input'];
};

export type CreateSubjectDto = {
  prices: Array<SubjectPriceInput>;
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type CreateUserRelationsDto = {
  relation: Scalars['String']['input'];
  subordinateId: Scalars['String']['input'];
  superiorId: Scalars['String']['input'];
};

export enum DayOfWeek {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export type DeleteSubjectDto = {
  subjectId: Scalars['String']['input'];
};

export type DeleteUserDto = {
  id: Scalars['String']['input'];
};

export type DeleteUserRelationsDto = {
  id: Scalars['String']['input'];
};

export type FindUserDto = {
  email: Scalars['String']['input'];
};

export type FindUserRelationDto = {
  id: Scalars['String']['input'];
};

export enum LevelCategory {
  Business = 'BUSINESS',
  Child = 'CHILD',
  School = 'SCHOOL',
  University = 'UNIVERSITY'
}

export type LevelType = {
  __typename?: 'LevelType';
  category: LevelCategory;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  maxAge: Scalars['Int']['output'];
  minAge: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  subject: SubjectTarget;
};

export type LoginWithEmailAndPasswordDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MediaType = {
  __typename?: 'MediaType';
  createdAt: Scalars['String']['output'];
  fileName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  mimeType: Scalars['String']['output'];
  size: Scalars['Float']['output'];
  storageKey: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createSubject: SubjectType;
  createUserRelations: UserRelationsType;
  deleteSubject: Scalars['String']['output'];
  deleteUser: Scalars['Boolean']['output'];
  deleteUserRelations: Scalars['Boolean']['output'];
  handleCompleteQuiz: Scalars['Boolean']['output'];
  handleCreateQuiz: QuizType;
  inviteChildren: Referral;
  loginWithEmailAndPassword: Scalars['Boolean']['output'];
  oauth: Scalars['Boolean']['output'];
  refreshToken: Scalars['Boolean']['output'];
  registerUserWithEmailAndPassword: Scalars['Boolean']['output'];
  rejectTutorProfile: TutorProfileType;
  requestResetPassword: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  seedCities: Scalars['Boolean']['output'];
  seedLevels: Scalars['Boolean']['output'];
  updateUser: UserType;
  updateUserRelations: UserRelationsType;
  verifyTutorProfile: TutorProfileType;
  verifyUser: Scalars['Boolean']['output'];
};


export type MutationCreateSubjectArgs = {
  createSubjectPayload: CreateSubjectDto;
};


export type MutationCreateUserRelationsArgs = {
  createUserRelationsDto: CreateUserRelationsDto;
};


export type MutationDeleteSubjectArgs = {
  deleteSubjectPayload: DeleteSubjectDto;
};


export type MutationDeleteUserArgs = {
  deleteUserDto: DeleteUserDto;
};


export type MutationDeleteUserRelationsArgs = {
  deleteUserRelationsDto: DeleteUserRelationsDto;
};


export type MutationHandleCompleteQuizArgs = {
  completeQuizPayload: ApproveQuizDto;
};


export type MutationHandleCreateQuizArgs = {
  createQuizPayload: CreateQuizDto;
};


export type MutationInviteChildrenArgs = {
  createReferralDto: CreateReferralDto;
};


export type MutationLoginWithEmailAndPasswordArgs = {
  userPayload: LoginWithEmailAndPasswordDto;
};


export type MutationOauthArgs = {
  oauthPayload: OAuthDto;
};


export type MutationRegisterUserWithEmailAndPasswordArgs = {
  userPayload: RegisterWithEmailAndPasswordDto;
};


export type MutationRejectTutorProfileArgs = {
  rejectTutorPayload: RejectTutorProfileDto;
};


export type MutationResetPasswordArgs = {
  resetPasswordPayload: ConfirmPasswordResetDto;
};


export type MutationUpdateUserArgs = {
  updateUserDto: UpdateUserDto;
};


export type MutationUpdateUserRelationsArgs = {
  updateUserRelationsDto: UpdateUserRelationsDto;
};


export type MutationVerifyTutorProfileArgs = {
  verifyTutorPayload: VerifyTutorProfileDto;
};


export type MutationVerifyUserArgs = {
  verifyUserPayload: VerifyUserDto;
};

export type OAuthDto = {
  idToken: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export enum ProfileStatus {
  Banned = 'BANNED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Verified = 'VERIFIED'
}

export type Query = {
  __typename?: 'Query';
  cities: Array<CityType>;
  findUser: UserType;
  findUserRelations: UserRelationsType;
  getHello: Scalars['String']['output'];
  getOAuthURL: Scalars['String']['output'];
  getPendingTutorProfiles: Array<TutorProfileType>;
  getQuizById: QuizType;
  getQuizzes: Array<QuizType>;
  levels: Array<LevelType>;
};


export type QueryFindUserArgs = {
  findUserDto: FindUserDto;
};


export type QueryFindUserRelationsArgs = {
  findUserRelationsDto: FindUserRelationDto;
};


export type QueryGetQuizByIdArgs = {
  id: Scalars['ID']['input'];
};

export type QuizAnswerDto = {
  questionId: Scalars['String']['input'];
  selectedOptionsId: Array<Scalars['String']['input']>;
};

export type QuizAttemptType = {
  __typename?: 'QuizAttemptType';
  answers: Array<UserAnswerType>;
  completedAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isPassed: Scalars['Boolean']['output'];
  quizId: Scalars['ID']['output'];
  respondentId: Scalars['ID']['output'];
  respondentType: UserRoles;
  score: Scalars['Int']['output'];
};

export type QuizOptionInputDto = {
  isCorrect: Scalars['Boolean']['input'];
  text: Scalars['String']['input'];
};

export type QuizOptionType = {
  __typename?: 'QuizOptionType';
  id: Scalars['ID']['output'];
  isCorrect: Scalars['Boolean']['output'];
  text: Scalars['String']['output'];
};

export type QuizQuestionInputDto = {
  explanation?: InputMaybe<Scalars['String']['input']>;
  mediaId?: InputMaybe<Scalars['ID']['input']>;
  options: Array<QuizOptionInputDto>;
  order: Scalars['Int']['input'];
  text: Scalars['String']['input'];
};

export type QuizQuestionType = {
  __typename?: 'QuizQuestionType';
  explanation?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  mediaId?: Maybe<Scalars['ID']['output']>;
  options: Array<QuizOptionType>;
  order: Scalars['Int']['output'];
  text: Scalars['String']['output'];
};

export enum QuizTarget {
  SubjectTest = 'SUBJECT_TEST',
  Verification = 'VERIFICATION'
}

export type QuizType = {
  __typename?: 'QuizType';
  archivedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  passingScore: Scalars['Int']['output'];
  questions: Array<QuizQuestionType>;
  title: Scalars['String']['output'];
  type: QuizTarget;
  updatedAt: Scalars['DateTime']['output'];
};

export type Referral = {
  __typename?: 'Referral';
  /** Creation timestamp */
  createdAt: Scalars['DateTime']['output'];
  /** Expiration timestamp for the referral */
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  /** Timestamp when the referral was used/reacted to */
  reactedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Unique referral code */
  referralCode: Scalars['String']['output'];
  /** The user who used the referral */
  referred?: Maybe<UserType>;
  /** ID of the user who used the referral */
  referredId?: Maybe<Scalars['ID']['output']>;
  /** The user who used the referral */
  referrer: UserType;
  /** ID of the user who created the referral */
  referrerId: Scalars['ID']['output'];
  /** Current status of the referral */
  status: ReferralStatus;
  /** Target action type */
  target: ReferralTarget;
  /** Last update timestamp */
  updatedAt: Scalars['DateTime']['output'];
};

export enum ReferralStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export enum ReferralTarget {
  ChildrenRegistration = 'CHILDREN_REGISTRATION',
  GroupInvitation = 'GROUP_INVITATION',
  RewardWithdrawal = 'REWARD_WITHDRAWAL'
}

export type RegisterWithEmailAndPasswordDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type RejectTutorProfileDto = {
  userId: Scalars['String']['input'];
};

export type ScheduleRuleType = {
  __typename?: 'ScheduleRuleType';
  day: DayOfWeek;
  endTime: Scalars['String']['output'];
  startTime: Scalars['String']['output'];
};

export type ScheduleType = {
  __typename?: 'ScheduleType';
  id: Scalars['ID']['output'];
  rules: Array<ScheduleRuleType>;
  timezone: Scalars['String']['output'];
  tutorProfileId: Scalars['ID']['output'];
};

export type SubjectFormatInput = {
  offline: Scalars['Boolean']['input'];
  online: Scalars['Boolean']['input'];
};

export type SubjectFormatsType = {
  __typename?: 'SubjectFormatsType';
  offline: Scalars['Boolean']['output'];
  online: Scalars['Boolean']['output'];
};

export type SubjectPriceInput = {
  formats: SubjectFormatInput;
  level: Scalars['String']['input'];
  pricePerHour: Scalars['Float']['input'];
};

export type SubjectPriceType = {
  __typename?: 'SubjectPriceType';
  formats: SubjectFormatsType;
  level: Scalars['String']['output'];
  pricePerHour: Scalars['Int']['output'];
};

export enum SubjectTarget {
  Art = 'ART',
  Biology = 'BIOLOGY',
  Chemistry = 'CHEMISTRY',
  English = 'ENGLISH',
  Geography = 'GEOGRAPHY',
  History = 'HISTORY',
  Math = 'MATH',
  Music = 'MUSIC',
  Physics = 'PHYSICS',
  Science = 'SCIENCE',
  Sports = 'SPORTS'
}

export type SubjectType = {
  __typename?: 'SubjectType';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  minPrice: Scalars['Int']['output'];
  participantIds: Array<Scalars['ID']['output']>;
  participants: Array<ClientProfileType>;
  prices: Array<SubjectPriceType>;
  title: Scalars['String']['output'];
  tutorProfile: TutorProfileType;
  tutorProfileId: Scalars['ID']['output'];
  type: SubjectTarget;
  updatedAt: Scalars['DateTime']['output'];
};

export type TutorEducationType = {
  __typename?: 'TutorEducationType';
  createdAt: Scalars['DateTime']['output'];
  degree: Scalars['String']['output'];
  fileUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  institutionName: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  years: Scalars['String']['output'];
};

export type TutorFormatsType = {
  __typename?: 'TutorFormatsType';
  group: Scalars['Boolean']['output'];
  offline: Scalars['Boolean']['output'];
  online: Scalars['Boolean']['output'];
};

export type TutorProfileType = {
  __typename?: 'TutorProfileType';
  aboutText: Scalars['String']['output'];
  attemptIds: Array<Scalars['ID']['output']>;
  attempts?: Maybe<Array<QuizAttemptType>>;
  avatar?: Maybe<MediaType>;
  avatarId?: Maybe<Scalars['ID']['output']>;
  cities?: Maybe<Array<CityType>>;
  cityIds: Array<Scalars['ID']['output']>;
  createdAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  educations: Array<TutorEducationType>;
  experienceYears: Scalars['Int']['output'];
  foreignProgramCountry?: Maybe<CountryType>;
  foreignProgramCountryId?: Maybe<Scalars['ID']['output']>;
  formats: TutorFormatsType;
  id: Scalars['ID']['output'];
  isSearching: Scalars['Boolean']['output'];
  reactedAt?: Maybe<Scalars['DateTime']['output']>;
  readyForPairLessons: Scalars['Boolean']['output'];
  scheduleId?: Maybe<Scalars['ID']['output']>;
  schedules?: Maybe<ScheduleType>;
  status: ProfileStatus;
  subjectIds: Array<Scalars['ID']['output']>;
  subjects: Array<SubjectType>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
  videoIntroUrl?: Maybe<Scalars['String']['output']>;
};

export type UpdateUserDto = {
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  role?: InputMaybe<UserRoles>;
};

export type UpdateUserRelationsDto = {
  id: Scalars['String']['input'];
  relation?: InputMaybe<Scalars['String']['input']>;
};

export type UserAnswerType = {
  __typename?: 'UserAnswerType';
  questionId: Scalars['ID']['output'];
  selectedOptionsId: Array<Scalars['ID']['output']>;
};

export enum UserRelationTypes {
  ParentChild = 'PARENT_CHILD',
  TeacherStudent = 'TEACHER_STUDENT'
}

export type UserRelationsType = {
  __typename?: 'UserRelationsType';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  relation: UserRelationTypes;
  subordinate: UserType;
  subordinateId: Scalars['ID']['output'];
  superior: UserType;
  superiorId: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum UserRoles {
  Guest = 'GUEST',
  Parent = 'PARENT',
  Specialist = 'SPECIALIST',
  Student = 'STUDENT',
  SuperAdmin = 'SUPER_ADMIN'
}

export type UserType = {
  __typename?: 'UserType';
  authProviderIds?: Maybe<Array<Scalars['String']['output']>>;
  authProviders?: Maybe<Array<AuthProviderType>>;
  authSessionIds?: Maybe<Array<Scalars['String']['output']>>;
  authSessions?: Maybe<Array<AuthSessionType>>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isVerified: Scalars['Boolean']['output'];
  mediaIds?: Maybe<Array<Scalars['String']['output']>>;
  role: UserRoles;
  subordinateIds?: Maybe<Array<Scalars['String']['output']>>;
  subordinates?: Maybe<Array<UserType>>;
  superiorIds?: Maybe<Array<Scalars['String']['output']>>;
  superiors?: Maybe<Array<UserType>>;
  tutorProfile?: Maybe<TutorProfileType>;
  tutorProfileId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type VerifyTutorProfileDto = {
  userId: Scalars['String']['input'];
};

export type VerifyUserDto = {
  token: Scalars['String']['input'];
};

export type GetOAuthUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOAuthUrlQuery = { __typename?: 'Query', getOAuthURL: string };

export type RegisterWithEmailAndPasswordMutationVariables = Exact<{
  userPayload: RegisterWithEmailAndPasswordDto;
}>;


export type RegisterWithEmailAndPasswordMutation = { __typename?: 'Mutation', registerUserWithEmailAndPassword: boolean };

export type LoginWithEmailAndPasswordMutationVariables = Exact<{
  userPayload: LoginWithEmailAndPasswordDto;
}>;


export type LoginWithEmailAndPasswordMutation = { __typename?: 'Mutation', loginWithEmailAndPassword: boolean };

export type OAuthMutationVariables = Exact<{
  oauthPayload: OAuthDto;
}>;


export type OAuthMutation = { __typename?: 'Mutation', oauth: boolean };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: boolean };

export type VerifyUserMutationVariables = Exact<{
  verifyUserPayload: VerifyUserDto;
}>;


export type VerifyUserMutation = { __typename?: 'Mutation', verifyUser: boolean };

export type RequestResetPasswordMutationVariables = Exact<{ [key: string]: never; }>;


export type RequestResetPasswordMutation = { __typename?: 'Mutation', requestResetPassword: boolean };

export type ResetPasswordMutationVariables = Exact<{
  resetPasswordPayload: ConfirmPasswordResetDto;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type GetQuizzesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetQuizzesQuery = { __typename?: 'Query', getQuizzes: Array<{ __typename?: 'QuizType', id: string, title: string, description?: string | null, type: QuizTarget, passingScore: number, createdAt: any, questions: Array<{ __typename?: 'QuizQuestionType', explanation?: string | null, id: string, mediaId?: string | null, order: number, text: string, options: Array<{ __typename?: 'QuizOptionType', id: string, isCorrect: boolean, text: string }> }> }> };


export const GetOAuthUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOAuthURL"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOAuthURL"}}]}}]} as unknown as DocumentNode<GetOAuthUrlQuery, GetOAuthUrlQueryVariables>;
export const RegisterWithEmailAndPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterWithEmailAndPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterWithEmailAndPasswordDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerUserWithEmailAndPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userPayload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userPayload"}}}]}]}}]} as unknown as DocumentNode<RegisterWithEmailAndPasswordMutation, RegisterWithEmailAndPasswordMutationVariables>;
export const LoginWithEmailAndPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginWithEmailAndPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginWithEmailAndPasswordDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginWithEmailAndPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userPayload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userPayload"}}}]}]}}]} as unknown as DocumentNode<LoginWithEmailAndPasswordMutation, LoginWithEmailAndPasswordMutationVariables>;
export const OAuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OAuth"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"oauthPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OAuthDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oauth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"oauthPayload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"oauthPayload"}}}]}]}}]} as unknown as DocumentNode<OAuthMutation, OAuthMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const VerifyUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"verifyUserPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyUserDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"verifyUserPayload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"verifyUserPayload"}}}]}]}}]} as unknown as DocumentNode<VerifyUserMutation, VerifyUserMutationVariables>;
export const RequestResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestResetPassword"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestResetPassword"}}]}}]} as unknown as DocumentNode<RequestResetPasswordMutation, RequestResetPasswordMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resetPasswordPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ConfirmPasswordResetDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resetPasswordPayload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resetPasswordPayload"}}}]}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const GetQuizzesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetQuizzes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getQuizzes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"passingScore"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"explanation"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaId"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetQuizzesQuery, GetQuizzesQueryVariables>;