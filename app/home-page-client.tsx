"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import {
  ArrowRight,
  Check,
  ChevronDown,
  Play,
  Star,
  Users,
  BookOpen,
  Shield,
  TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useTranslation } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function HomePageClient() {
  const { user } = useAuth()
  const { t } = useTranslation(user?.language || "UA")
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const specialistHref = user?.role === "client" ? "/client/requests/new" : "/specialists"

  const features = [
    { icon: <Shield className="h-5 w-5 text-emerald-600" />, title: t("features.verified.title"), color: "bg-emerald-50" },
    { icon: <Star className="h-5 w-5 text-amber-500" />, title: t("features.ratings.title"), color: "bg-amber-50" },
    { icon: <TrendingUp className="h-5 w-5 text-teal-600" />, title: t("features.progress.title"), color: "bg-teal-50" },
    { icon: <Users className="h-5 w-5 text-blue-600" />, title: "Групові заняття", color: "bg-blue-50" },
  ]

  const categories = [
    {
      title: t("categories.tutor.title"),
      desc: t("categories.tutor.desc"),
      stat: t("categories.tutor.stat"),
      color: "bg-emerald-500",
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      title: t("categories.psychologist.title"),
      desc: t("categories.psychologist.desc"),
      stat: t("categories.psychologist.stat"),
      color: "bg-violet-500",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: t("categories.speech.title"),
      desc: t("categories.speech.desc"),
      stat: t("categories.speech.stat"),
      color: "bg-amber-500",
      icon: <Star className="h-6 w-6" />,
    },
  ]

  const steps = [
    { num: "01", title: t("how.step1.title"), desc: t("how.step1.desc") },
    { num: "02", title: t("how.step2.title"), desc: t("how.step2.desc") },
    { num: "03", title: t("how.step3.title"), desc: t("how.step3.desc") },
  ]

  const pricing = [
    {
      lessons: "4 уроки",
      name: t("pricing.item1.title"),
      price: "990 ₴",
      desc: t("pricing.item1.desc"),
      features: ["4 заняття з репетитором", "Доступ до матеріалів", "Домашні завдання", "Підтримка вчителя"],
      highlight: false,
    },
    {
      lessons: "12 уроків",
      name: t("pricing.item2.title"),
      price: "2199 ₴",
      oldPrice: "2590 ₴",
      badge: "НАЙКРАЩА ПРОПОЗИЦІЯ",
      desc: t("pricing.item2.desc"),
      features: ["12 занять з репетитором", "Повний доступ до матеріалів", "Детальний фідбек", "Тести прогресу", "Персоналізовані сесії"],
      highlight: true,
    },
    {
      lessons: "24 уроки",
      name: t("pricing.item3.title"),
      price: "5199 ₴",
      desc: t("pricing.item3.desc"),
      features: ["24 заняття поглиблено", "Преміум матеріали", "Інтенсивні ДЗ з фідбеком", "Щомісячні звіти", "Підготовка до іспитів"],
      highlight: false,
    },
  ]

  const reviews = [
    { text: t("reviews.item1.text"), name: t("reviews.item1.name"), rating: 5 },
    { text: t("reviews.item2.text"), name: t("reviews.item2.name"), rating: 5 },
    { text: t("reviews.item3.text"), name: t("reviews.item3.name"), rating: 5 },
  ]

  const faqs = [
    { q: t("faq.q1.q"), a: t("faq.q1.a") },
    { q: t("faq.q2.q"), a: t("faq.q2.a") },
    { q: t("faq.q3.q"), a: t("faq.q3.a") },
    { q: t("faq.q4.q"), a: t("faq.q4.a") },
  ]

  return (
    <div className="min-h-screen bg-emerald-50/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-9 w-9 overflow-hidden rounded-xl">
                <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
              </div>
              <span className="text-lg font-bold text-slate-900">LIBITUM</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href={specialistHref} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                {t("nav.specialists")}
              </Link>
              <Link href="#how" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                {t("nav.how_it_works")}
              </Link>
              <Link href="#reviews" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                {t("nav.reviews")}
              </Link>
              <LanguageSwitcher />
            </nav>

            <div className="flex items-center gap-3">
              {user ? (
                <Link href={user.role === "specialist" ? "/tutor" : user.role === "admin" ? "/admin" : "/client"}>
                  <Button className="h-9 rounded-full bg-emerald-600 px-5 text-sm font-medium text-white hover:bg-emerald-700">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" className="h-9 rounded-full px-5 text-sm font-medium border-slate-300">
                      {t("btn.login")}
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="h-9 rounded-full bg-emerald-600 px-5 text-sm font-medium text-white hover:bg-emerald-700">
                      {t("btn.register")}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-8 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className="relative bg-white rounded-[2rem] p-8 lg:p-12 overflow-hidden">
              {/* Decorative shapes */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-amber-100 rounded-full translate-y-1/2" />
              <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-teal-100 rounded-full" />
              
              <svg className="absolute right-20 top-20 w-64 h-64 text-emerald-100/80" viewBox="0 0 200 200">
                <path fill="currentColor" d="M45.3,-51.2C58.3,-40.9,68.1,-25.5,71.2,-8.5C74.3,8.5,70.6,27.1,60.1,40.3C49.6,53.5,32.3,61.3,14.1,66.1C-4.1,70.9,-23.2,72.7,-39.7,66.1C-56.2,59.5,-70.1,44.5,-75.4,27C-80.7,9.5,-77.4,-10.5,-68.4,-26.3C-59.4,-42.1,-44.7,-53.7,-29.5,-63.2C-14.3,-72.7,1.4,-80.1,15.7,-77.3C30,-74.5,32.3,-61.5,45.3,-51.2Z" transform="translate(100 100)" />
              </svg>

              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                    {t("hero.tagline")}
                  </div>

                  <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-[1.1] font-heading">
                    {t("hero.title")}
                  </h1>

                  <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
                    {t("hero.subtitle")}
                  </p>

                  <Link href={specialistHref}>
                    <Button className="h-14 rounded-full bg-emerald-600 pl-8 pr-6 text-base font-semibold text-white hover:bg-emerald-700 gap-3 mb-10">
                      {t("hero.cta")}
                      <span className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    </Button>
                  </Link>

                  <div className="grid grid-cols-2 gap-4">
                    {features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-xl ${feature.color} flex items-center justify-center`}>
                          {feature.icon}
                        </div>
                        <span className="text-sm font-medium text-slate-700">{feature.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="relative h-[400px] hidden lg:block">
                  <div className="absolute top-0 right-0 bg-white rounded-2xl shadow-lg p-4 w-56">
                    <div className="relative h-32 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-xl mb-3 overflow-hidden">
                      <div className="absolute bottom-2 left-2 bg-emerald-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Play className="h-3 w-3 fill-white" />
                      </div>
                    </div>
                    <div className="font-semibold text-slate-900">Олена Коваленко</div>
                    <div className="text-xs text-slate-500">Репетитор англійської</div>
                  </div>

                  <div className="absolute top-24 left-0 bg-white rounded-2xl shadow-lg p-4 w-52">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="relative h-14 w-14 bg-gradient-to-br from-amber-200 to-orange-200 rounded-xl overflow-hidden flex items-center justify-center">
                        <Play className="h-4 w-4 text-amber-700" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">Марія Шевченко</div>
                        <div className="text-xs text-slate-500">Психолог</div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs text-slate-600">4.9</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 right-8 bg-white rounded-2xl shadow-lg p-4 w-48">
                    <div className="relative h-24 bg-gradient-to-br from-violet-200 to-purple-200 rounded-xl mb-3 overflow-hidden flex items-center justify-center">
                      <Play className="h-5 w-5 text-violet-700" />
                    </div>
                    <div className="font-semibold text-slate-900 text-sm">Андрій Петренко</div>
                    <div className="text-xs text-slate-500">Логопед</div>
                  </div>

                  {/* Stats badge */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg px-5 py-3">
                    <div className="text-2xl font-bold text-emerald-600">500+</div>
                    <div className="text-xs text-slate-500">спеціалістів</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-emerald-600 mb-3 uppercase tracking-wide">{t("about.label")}</p>
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 font-heading mb-4">
                Категорії спеціалістів
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">{t("specialists.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {categories.map((cat, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className={`h-12 w-12 ${cat.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{cat.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{cat.desc}</p>
                  <div className="text-xs font-semibold text-emerald-600">{cat.stat}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="py-16 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className="bg-white rounded-[2rem] p-8 lg:p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 font-heading mb-4">
                  {t("nav.how_it_works")}
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto">{t("how.subtitle")}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, i) => (
                  <div key={i} className="text-center">
                    <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-emerald-600">{step.num}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 text-sm">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-10">
                <Link href={specialistHref}>
                  <Button className="h-12 rounded-full bg-emerald-600 px-8 text-base font-semibold text-white hover:bg-emerald-700">
                    {t("hero.cta")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="plans" className="py-16 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 font-heading mb-4">
                Обери свій план
              </h2>
              <p className="text-slate-600">{t("pricing.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pricing.map((plan, i) => (
                <div 
                  key={i} 
                  className={`relative rounded-3xl p-6 ${
                    plan.highlight 
                      ? "bg-emerald-600 text-white" 
                      : "bg-white border border-slate-200"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-6 bg-lime-400 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full">
                      {plan.badge}
                    </div>
                  )}

                  <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 ${
                    plan.highlight ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-700"
                  }`}>
                    {plan.lessons}
                  </div>

                  <h3 className={`text-lg font-bold mb-2 ${plan.highlight ? "text-white" : "text-emerald-700"}`}>
                    {plan.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-6">
                    {plan.oldPrice && (
                      <span className={`text-sm line-through ${plan.highlight ? "text-white/60" : "text-slate-400"}`}>
                        {plan.oldPrice}
                      </span>
                    )}
                    <span className={`text-3xl font-bold ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                      {plan.price}
                    </span>
                  </div>

                  <Button className={`w-full h-11 rounded-full font-semibold mb-6 ${
                    plan.highlight 
                      ? "bg-white text-emerald-700 hover:bg-white/90" 
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}>
                    Обрати
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                          plan.highlight ? "text-lime-300" : "text-emerald-600"
                        }`} />
                        <span className={`text-sm ${plan.highlight ? "text-white/90" : "text-slate-600"}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="py-16 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 font-heading mb-4">
                {t("nav.reviews")}
              </h2>
              <p className="text-slate-600">{t("reviews.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((review, i) => (
                <div key={i} className="bg-white rounded-2xl p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-4">{'"'}{review.text}{'"'}</p>
                  <div className="text-sm font-semibold text-slate-900">{review.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 lg:px-8">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 font-heading mb-4">
                Часті запитання
              </h2>
              <p className="text-slate-600">{t("faq.subtitle")}</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left"
                  >
                    <span className="font-semibold text-slate-900">{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4 text-slate-600">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className="bg-emerald-600 rounded-[2rem] p-8 lg:p-12 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-heading">
                {t("cta.title")}
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                {t("cta.subtitle")}
              </p>
              <Link href={specialistHref}>
                <Button className="h-14 rounded-full bg-white px-8 text-base font-semibold text-emerald-700 hover:bg-white/90">
                  {t("cta.button")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 lg:px-8 rounded-t-[2rem]">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="relative h-9 w-9 overflow-hidden rounded-xl">
                  <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
                </div>
                <span className="text-lg font-bold">LIBITUM</span>
              </Link>
              <p className="text-slate-400 text-sm">{t("about.desc")}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t("contact.title")}</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p>{t("contact.email")}</p>
                <p>{t("contact.telegram")}</p>
                <p>{t("contact.hours")}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t("rules.title")}</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p>{t("rules.item1")}</p>
                <p>{t("rules.item2")}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Навігація</h4>
              <div className="space-y-2 text-sm">
                <Link href={specialistHref} className="block text-slate-400 hover:text-white">{t("nav.specialists")}</Link>
                <Link href="#how" className="block text-slate-400 hover:text-white">{t("nav.how_it_works")}</Link>
                <Link href="#reviews" className="block text-slate-400 hover:text-white">{t("nav.reviews")}</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            © 2024 Libitum Education. {t("footer.rights")}
          </div>
        </div>
      </footer>
    </div>
  )
}
