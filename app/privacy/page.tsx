"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
    <div className="container mx-auto max-w-4xl space-y-8 px-6 py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Політика конфіденційності</h1>
        <p className="text-muted-foreground">Ми дотримуємось вимог щодо захисту персональних даних.</p>
      </div>

      <div className="grid gap-4">
        {privacyBlocks.map((block) => (
          <Card key={block.title}>
            <CardHeader>
              <CardTitle className="text-lg">{block.title}</CardTitle>
              <CardDescription>{block.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              В разі питань звертайтесь до служби підтримки.
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
