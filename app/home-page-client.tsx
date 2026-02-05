"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronDown,
  MessageSquare,
  Search,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { useTranslation } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function HomePageClient() {
  const { user } = useAuth()
  const { t } = useTranslation(user?.language || "UA")
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const specialistHref = user?.role === "client" ? "/client/requests/new" : "/specialists"

  const categories = [
    {
      icon: BookOpen,
      title: t("categories.tutor.title"),
      description: t("categories.tutor.desc"),
      stat: t("categories.tutor.stat"),
      color: "emerald" as const,
      href: "/specialists/tutors",
    },
    {
      icon: Brain,
      title: t("categories.psychologist.title"),
      description: t("categories.psychologist.desc"),
      stat: t("categories.psychologist.stat"),
      color: "orange" as const,
      href: "/specialists/psychologists",
    },
    {
      icon: MessageSquare,
      title: t("categories.speech.title"),
      description: t("categories.speech.desc"),
      stat: t("categories.speech.stat"),
      color: "emerald" as const,
      href: "/specialists/speech-therapists",
    },
  ]

  const steps = [
    { num: "01", title: t("how.step1.title"), desc: t("how.step1.desc") },
    { num: "02", title: t("how.step2.title"), desc: t("how.step2.desc") },
    { num: "03", title: t("how.step3.title"), desc: t("how.step3.desc") },
  ]

  const features = [
    { icon: Shield, title: t("features.verified.title"), desc: t("features.verified.desc") },
    { icon: Star, title: t("features.ratings.title"), desc: t("features.ratings.desc") },
    { icon: TrendingUp, title: t("features.progress.title"), desc: t("features.progress.desc") },
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-emerald-100/60 via-emerald-50/40 to-transparent blur-3xl animate-pulse-soft" />
        <div className="absolute top-1/3 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-orange-100/50 via-orange-50/30 to-transparent blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-emerald-50/40 to-transparent blur-3xl animate-pulse-soft" style={{ animationDelay: "4s" }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-slate-200/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-12 w-12 overflow-hidden rounded-2xl shadow-lg shadow-emerald-200/50 ring-1 ring-slate-200/50 transition-transform group-hover:scale-105">
                <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Libitum
                </span>
                <p className="text-xs font-medium text-slate-500">Education</p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href={specialistHref} className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
                {t("nav.specialists")}
              </Link>
              <Link href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
                {t("nav.how_it_works")}
              </Link>
              <Link href="#reviews" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
                {t("nav.reviews")}
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              {user ? (
                <Link href={user.role === "specialist" ? "/tutor" : user.role === "admin" ? "/admin" : "/client"}>
                  <Button className="h-11 rounded-2xl bg-emerald-600 px-6 font-semibold text-white shadow-lg shadow-emerald-200/50 hover:bg-emerald-700 transition-all">
                    Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" className="h-11 rounded-2xl px-5 font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50/50">
                      {t("btn.login")}
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="h-11 rounded-2xl bg-emerald-600 px-6 font-semibold text-white shadow-lg shadow-emerald-200/50 hover:bg-emerald-700 transition-all">
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
        {/* Hero */}
        <section className="relative py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/50 px-4 py-2 mb-8 animate-fade-in-up">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">{t("hero.tagline")}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 animate-fade-in-up font-heading" style={{ animationDelay: "0.1s" }}>
                {t("hero.title")}
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                {t("hero.subtitle")}
              </p>

              <div className="glass-card rounded-3xl p-3 max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <Input
                      placeholder="Англійська мова, математика, психологія..."
                      className="h-14 pl-12 rounded-2xl border-0 bg-slate-50/80 text-base focus-visible:ring-2 focus-visible:ring-emerald-500/30"
                    />
                  </div>
                  <Link href={specialistHref}>
                    <Button className="h-14 w-full sm:w-auto rounded-2xl bg-emerald-600 px-8 text-base font-semibold text-white shadow-lg shadow-emerald-200/50 hover:bg-emerald-700 transition-all">
                      {t("hero.cta")}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span>500+ спеціалістів</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span>Перевірені профілі</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span>Безкоштовний підбір</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 rounded-full bg-emerald-50 text-emerald-700 border-emerald-200/50 px-4 py-1.5 text-sm font-semibold">
                Категорії
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-heading">
                {t("nav.specialists")}
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                {t("specialists.subtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {categories.map((cat, i) => (
                <Link href={cat.href} key={cat.title}>
                  <div
                    className={`group relative h-full rounded-3xl p-8 transition-all hover-lift cursor-pointer ${
                      cat.color === "emerald"
                        ? "bg-gradient-to-br from-emerald-50 to-teal-50/50"
                        : "bg-gradient-to-br from-orange-50 to-amber-50/50"
                    } hover:shadow-xl`}
                  >
                    <div
                      className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl mb-6 ${
                        cat.color === "emerald" ? "bg-emerald-100 text-emerald-600" : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      <cat.icon className="h-8 w-8" />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3">{cat.title}</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">{cat.description}</p>

                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-semibold ${cat.color === "emerald" ? "text-emerald-600" : "text-orange-600"}`}>
                        {cat.stat}
                      </span>
                      <ArrowRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${cat.color === "emerald" ? "text-emerald-600" : "text-orange-600"}`} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" className="py-20 lg:py-28 bg-slate-50/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 rounded-full bg-orange-50 text-orange-700 border-orange-200/50 px-4 py-1.5 text-sm font-semibold">
                Як це працює
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-heading">
                {t("nav.how_it_works")}
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                {t("how.subtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {steps.map((step, i) => (
                <div key={step.num} className="relative text-center">
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-emerald-300 to-emerald-100" />
                  )}
                  <div className="relative inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-lg shadow-emerald-100/50 mb-6">
                    <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <Badge className="mb-4 rounded-full bg-emerald-50 text-emerald-700 border-emerald-200/50 px-4 py-1.5 text-sm font-semibold">
                  Чому ми
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 font-heading">
                  Ваш успіх — наш пріоритет
                </h2>
                <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                  {t("hero.extra")}
                </p>

                <div className="space-y-6">
                  {features.map((feature) => (
                    <div key={feature.title} className="flex gap-4">
                      <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">{feature.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="glass-card rounded-3xl p-8 lg:p-10">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50">
                      <div className="text-4xl font-bold text-emerald-600 mb-2">500+</div>
                      <div className="text-sm text-slate-600 font-medium">Спеціалістів</div>
                    </div>
                    <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50">
                      <div className="text-4xl font-bold text-orange-600 mb-2">10K+</div>
                      <div className="text-sm text-slate-600 font-medium">Учнів</div>
                    </div>
                    <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100">
                      <div className="text-4xl font-bold text-slate-700 mb-2">4.9</div>
                      <div className="text-sm text-slate-600 font-medium">Рейтинг</div>
                    </div>
                    <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50">
                      <div className="text-4xl font-bold text-emerald-600 mb-2">95%</div>
                      <div className="text-sm text-slate-600 font-medium">Задоволених</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 h-24 w-24 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-400 opacity-20 blur-2xl animate-float-slow" />
                <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-400 opacity-20 blur-2xl animate-float-slower" />
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="py-20 lg:py-28 bg-slate-50/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 rounded-full bg-emerald-50 text-emerald-700 border-emerald-200/50 px-4 py-1.5 text-sm font-semibold">
                Відгуки
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-heading">
                {t("nav.reviews")}
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                {t("reviews.subtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {reviews.map((review, i) => (
                <div key={i} className="glass-card rounded-3xl p-8 hover-lift">
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-6 leading-relaxed text-lg">"{review.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center text-white font-semibold text-sm">
                      {review.name.charAt(0)}
                    </div>
                    <span className="font-medium text-slate-900">{review.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 rounded-full bg-orange-50 text-orange-700 border-orange-200/50 px-4 py-1.5 text-sm font-semibold">
                  FAQ
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-heading">
                  Часті питання
                </h2>
                <p className="text-lg text-slate-500">{t("faq.subtitle")}</p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="glass-card rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                      <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform flex-shrink-0 ${openFaq === i ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-6">
                        <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 p-12 lg:p-20 text-center">
              <div className="absolute top-0 left-0 w-full h-full opacity-20">
                <div className="absolute top-10 left-10 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
                <div className="absolute bottom-10 right-10 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-heading">
                  {t("cta.title")}
                </h2>
                <p className="text-lg text-emerald-100 mb-8 max-w-xl mx-auto">
                  {t("cta.subtitle")}
                </p>
                <Link href={specialistHref}>
                  <Button className="h-14 rounded-2xl bg-white px-10 text-base font-semibold text-emerald-600 shadow-lg hover:bg-emerald-50 transition-all">
                    {t("cta.button")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/50 bg-white/50 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl">
                <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
              </div>
              <span className="font-bold text-slate-900">Libitum Education</span>
            </div>
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Libitum. {t("footer.rights")}
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors">
                Політика конфіденційності
              </Link>
              <Link href="/terms" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors">
                Умови використання
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
