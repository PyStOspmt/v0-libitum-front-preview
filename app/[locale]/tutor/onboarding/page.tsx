import type { GetQuizzesQuery } from "@/graphql/generated/graphql"
import { print } from "graphql"

import { fetchGraphQL } from "@/lib/apollo/server-client"
import { GET_QUIZZES } from "@/graphql/quizzes"
import { TutorOnboardingPage } from "@/features/tutor/components/onboarding-page"

export const metadata = {
    title: "Онбординг | Libitum",
    description: "Кабінет спеціаліста Libitum",
}

export const dynamic = "force-dynamic"

export default async function Page() {
    const { data } = await fetchGraphQL<GetQuizzesQuery>(print(GET_QUIZZES as any))
    const quizzes = data?.getQuizzes || []

    return <TutorOnboardingPage quizzes={quizzes} />
}
