"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ContactsPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-6 py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Контакти</h1>
        <p className="text-muted-foreground">Звʼязок із командою Libitum та службою підтримки.</p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Підтримка клієнтів</CardTitle>
            <CardDescription>Telegram бот для швидких звернень та консультацій.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button variant="outline">Відкрити Telegram бот</Button>
            <div className="text-sm text-muted-foreground">Email: support@libitum.com</div>
            <div className="text-sm text-muted-foreground">Телефон: +380 (44) 123-45-67</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Партнерства</CardTitle>
            <CardDescription>Співпраця, маркетинг, інтеграції.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>Email: partners@libitum.com</div>
            <div>Telegram: @libitum_partners</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
