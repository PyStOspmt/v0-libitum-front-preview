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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-8 pt-4">
        <div className="container mx-auto">
          <div className="flex h-16 items-center justify-between bg-white/80 backdrop-blur-xl rounded-2xl px-6 shadow-lg shadow-slate-900/5 border border-slate-100">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl shadow-md ring-1 ring-slate-200/50 transition-transform group-hover:scale-105">
                <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900">Libitum</span>
                <p className="text-[10px] font-medium text-slate-500">Education</p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 rounded-xl p-1">
              <Link href={specialistHref} className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white px-4 py-2 rounded-lg transition-all">
                {t("nav.specialists")}
              </Link>
              <Link href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white px-4 py-2 rounded-lg transition-all">
                {t("nav.how_it_works")}
              </Link>
              <Link href="#reviews" className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white px-4 py-2 rounded-lg transition-all">
                {t("nav.reviews")}
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              {user ? (
                <Link href={user.role === "specialist" ? "/tutor" : user.role === "admin" ? "/admin" : "/client"}>
                  <Button className="h-10 rounded-xl bg-emerald-600 px-5 font-medium text-white hover:bg-emerald-700 transition-all">
                    Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" className="h-10 rounded-xl px-4 font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                      {t("btn.login")}
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="h-10 rounded-xl bg-emerald-600 px-5 font-semibold text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/25">
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
        <section className="relative pt-28 pb-16 px-4 lg:px-8">
          <div className="container mx-auto">
            {/* Banner Card */}
            <div className="relative rounded-[2.5rem] overflow-hidden" style={{
              background: "linear-gradient(135deg, #059669 0%, #047857 40%, #065f46 70%, #0d9488 100%)"
            }}>
              {/* Decorative blobs */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/30 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-300/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
              <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-emerald-300/20 rounded-full blur-2xl" />
              
              {/* Decorative shapes */}
              <div className="absolute top-20 right-20 w-20 h-20 bg-lime-400/40 rounded-full animate-float-slow" />
              <div className="absolute bottom-32 left-16 w-12 h-12 bg-white/20 rounded-full animate-float-slower" />
              <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-orange-400/50 rounded-full animate-float-slow" style={{ animationDelay: "1s" }} />

              <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center min-h-[600px] p-8 lg:p-16">
                {/* Left Content */}
                <div className="text-white">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-2 mb-8">
                    <Sparkles className="h-4 w-4 text-lime-300" />
                    <span className="text-sm font-semibold">{t("hero.tagline")}</span>
                  </div>

                  <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight mb-8 font-heading leading-[0.95]">
                    <span className="relative">
                      {t("hero.title").split(" ").slice(0, 2).join(" ")}
                      <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 200 12" fill="none">
                        <path d="M2 10C50 2 150 2 198 10" stroke="#bef264" strokeWidth="4" strokeLinecap="round"/>
                      </svg>
                    </span>
                    <br />
                    {t("hero.title").split(" ").slice(2).join(" ")}
                  </h1>

                  <p className="text-xl lg:text-2xl text-white/80 mb-10 max-w-lg leading-relaxed font-light">
                    {t("hero.subtitle")}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-10">
                    <Link href={specialistHref}>
                      <Button className="h-14 rounded-full bg-lime-400 px-8 text-base font-semibold text-emerald-900 hover:bg-lime-300 transition-all shadow-lg shadow-lime-400/30">
                        {t("hero.cta")}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>

                  <div className="flex flex-wrap gap-6 text-sm text-white/70">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                        <CheckCircle2 className="h-3.5 w-3.5 text-lime-300" />
                      </div>
                      <span>500+ спеціалістів</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                        <CheckCircle2 className="h-3.5 w-3.5 text-lime-300" />
                      </div>
                      <span>Перевірені профілі</span>
                    </div>
                  </div>
                </div>

                {/* Right Content - Stats Card */}
                <div className="relative hidden lg:block">
                  {/* Main Stats Card */}
                  <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl shadow-slate-900/20 w-72 animate-fade-in-up">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-5xl font-bold text-slate-900">489<span className="text-emerald-500">+</span></div>
                        <p className="text-sm text-slate-600 mt-1">Більше ніж 489 студентів<br/>навчаються з нами</p>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                        <ArrowRight className="h-5 w-5 text-slate-600 -rotate-45" />
                      </div>
                    </div>
                    <div className="flex -space-x-2">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 border-2 border-white" />
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 border-2 border-white" />
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 border-2 border-white" />
                      <div className="h-10 w-10 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-semibold text-slate-600">+50</div>
                    </div>
                  </div>

                  {/* Floating badges */}
                  <div className="absolute bottom-32 right-4 bg-white rounded-full px-4 py-2 shadow-xl flex items-center gap-2 animate-float-slow">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <span className="text-[10px] text-white font-bold">EN</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">English</span>
                  </div>

                  <div className="absolute top-32 right-0 bg-white rounded-full px-4 py-2 shadow-xl flex items-center gap-2 animate-float-slower">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                      <span className="text-[10px] text-white font-bold">UA</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">Українська</span>
                  </div>

                  <div className="absolute bottom-8 left-0 bg-white rounded-full px-4 py-2 shadow-xl flex items-center gap-2 animate-float-slow" style={{ animationDelay: "0.5s" }}>
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                      <Star className="h-3 w-3 text-white fill-white" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">4.9 Rating</span>
                  </div>
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
