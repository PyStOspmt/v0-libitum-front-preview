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
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 border-b border-slate-100/80">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-18 items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl">
                <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
              </div>
              <span className="text-lg font-bold text-slate-800">LIBITUM</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-10">
              <Link href={specialistHref} className="text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors">
                {t("nav.specialists")}
              </Link>
              <Link href="#how" className="text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors">
                {t("nav.how_it_works")}
              </Link>
              <Link href="#reviews" className="text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors">
                {t("nav.reviews")}
              </Link>
              <LanguageSwitcher />
            </nav>

            <div className="flex items-center gap-3">
              {user ? (
                <Link href={user.role === "specialist" ? "/tutor" : user.role === "admin" ? "/admin" : "/client"}>
                  <Button className="h-10 rounded-full bg-[#43a047] px-6 text-sm font-medium text-white hover:bg-[#388e3c]">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" className="h-10 rounded-full px-6 text-sm font-medium border-slate-200 text-slate-700 hover:bg-slate-50">
                      {t("btn.login")}
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="h-10 rounded-full bg-[#43a047] px-6 text-sm font-medium text-white hover:bg-[#388e3c]">
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
            <div className="relative bg-white rounded-[2.5rem] p-10 lg:p-16 overflow-hidden border border-slate-100/80">
              {/* Decorative shapes - soft sage green tones */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#e8f5e9] rounded-full translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-1/4 w-56 h-56 bg-[#f1f8e9] rounded-full translate-y-1/2" />
              <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-[#e0f2f1] rounded-full" />
              
              <svg className="absolute right-16 top-16 w-80 h-80 text-[#c8e6c9]/60" viewBox="0 0 200 200">
                <path fill="currentColor" d="M45.3,-51.2C58.3,-40.9,68.1,-25.5,71.2,-8.5C74.3,8.5,70.6,27.1,60.1,40.3C49.6,53.5,32.3,61.3,14.1,66.1C-4.1,70.9,-23.2,72.7,-39.7,66.1C-56.2,59.5,-70.1,44.5,-75.4,27C-80.7,9.5,-77.4,-10.5,-68.4,-26.3C-59.4,-42.1,-44.7,-53.7,-29.5,-63.2C-14.3,-72.7,1.4,-80.1,15.7,-77.3C30,-74.5,32.3,-61.5,45.3,-51.2Z" transform="translate(100 100)" />
              </svg>

              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#e8f5e9] text-[#2e7d32] px-5 py-2.5 rounded-full text-sm font-medium mb-8">
                    <Star className="h-4 w-4 fill-[#66bb6a] text-[#66bb6a]" />
                    {t("hero.tagline")}
                  </div>

                  <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 mb-8 leading-[1.1] font-heading tracking-tight">
                    {t("hero.title")}
                  </h1>

                  <p className="text-lg text-slate-500 mb-10 max-w-lg leading-relaxed">
                    {t("hero.subtitle")}
                  </p>

                  <Link href={specialistHref}>
                    <Button className="h-14 rounded-full bg-[#43a047] pl-8 pr-6 text-base font-semibold text-white hover:bg-[#388e3c] gap-3 mb-12 shadow-sm">
                      {t("hero.cta")}
                      <span className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    </Button>
                  </Link>

                  <div className="grid grid-cols-2 gap-5">
                    {features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`h-11 w-11 rounded-2xl ${feature.color} flex items-center justify-center`}>
                          {feature.icon}
                        </div>
                        <span className="text-sm font-medium text-slate-600">{feature.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating Cards - magazine style */}
                <div className="relative h-[420px] hidden lg:block">
                  <div className="absolute top-0 right-0 bg-white rounded-3xl p-5 w-60 border border-slate-100/80 shadow-sm">
                    <div className="relative h-36 bg-[#c8e6c9] rounded-2xl mb-4 overflow-hidden">
                      <div className="absolute bottom-3 left-3 bg-[#43a047] text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 font-medium">
                        <Play className="h-3 w-3 fill-white" />
                        Відео
                      </div>
                    </div>
                    <div className="font-bold text-slate-800">Олена Коваленко</div>
                    <div className="text-sm text-slate-500 mt-0.5">Репетитор англійської</div>
                  </div>

                  <div className="absolute top-28 left-0 bg-white rounded-3xl p-5 w-56 border border-slate-100/80 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 bg-[#fff8e1] rounded-2xl overflow-hidden flex items-center justify-center">
                        <Play className="h-5 w-5 text-[#f9a825]" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">Марія Шевченко</div>
                        <div className="text-sm text-slate-500">Психолог</div>
                        <div className="flex items-center gap-1 mt-1.5">
                          <Star className="h-3.5 w-3.5 fill-[#ffc107] text-[#ffc107]" />
                          <span className="text-sm text-slate-600 font-medium">4.9</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-12 bg-white rounded-3xl p-5 w-52 border border-slate-100/80 shadow-sm">
                    <div className="relative h-28 bg-[#e8eaf6] rounded-2xl mb-4 overflow-hidden flex items-center justify-center">
                      <Play className="h-6 w-6 text-[#5c6bc0]" />
                    </div>
                    <div className="font-bold text-slate-800">Андрій Петренко</div>
                    <div className="text-sm text-slate-500 mt-0.5">Логопед</div>
                  </div>

                  {/* Stats badge */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-6 py-4 border border-slate-100/80 shadow-sm">
                    <div className="text-3xl font-bold text-[#43a047]">500+</div>
                    <div className="text-sm text-slate-500">спеціалістів</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-medium text-[#66bb6a] mb-4 uppercase tracking-wider">{t("about.label")}</p>
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 font-heading mb-5 tracking-tight">
                Категорії спеціалістів
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg">{t("specialists.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {categories.map((cat, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100/80 hover:shadow-md transition-shadow">
                  <div className={`h-14 w-14 ${cat.color} rounded-2xl flex items-center justify-center text-white mb-5`}>
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{cat.title}</h3>
                  <p className="text-slate-500 text-sm mb-5 leading-relaxed">{cat.desc}</p>
                  <div className="text-sm font-semibold text-[#43a047]">{cat.stat}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="py-20 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className="bg-white rounded-[2.5rem] p-10 lg:p-16 border border-slate-100/80">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 font-heading mb-5 tracking-tight">
                  {t("nav.how_it_works")}
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg">{t("how.subtitle")}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                {steps.map((step, i) => (
                  <div key={i} className="text-center">
                    <div className="h-20 w-20 rounded-full bg-[#e8f5e9] flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl font-bold text-[#43a047]">{step.num}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">{step.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-14">
                <Link href={specialistHref}>
                  <Button className="h-14 rounded-full bg-[#43a047] px-10 text-base font-semibold text-white hover:bg-[#388e3c] shadow-sm">
                    {t("hero.cta")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="plans" className="py-20 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 font-heading mb-5 tracking-tight">
                Обери свій план
              </h2>
              <p className="text-slate-500 text-lg">{t("pricing.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricing.map((plan, i) => (
                <div 
                  key={i} 
                  className={`relative rounded-3xl p-8 ${
                    plan.highlight 
                      ? "bg-[#43a047] text-white" 
                      : "bg-white border border-slate-100/80"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-6 bg-[#c5e1a5] text-[#33691e] text-xs font-bold px-4 py-1.5 rounded-full">
                      {plan.badge}
                    </div>
                  )}

                  <div className={`inline-block px-5 py-2 rounded-full text-xs font-bold mb-5 ${
                    plan.highlight ? "bg-white/20 text-white" : "bg-[#e8f5e9] text-[#2e7d32]"
                  }`}>
                    {plan.lessons}
                  </div>

                  <h3 className={`text-lg font-bold mb-3 ${plan.highlight ? "text-white" : "text-[#2e7d32]"}`}>
                    {plan.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-8">
                    {plan.oldPrice && (
                      <span className={`text-sm line-through ${plan.highlight ? "text-white/60" : "text-slate-400"}`}>
                        {plan.oldPrice}
                      </span>
                    )}
                    <span className={`text-3xl font-bold ${plan.highlight ? "text-white" : "text-slate-800"}`}>
                      {plan.price}
                    </span>
                  </div>

                  <Button className={`w-full h-12 rounded-full font-semibold mb-8 ${
                    plan.highlight 
                      ? "bg-white text-[#2e7d32] hover:bg-white/90" 
                      : "bg-[#43a047] text-white hover:bg-[#388e3c]"
                  }`}>
                    Обрати
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="space-y-4">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                          plan.highlight ? "text-[#c5e1a5]" : "text-[#43a047]"
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
