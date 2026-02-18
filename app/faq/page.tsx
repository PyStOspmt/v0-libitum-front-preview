"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-white relative overflow-hidden">
      {/* Floating gradient orbs */}
      <div className="fixed top-20 -left-32 w-64 h-64 rounded-full bg-emerald-100/40 blur-3xl animate-orb pointer-events-none" />
      <div className="fixed top-40 -right-32 w-96 h-96 rounded-full bg-amber-100/30 blur-3xl animate-orb pointer-events-none" style={{ animationDelay: "1s" }} />
      <div className="fixed bottom-40 left-1/4 w-80 h-80 rounded-full bg-emerald-50/30 blur-3xl animate-orb pointer-events-none" style={{ animationDelay: "2s" }} />
      
      <div className="container mx-auto max-w-4xl space-y-8 px-6 py-10 relative z-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">FAQ</h1>
          <p className="text-slate-600">Відповіді на найчастіші запитання про Libitum.</p>
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
        ].map((item, index) => (
          <Card key={item.title} className={`bg-gradient-to-br ${
            index % 2 === 0 
              ? "from-white via-emerald-50/30 to-white hover:ring-1 hover:ring-emerald-200/50" 
              : "from-white via-amber-50/30 to-white hover:ring-1 hover:ring-amber-200/50"
          } transition-all duration-300`}>
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">{item.title}</CardTitle>
              <CardDescription className="text-slate-600">{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className={`${
                index % 2 === 0 
                  ? "bg-[linear-gradient(135deg,#00796b,#009688,#0f766e)] hover:brightness-110"
                  : "bg-[linear-gradient(135deg,#f59e0b,#f97316,#fb923c)] hover:brightness-110"
              } text-white border-transparent shadow-md transition-all duration-300`}>
                <Link href="/contacts">Звʼязатися з підтримкою</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
        </div>
      </div>
    </div>
  )
}
