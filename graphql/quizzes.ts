import { gql } from "./generated";

export const GET_QUIZZES = gql(`
  query GetQuizzes {
    getQuizzes {
      id
      title
      description
      type
      passingScore
      questions {
        explanation
        id
        mediaId
        options {
          id
          text
        }
        order
        text
      }
      createdAt
    }
  }
`);
