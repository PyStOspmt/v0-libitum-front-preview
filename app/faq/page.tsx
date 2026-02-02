"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function FaqPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-6 py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">FAQ</h1>
        <p className="text-muted-foreground">Відповіді на найчастіші запитання про Libitum.</p>
      </div>

      <div className="grid gap-4">
        {[
          {
            title: "Як створити заявку на заняття?",
            description: "Оберіть предмет у каталозі, перегляньте профіль викладача або створіть загальну заявку у кабінеті клієнта.",
          },
          {
            title: "Як репетитору отримати доступ до лідів?",
            description: "Необхідно пройти онбординг та модерацію профілю. Після активації доступна біржа заявок.",
          },
          {
            title: "Як працює оплата лідів?",
            description: "Оплата списується після успішного пробного заняття, якщо учень підтвердив співпрацю.",
          },
          {
            title: "Чи є підтримка?",
            description: "Так, у кабінеті є кнопка підтримки з переходом у Telegram бот.",
          },
        ].map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
                <Link href="/contacts">Звʼязатися з підтримкою</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
