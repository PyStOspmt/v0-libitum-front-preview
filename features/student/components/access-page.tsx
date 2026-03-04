import { BookOpen, Loader2 } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function StudentAccessPage({ token }: { token?: string | string[] }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
            <Card className="max-w-md w-full text-center">
                <CardHeader>
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <BookOpen className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl">Libitum Education</CardTitle>
                    <CardDescription>Вхід до кабінету учня...</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-6">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                    <p className="text-sm text-muted-foreground">Будь ласка, зачекайте. Ми налаштовуємо ваш робочий простір.</p>
                </CardContent>
            </Card>
        </div>
    )
}
