import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const dynamic = "force-dynamic"

export const metadata = {
    title: "Контакти | Libitum",
    description: "Зв'яжіться з командою Libitum та службою підтримки.",
}

export default function ContactsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-white relative overflow-hidden">
            {/* Floating gradient orbs */}
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
                    <h1 className="text-3xl font-bold text-slate-900">Контакти</h1>
                    <p className="text-slate-600">Звʼязок із командою Libitum та службою підтримки.</p>
                </div>

                <div className="grid gap-4">
                    <Card className="bg-gradient-to-br from-white via-emerald-50/30 to-white hover:ring-1 hover:ring-emerald-200/50 transition-all duration-300">
                        <CardHeader>
                            <CardTitle className="text-slate-900">Підтримка клієнтів</CardTitle>
                            <CardDescription className="text-slate-600">
                                Telegram бот для швидких звернень та консультацій.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3">
                            <Button className="bg-[linear-gradient(135deg,#00796b,#009688,#0f766e)] hover:brightness-110 text-white border-transparent shadow-md transition-all duration-300">
                                Відкрити Telegram бот
                            </Button>
                            <div className="text-sm text-slate-600">Email: support@libitum.com</div>
                            <div className="text-sm text-slate-600">Телефон: +380 (44) 123-45-67</div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-white via-amber-50/30 to-white hover:ring-1 hover:ring-amber-200/50 transition-all duration-300">
                        <CardHeader>
                            <CardTitle className="text-slate-900">Партнерства</CardTitle>
                            <CardDescription className="text-slate-600">Співпраця, маркетинг, інтеграції.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-slate-600">
                            <div>Email: partners@libitum.com</div>
                            <div>Telegram: @libitum_partners</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
