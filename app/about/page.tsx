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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto max-w-6xl space-y-12 px-6 py-10">
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
            {features.map((feature) => (
              <Card key={feature.title} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="group-hover:bg-emerald-600 transition-colors">
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
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Готові почати навчання?
          </h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto text-lg">
            Приєднуйтесь до тисяч задоволених клієнтів та знайдіть ідеального спеціаліста для ваших цілей
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/specialists">Знайти спеціаліста</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600" asChild>
              <Link href="/register">Створити кабінет</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
