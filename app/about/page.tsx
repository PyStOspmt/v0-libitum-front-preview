"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Award, Shield, Star, ArrowRight } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "База знань",
    description: "Тисячі перевірених спеціалістів з детальними профілями, відгуками та реальними результатами.",
    link: "/specialists",
    linkText: "Знайти спеціаліста"
  },
  {
    icon: Users,
    title: "Безпечні платежі",
    description: "Захищені транзакції та можливість оплати лише після підтвердження заняття.",
    link: "/register",
    linkText: "Створити кабінет"
  },
  {
    icon: Award,
    title: "Система рейтингів",
    description: "Об'єктивні оцінки від реальних клієнтів допомагають обрати найкращого викладача.",
    link: "/specialists",
    linkText: "Переглянути рейтинги"
  },
  {
    icon: Shield,
    title: "Верифікація",
    description: "Усі спеціалісти проходять перевірку документів та кваліфікації.",
    link: "/specialists?verified=true",
    linkText: "Верифіковані спеціалісти"
  }
]

const stats = [
  { label: "Спеціалістів", value: "500+" },
  { label: "Учнів", value: "10,000+" },
  { label: "Занять проведено", value: "50,000+" },
  { label: "Задоволених клієнтів", value: "98%" }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-white relative overflow-hidden">
      {/* Floating gradient orbs */}
      <div className="fixed top-20 -left-32 w-64 h-64 rounded-full bg-emerald-100/40 blur-3xl animate-orb pointer-events-none" />
      <div className="fixed top-40 -right-32 w-96 h-96 rounded-full bg-amber-100/30 blur-3xl animate-orb pointer-events-none" style={{ animationDelay: "1s" }} />
      <div className="fixed bottom-40 left-1/4 w-80 h-80 rounded-full bg-emerald-50/30 blur-3xl animate-orb pointer-events-none" style={{ animationDelay: "2s" }} />
      
      <div className="container mx-auto max-w-6xl space-y-12 px-6 py-10 relative z-10">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Про <span className="text-emerald-600">Libitum</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Сучасна платформа, що поєднує найкращих репетиторів, психологів та логопедів з учнями по всій Україні. 
            Ми гарантуємо якість, безпеку та зручність для всіх учасників навчального процесу.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600">{stat.value}</div>
                <div className="text-sm text-slate-600 mt-1">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Чому обирають Libitum?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Ми створили платформу, яка вирішує реальні проблеми учнів та спеціалістів
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={feature.title} className={`group hover:shadow-lg transition-all duration-300 bg-gradient-to-br ${
                index % 2 === 0 
                  ? "from-white via-emerald-50/30 to-white hover:ring-1 hover:ring-emerald-200/50" 
                  : "from-white via-amber-50/30 to-white hover:ring-1 hover:ring-amber-200/50"
              }`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      index % 2 === 0 
                        ? "bg-emerald-100 text-emerald-600" 
                        : "bg-amber-100 text-amber-600"
                    }`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className={`${
                    index % 2 === 0 
                      ? "bg-[linear-gradient(135deg,#00796b,#009688,#0f766e)] hover:brightness-110"
                      : "bg-[linear-gradient(135deg,#f59e0b,#f97316,#fb923c)] hover:brightness-110"
                  } text-white border-transparent shadow-md transition-all duration-300`}>
                    <Link href={feature.link} className="inline-flex items-center gap-2">
                      {feature.linkText}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-xl border border-slate-100">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">
            Готові почати навчання?
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto text-lg">
            Приєднуйтесь до тисяч задоволених клієнтів та знайдіть ідеального спеціаліста для ваших цілей
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/specialists">Знайти спеціаліста</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/register">Створити кабінет</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
