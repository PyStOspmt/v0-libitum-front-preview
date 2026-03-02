"use client"

import { AlertCircle, ArrowRight, BookOpen, CheckCircle, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { useAuth } from "@/lib/auth-context"

const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: "Коли ви платите комісію платформі за лід?",
        options: [
            { id: "a", text: "Одразу після отримання заявки", correct: false },
            { id: "b", text: "Після успішного пробного заняття, якщо клієнт продовжує", correct: true },
            { id: "c", text: "Щомісяця фіксована сума", correct: false },
            { id: "d", text: "Платформа безкоштовна", correct: false },
        ],
    },
    {
        id: 2,
        question: "Скільки часу у вас є на відповідь після отримання заявки?",
        options: [
            { id: "a", text: "24 години", correct: false },
            { id: "b", text: "1 година", correct: false },
            { id: "c", text: "3 години", correct: true },
            { id: "d", text: "Необмежено", correct: false },
        ],
    },
    {
        id: 3,
        question: "Що станеться, якщо ви відповісте на заявку протягом 20 хвилин?",
        options: [
            { id: "a", text: "Нічого особливого", correct: false },
            { id: "b", text: "Отримаєте бонус до рейтингу", correct: true },
            { id: "c", text: "Знижка на комісію", correct: false },
            { id: "d", text: "Додаткова заявка безкоштовно", correct: false },
        ],
    },
    {
        id: 4,
        question: "Що робити, якщо клієнт відмовився продовжувати після пробного заняття?",
        options: [
            { id: "a", text: "Все одно треба платити комісію", correct: false },
            { id: "b", text: "Вказати причину в системі, комісія не стягується", correct: true },
            { id: "c", text: "Написати в підтримку", correct: false },
            { id: "d", text: "Видалити заявку", correct: false },
        ],
    },
    {
        id: 5,
        question: "Скільки часу у вас є на оплату комісії після успішного пробного?",
        options: [
            { id: "a", text: "3 години", correct: false },
            { id: "b", text: "12 годин", correct: false },
            { id: "c", text: "24 години", correct: true },
            { id: "d", text: "7 днів", correct: false },
        ],
    },
]

export function TutorOnboardingPage() {
    const router = useRouter()
    const { user } = useAuth()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<Record<number, string>>({})
    const [showResults, setShowResults] = useState(false)
    const [score, setScore] = useState(0)

    const handleAnswer = (optionId: string) => {
        setAnswers({ ...answers, [currentQuestion]: optionId })
    }

    const handleNext = () => {
        if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            checkAnswers()
        }
    }

    const checkAnswers = () => {
        let correct = 0
        QUIZ_QUESTIONS.forEach((question, index) => {
            const selectedOption = question.options.find((opt) => opt.id === answers[index])
            if (selectedOption?.correct) {
                correct++
            }
        })
        setScore(correct)
        setShowResults(true)
    }

    const handleRetry = () => {
        setCurrentQuestion(0)
        setAnswers({})
        setShowResults(false)
        setScore(0)
    }

    const [step, setStep] = useState<"instructions" | "quiz">("instructions")

    const handleStartQuiz = () => setStep("quiz")

    const handleComplete = async () => {
        // In a real app, this would be an API call to update hasPassedQuiz
        if (user) {
            const updatedUser = { ...user, hasPassedQuiz: true }
            localStorage.setItem("user", JSON.stringify(updatedUser))
            // Trigger a page refresh to update auth context state
            window.location.href = "/tutor"
        }
    }

    const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100
    const isPerfectScore = score === QUIZ_QUESTIONS.length

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

    if (showResults) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-8">
                <Card className="w-full max-w-2xl">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                            {isPerfectScore ? (
                                <CheckCircle className="h-12 w-12 text-green-600" />
                            ) : (
                                <XCircle className="h-12 w-12 text-red-600" />
                            )}
                        </div>
                        <CardTitle className="text-2xl">
                            {isPerfectScore ? "Вітаємо! Ви пройшли тест" : "Потрібно спробувати ще раз"}
                        </CardTitle>
                        <CardDescription>
                            Ви відповіли правильно на {score} з {QUIZ_QUESTIONS.length} питань
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {!isPerfectScore && (
                            <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    Для активації профілю необхідно правильно відповісти на всі питання. Будь ласка, уважно
                                    перечитайте{" "}
                                    <a href="/rules" className="text-teal-600 hover:underline">
                                        правила платформи
                                    </a>{" "}
                                    та спробуйте ще раз.
                                </AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-3">
                            {QUIZ_QUESTIONS.map((question, index) => {
                                const userAnswer = answers[index]
                                const selectedOption = question.options.find((opt) => opt.id === userAnswer)
                                const correctOption = question.options.find((opt) => opt.correct)
                                const isCorrect = selectedOption?.correct

                                return (
                                    <div
                                        key={question.id}
                                        className={`rounded-lg border-2 p-4 ${
                                            isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                                        }`}
                                    >
                                        <div className="mb-2 flex items-start justify-between">
                                            <p className="text-sm font-medium">
                                                {index + 1}. {question.question}
                                            </p>
                                            {isCorrect ? (
                                                <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
                                            ) : (
                                                <XCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
                                            )}
                                        </div>
                                        {!isCorrect && (
                                            <div className="mt-2 space-y-1 text-sm">
                                                <p className="text-red-600">Ваша відповідь: {selectedOption?.text}</p>
                                                <p className="text-green-600">Правильна відповідь: {correctOption?.text}</p>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>

                        <div className="flex gap-3">
                            {isPerfectScore ? (
                                <Button onClick={handleComplete} className="w-full">
                                    Продовжити до налаштування профілю
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
            </div>
        )
    }

    const question = QUIZ_QUESTIONS[currentQuestion]
    const hasAnswer = answers[currentQuestion] !== undefined

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-8">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Тест на знання правил платформи</CardTitle>
                    <CardDescription>
                        Відповідайте уважно. Для активації профілю потрібно правильно відповісти на всі питання.
                    </CardDescription>
                    <Progress value={progress} className="mt-4" />
                    <p className="mt-2 text-sm text-muted-foreground">
                        Питання {currentQuestion + 1} з {QUIZ_QUESTIONS.length}
                    </p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="mb-4 text-lg font-medium">{question.question}</h3>
                        <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer}>
                            <div className="space-y-3">
                                {question.options.map((option) => (
                                    <div
                                        key={option.id}
                                        className={`flex items-center space-x-3 rounded-lg border-2 p-4 transition-colors ${
                                            answers[currentQuestion] === option.id
                                                ? "border-teal-600 bg-teal-50"
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    >
                                        <RadioGroupItem value={option.id} id={option.id} />
                                        <Label htmlFor={option.id} className="flex-1 cursor-pointer font-normal">
                                            {option.text}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="flex gap-3">
                        {currentQuestion > 0 && (
                            <Button
                                variant="outline"
                                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                                className="w-full"
                            >
                                Назад
                            </Button>
                        )}
                        <Button onClick={handleNext} disabled={!hasAnswer} className="w-full">
                            {currentQuestion < QUIZ_QUESTIONS.length - 1 ? "Далі" : "Завершити тест"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
