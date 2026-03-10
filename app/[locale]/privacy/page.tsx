import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const dynamic = "force-dynamic"

export const metadata = {
    title: "Конфіденційність | Libitum",
    description: "Політика конфіденційності платформи Libitum.",
}

const privacyBlocks = [
    {
        title: "Які дані ми збираємо",
        description: "Імʼя, email, телефон та інформацію про навчальні запити для забезпечення сервісу.",
    },
    {
        title: "Як ми використовуємо дані",
        description: "Для підбору спеціалістів, комунікації, покращення якості сервісу та аналітики.",
    },
    {
        title: "Захист та безпека",
        description: "Дані зберігаються у захищеному середовищі. Доступ мають лише авторизовані співробітники.",
    },
    {
        title: "Права користувачів",
        description: "Ви можете запросити видалення або зміну персональних даних через службу підтримки.",
    },
]

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-white relative overflow-hidden">
            <div className="fixed top-20 -left-32 w-64 h-64 rounded-full bg-emerald-100/40 blur-3xl animate-orb pointer-events-none" />
            <div
                className="fixed top-40 -right-32 w-96 h-96 rounded-full bg-amber-100/30 blur-3xl animate-orb pointer-events-none"
                style={{ animationDelay: "1s" }}
            />
            <div
                className="fixed bottom-40 left-1/4 w-80 h-80 rounded-full bg-emerald-50/30 blur-3xl animate-orb pointer-events-none"
                style={{ animationDelay: "2s" }}
            />

            <div className="container mx-auto max-w-4xl space-y-8 px-6 py-10 relative z-10">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-slate-900">Політика конфіденційності</h1>
                    <p className="text-slate-600">Ми дотримуємось вимог щодо захисту персональних даних.</p>
                </div>

                <div className="grid gap-4">
                    {privacyBlocks.map((block, index) => (
                        <Card
                            key={block.title}
                            className={`bg-gradient-to-br ${
                                index % 2 === 0
                                    ? "from-white via-emerald-50/30 to-white hover:ring-1 hover:ring-emerald-200/50"
                                    : "from-white via-amber-50/30 to-white hover:ring-1 hover:ring-amber-200/50"
                            } transition-all duration-300`}
                        >
                            <CardHeader>
                                <CardTitle className="text-lg text-slate-900">{block.title}</CardTitle>
                                <CardDescription className="text-slate-600">{block.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-slate-600">
                                В разі питань звертайтесь до служби підтримки.
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
