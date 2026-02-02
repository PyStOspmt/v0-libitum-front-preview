"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const rulesSections = [
  {
    title: "Загальні принципи",
    description:
      "Libitum — платформа для безпечної взаємодії між клієнтами та спеціалістами. Ми очікуємо повагу, прозорість та дотримання домовленостей.",
  },
  {
    title: "Правила для клієнтів",
    description:
      "Вчасно підтверджуйте заняття, залишайте коректні дані та реагуйте на запити репетитора протягом SLA.",
  },
  {
    title: "Правила для репетиторів",
    description:
      "Після отримання ліда треба звʼязатися з клієнтом та зафіксувати дату пробного уроку в системі.",
  },
  {
    title: "Політика оплати",
    description:
      "Оплата лідів здійснюється після успішного пробного заняття. Детальні правила описані у фінансових умовах платформи.",
  },
]

export default function RulesPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-6 py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Правила платформи</h1>
        <p className="text-muted-foreground">Короткий виклад правил взаємодії в Libitum.</p>
      </div>

      <div className="grid gap-4">
        {rulesSections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle className="text-lg">{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
                <Link href="/contacts">Поставити запитання</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
