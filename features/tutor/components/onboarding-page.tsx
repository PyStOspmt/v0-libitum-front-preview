"use client"

import { AlertCircle, ArrowRight, BookOpen, CheckCircle, Loader2, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useMemo } from "react"
import { useMutation } from "@apollo/client/react"
import { toast } from "sonner"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { useAuthContext } from "@/features/auth/context/auth-context"

import { HANDLE_COMPLETE_QUIZ } from "@/graphql/quizzes"
import { cn } from "@/lib/utils"

interface TutorOnboardingPageProps {
    quizzes: any
}

type LocalQuizQuestion = {
    id: string
    question: string
    explanation?: string | null
    options: {
        id: string
        text: string
    }[]
}

type QuizResult = {
    correctCount: number
    isPassed: boolean
    questionResults: {
        correctOptionIds: string[]
        isCorrect: boolean
        questionId: string
        selectedOptionIds: string[]
    }[]
    scorePercent: number
    totalQuestions: number
}

export function TutorOnboardingPage({ quizzes }: TutorOnboardingPageProps) {
    const router = useRouter()
    const { user } = useAuthContext()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<Record<number, string>>({})
    const [showResults, setShowResults] = useState(false)
    const [quizResult, setQuizResult] = useState<QuizResult | null>(null)

    // TODO: Remove `as any` after running `pnpm codegen` with backend online
    const [completeQuizMutation, { loading: isSubmitting }] = useMutation<{ handleCompleteQuiz: QuizResult }>(HANDLE_COMPLETE_QUIZ as any)

    const quiz = quizzes && quizzes.length > 0 ? quizzes[0] : null

    const QUIZ_QUESTIONS: LocalQuizQuestion[] = useMemo(() => {
        if (!quiz) return []

        return [...quiz.questions].sort((a: any, b: any) => a.order - b.order).map((q: any) => ({
            id: String(q.id),
            question: q.text,
            explanation: q.explanation,
            options: q.options.map((opt: any) => ({
                id: String(opt.id),
                text: opt.text,
            }))
        }))
    }, [quiz])

    const handleAnswer = (optionId: string) => {
        setAnswers({ ...answers, [currentQuestion]: optionId })
    }

    const handleNext = async () => {
        if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            await submitQuiz()
        }
    }

    const submitQuiz = async () => {
        console.log("[submitQuiz] Started")
        try {
            const payload = {
                quizId: quiz.id,
                answers: QUIZ_QUESTIONS.map((q, index) => ({
                    questionId: q.id,
                    selectedOptionsId: [answers[index]],
                })),
            }
            console.log("[submitQuiz] Payload:", JSON.stringify(payload, null, 2))

            console.log("[submitQuiz] Calling completeQuizMutation...")
            const result = await completeQuizMutation({
                variables: { payload },
            })
            console.log("[submitQuiz] Mutation result:", JSON.stringify(result, null, 2))

            const { data } = result

            if (data?.handleCompleteQuiz) {
                console.log("[submitQuiz] Quiz completed successfully:", data.handleCompleteQuiz)
                setQuizResult(data.handleCompleteQuiz)
                setShowResults(true)
            } else {
                console.warn("[submitQuiz] No handleCompleteQuiz in response data:", data)
            }
        } catch (error: any) {
            console.error("[submitQuiz] Error caught:", error)
            console.error("[submitQuiz] Error message:", error?.message)
            console.error("[submitQuiz] GraphQL errors:", error?.graphQLErrors)
            console.error("[submitQuiz] Network error:", error?.networkError)
            toast.error(error?.message || "Не вдалося відправити результати тесту. Спробуйте ще раз.")
        }
        console.log("[submitQuiz] Finished")
    }

    const handleRetry = () => {
        setCurrentQuestion(0)
        setAnswers({})
        setShowResults(false)
        setQuizResult(null)
    }

    const [step, setStep] = useState<"instructions" | "quiz">("instructions")

    const question = QUIZ_QUESTIONS[currentQuestion]
    const shuffledOptions = useMemo(() => {
        if (!question) return []
        return [...question.options].sort(() => Math.random() - 0.5)
    }, [question])

    if (!quiz || QUIZ_QUESTIONS.length === 0) {
        return <div className="flex h-screen items-center justify-center p-8">Немає доступних квізів.</div>
    }


    const handleStartQuiz = () => setStep("quiz")

    const handleComplete = async () => {
        if (user) {
            const updatedUser = { ...user, hasPassedQuiz: true }
            localStorage.setItem("user", JSON.stringify(updatedUser))
            window.location.href = "/tutor"
        }
    }

    const progress = QUIZ_QUESTIONS.length > 0 ? ((currentQuestion) / QUIZ_QUESTIONS.length) * 100 : 0
    const passingScore = quiz?.passingScore ?? 100
    const isPassed = quizResult?.isPassed ?? false

    if (step === "instructions") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
                <Card className="max-w-2xl w-full">
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                            <span className="text-sm font-medium text-muted-foreground">Онбординг спеціаліста</span>
                        </div>
                        <CardTitle className="text-2xl">Як працює Libitium?</CardTitle>
                        <CardDescription>Перед початком роботи ознайомтеся з основними правилами платформи.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="rounded-lg border bg-card p-4 space-y-3">
                                <div className="flex gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                                    <div>
                                        <p className="font-medium">Модель оплати за лід</p>
                                        <p className="text-sm text-muted-foreground">
                                            Ви платите комісію тільки за реального учня, який залишився з вами після пробного
                                            заняття.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                                    <div>
                                        <p className="font-medium">Швидкість відповіді</p>
                                        <p className="text-sm text-muted-foreground">
                                            У вас є 3 години, щоб прийняти або відхилити нову заявку. Відповідь за 20 хв дає
                                            бонус!
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                                    <div>
                                        <p className="font-medium">Прозорість</p>
                                        <p className="text-sm text-muted-foreground">
                                            Якщо учень не підійшов або відмовився після першого уроку — ви нічого не платите.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button onClick={handleStartQuiz} className="w-full">
                            Я все зрозумів, почати тест
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (showResults && quizResult) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-8">
                <Card className="w-full max-w-2xl">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                            {isPassed ? (
                                <CheckCircle className="h-12 w-12 text-green-600" />
                            ) : (
                                <XCircle className="h-12 w-12 text-red-600" />
                            )}
                        </div>
                        <CardTitle className="text-2xl">
                            {isPassed ? "Вітаємо! Ви пройшли тест" : "Потрібно спробувати ще раз"}
                        </CardTitle>
                        <CardDescription>
                            Ви відповіли правильно на {quizResult.correctCount} з {quizResult.totalQuestions} питань ({quizResult.scorePercent}%)
                            {passingScore < 100 && <span className="block mt-1 text-xs">Прохідний бал: {passingScore}%</span>}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {!isPassed && (
                            <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    <p>
                                        Для активації профілю необхідно правильно відповісти на {passingScore}% питань. Будь ласка, уважно
                                        перечитайте{" "}
                                        <a href="/rules" className="text-teal-600 hover:underline">
                                            правила платформи
                                        </a>{" "}
                                        та спробуйте ще раз.
                                    </p>
                                </AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-3">
                            {quizResult.questionResults.map((result, index) => {
                                const questionData = QUIZ_QUESTIONS[index]
                                if (!questionData) return null

                                const selectedOptions = questionData.options.filter((opt) =>
                                    result.selectedOptionIds.includes(opt.id)
                                )
                                const correctOptions = questionData.options.filter((opt) =>
                                    result.correctOptionIds.includes(opt.id)
                                )

                                return (
                                    <div
                                        key={result.questionId}
                                        className={`rounded-lg border-2 p-4 ${result.isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <p className="text-sm font-medium">
                                                {index + 1}. {questionData.question}
                                            </p>
                                            {result.isCorrect ? (
                                                <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
                                            ) : (
                                                <XCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
                                            )}
                                        </div>
                                        {!result.isCorrect && (
                                            <div className="mt-2 space-y-1 text-sm bg-white p-3 rounded-md border text-slate-700">
                                                <div className="flex flex-col gap-1 mb-2">
                                                    <p className="text-red-700 font-medium">Ваша відповідь: <span className="font-normal text-slate-800">{selectedOptions.map((o) => o.text).join(", ")}</span></p>
                                                    <p className="text-green-700 font-medium">Правильна відповідь: <span className="font-normal text-slate-800">{correctOptions.map((o) => o.text).join(", ")}</span></p>
                                                </div>
                                                {questionData.explanation && (
                                                    <p className="text-sm mt-3 pt-3 border-t text-muted-foreground"><span className="font-medium">Пояснення:</span> {questionData.explanation}</p>
                                                )}
                                            </div>
                                        )}
                                        {result.isCorrect && questionData.explanation && (
                                            <div className="mt-2 space-y-1 text-sm bg-white p-3 rounded-md border text-slate-700">
                                                <p className="text-sm text-muted-foreground"><span className="font-medium">Пояснення:</span> {questionData.explanation}</p>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>

                        <div className="flex flex-col gap-3">
                            {isPassed ? (
                                <Button onClick={handleComplete} className="w-full">
                                    Продовжити
                                </Button>
                            ) : (
                                <>
                                    <Button variant="outline" onClick={() => router.push("/rules")} className="w-full">
                                        Переглянути правила
                                    </Button>
                                    <Button onClick={handleRetry} className="w-full">
                                        Спробувати ще раз
                                    </Button>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div >
        )
    }

    const hasAnswer = answers[currentQuestion] !== undefined

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-8">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">{quiz.title || "Тест на знання правил платформи"}</CardTitle>
                    <CardDescription>
                        {quiz.description || "Відповідайте уважно. Для активації профілю потрібно правильно відповісти на всі питання."}
                    </CardDescription>
                    <Progress value={progress} className="mt-4" />
                    <p className="mt-2 text-sm text-muted-foreground">
                        Питання {currentQuestion + 1} з {QUIZ_QUESTIONS.length}
                    </p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="mb-4 text-lg font-medium">{question.question}</h3>
                        <RadioGroup value={answers[currentQuestion] ?? ""} onValueChange={handleAnswer}>
                            <div className="space-y-3">
                                {shuffledOptions.map((option) => (
                                    <Label
                                        key={`${question.id}-${option.id}`}
                                        htmlFor={`${question.id}-${option.id}`}
                                        className={cn(
                                            "flex items-center space-x-3 cursor-pointer rounded-lg border-2 p-4 transition-colors",
                                            {
                                                "border-teal-600 bg-teal-50": answers[currentQuestion] === option.id,
                                                "border-gray-200 hover:border-gray-300": answers[currentQuestion] !== option.id,
                                            }
                                        )}
                                    >
                                        <RadioGroupItem value={option.id} id={`${question.id}-${option.id}`} />
                                        <p className="flex-1 font-normal">
                                            {option.text}
                                        </p>
                                    </Label>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="flex flex-col gap-3">
                        {currentQuestion > 0 && (
                            <Button
                                variant="outline"
                                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                                className="w-full"
                            >
                                Назад
                            </Button>
                        )}
                        <Button onClick={handleNext} disabled={!hasAnswer || isSubmitting} className="w-full">
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Відправка...
                                </>
                            ) : (
                                currentQuestion < QUIZ_QUESTIONS.length - 1 ? "Далі" : "Завершити тест"
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
