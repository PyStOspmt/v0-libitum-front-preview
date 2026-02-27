export const dynamic = "force-dynamic"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Правила | Libitum",
  description: "Правила взаємодії на платформі Libitum.",
}

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-white relative overflow-hidden">
      <div className="fixed top-20 -left-32 w-64 h-64 rounded-full bg-emerald-100/40 blur-3xl animate-orb pointer-events-none" />
      <div className="fixed top-40 -right-32 w-96 h-96 rounded-full bg-amber-100/30 blur-3xl animate-orb pointer-events-none" style={{ animationDelay: "1s" }} />
      <div className="fixed bottom-40 left-1/4 w-80 h-80 rounded-full bg-emerald-50/30 blur-3xl animate-orb pointer-events-none" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto max-w-4xl space-y-8 px-6 py-10 relative z-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Правила платформи</h1>
          <p className="text-slate-600">Короткий виклад правил взаємодії в Libitum.</p>
        </div>

        <div className="grid gap-4">
          {rulesSections.map((section, index) => (
            <Card
              key={section.title}
              className={`bg-gradient-to-br ${index % 2 === 0
                  ? "from-white via-emerald-50/30 to-white hover:ring-1 hover:ring-emerald-200/50"
                  : "from-white via-amber-50/30 to-white hover:ring-1 hover:ring-amber-200/50"
                } transition-all duration-300`}
            >
              <CardHeader>
                <CardTitle className="text-lg text-slate-900">{section.title}</CardTitle>
                <CardDescription className="text-slate-600">{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  className={`${index % 2 === 0
                      ? "bg-[linear-gradient(135deg,#00796b,#009688,#0f766e)] hover:brightness-110"
                      : "bg-[linear-gradient(135deg,#f59e0b,#f97316,#fb923c)] hover:brightness-110"
                    } text-white border-transparent shadow-md transition-all duration-300`}
                >
                  <Link href="/contacts">Поставити запитання</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
