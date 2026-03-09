import { gql } from "./generated"

export const GET_QUIZZES = gql(`
  query GetQuizzes {
    quizzes: getQuizzes {
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
      updatedAt
    }
  }
`)

export const HANDLE_COMPLETE_QUIZ = gql(`
  mutation HandleCompleteQuiz($payload: ApproveQuizDto!) {
    handleCompleteQuiz(completeQuizPayload: $payload) {
      correctCount
      isPassed
      questionResults {
        correctOptionIds
        isCorrect
        questionId
        selectedOptionIds
      }
      scorePercent
      totalQuestions
    }
  }
`)
