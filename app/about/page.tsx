"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const values = [
  {
    title: "Якість навчання",
    description: "Система відбору та рейтингів допомагає швидко знаходити найкращих спеціалістів.",
  },
  {
    title: "Прозорість",
    description: "Клієнти бачать повну інформацію про досвід і результати репетиторів.",
  },
  {
    title: "Комфорт",
    description: "Вся комунікація, розклад і матеріали доступні в одному кабінеті.",
  },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-6 py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Про Libitum</h1>
        <p className="text-muted-foreground">
          Libitum — платформа, що поєднує маркетплейс репетиторів і CRM для управління навчальним процесом.
        </p>
      </div>

      <div className="grid gap-4">
        {values.map((value) => (
          <Card key={value.title}>
            <CardHeader>
              <CardTitle className="text-lg">{value.title}</CardTitle>
              <CardDescription>{value.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
                <Link href="/catalog">Перейти в каталог</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
