import type { GetQuizzesQuery } from "@/graphql/generated/graphql"
import { GET_QUIZZES } from "@/graphql/quizzes"

import { TutorOnboardingPage } from "@/features/tutor/components/onboarding-page"

import { getApolloServerClient } from "@/lib/clients/apollo-server"

export const metadata = {
    title: "Онбординг | Libitum",
    description: "Кабінет спеціаліста Libitum",
}

export const dynamic = "force-dynamic"

async function getQuizzes() {
    try {
        const apolloClient = await getApolloServerClient()

        const { data } = await apolloClient.query<GetQuizzesQuery>({
            query: GET_QUIZZES,
        })

        if (!data) {
            return []
        }

        return data.quizzes
    } catch (error) {
        console.log(error)
        return []
    }
}

export default async function Page() {
    const quizzes = await getQuizzes()

    return <TutorOnboardingPage quizzes={quizzes} />
}
