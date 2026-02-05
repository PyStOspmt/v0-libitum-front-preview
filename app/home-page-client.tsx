"use client"

import { useAuth } from "@/lib/auth-context"
import { useTranslation } from "@/lib/i18n"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import Image from "next/image"
import { BookOpen, Brain, MessageSquare, Star, Users, TrendingUp, ArrowRight, CheckCircle, Sparkles, Play, Shield, Clock, Award, Zap } from "lucide-react"

export default function HomePageClient() {
  const { user } = useAuth()
  const { t } = useTranslation(user?.language || "UA")
  const specialistsHref = user?.role === "client" ? "/client/specialists" : "/specialists"
  const specialistsCategoryHref = user?.role === "client" ? "/client/specialists" : "/specialists"

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50/50" />
        <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-emerald-100/60 via-teal-50/40 to-transparent blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute -right-40 top-60 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-orange-100/50 via-amber-50/30 to-transparent blur-3xl animate-float-slower" />
        <div className="pointer-events-none absolute left-1/3 bottom-40 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-emerald-50/40 to-transparent blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-2xl ring-1 ring-slate-200/50 shadow-lg shadow-emerald-100/50">
                <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
              </div>
              <div>
                <span className="gradient-text-emerald text-2xl font-bold tracking-tight">Libitum</span>
                <p className="text-xs text-muted-foreground font-medium">Education</p>
              </div>
            </div>
            
            <nav className="hidden items-center gap-1 md:flex">
              {[
                { href: specialistsHref, label: t("nav.specialists") },
                { href: "#how-it-works", label: t("nav.how_it_works") },
                { href: "#pricing", label: "Ціни" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-slate-600 rounded-xl transition-all hover:text-slate-900 hover:bg-slate-100/60"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Link href="/login">
                <Button variant="ghost" className="rounded-2xl font-medium">
                  {t("btn.login")}
                </Button>
              </Link>
              <Link href="/register">
                <Button className="rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-200/50 transition-all hover:bg-emerald-700 hover:shadow-emerald-300/50 h-11 px-6 font-semibold">
                  {t("btn.register")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="relative">
        {/* Hero Section */}
        <section className="relative container mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32 lg:pt-32 lg:pb-40">
          <div className="relative animate-fade-in-up mx-auto max-w-5xl text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full glass-card px-5 py-2.5 shadow-glass">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              </div>
              <span className="text-sm font-semibold text-slate-700">{t("hero.tagline")}</span>
            </div>

            {/* Headline */}
            <h1 className="mb-8 text-balance text-5xl font-bold tracking-tight text-slate-900 md:text-6xl lg:text-7xl leading-[1.1]">
              {t("hero.title").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="gradient-text-emerald">
                {t("hero.title").split(" ").pop()}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mb-6 text-pretty text-xl text-slate-600 md:text-2xl max-w-3xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>
            
            <p className="mb-12 text-pretty text-base text-slate-500 md:text-lg max-w-3xl mx-auto">
              {t("hero.extra")}
            </p>

            {/* CTAs */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href={specialistsHref}>
                <Button
                  size="lg"
                  className="h-16 rounded-3xl bg-emerald-600 px-10 text-lg font-bold text-white shadow-xl shadow-emerald-200/60 transition-all hover:bg-emerald-700 hover:shadow-emerald-300/60 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-16 rounded-3xl glass-card border-slate-200/60 px-10 text-lg font-semibold text-slate-700 transition-all hover:bg-white hover:shadow-lg"
                >
                  <Play className="mr-2 h-5 w-5 text-orange-500" />
                  {t("btn.become_specialist")}
                </Button>
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="mt-16 grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Швидкий підбір",
                  text: "Сформуйте запит та отримайте відповіді",
                  icon: Zap,
                  color: "emerald",
                  href: specialistsHref,
                },
                {
                  title: "Почати зараз",
                  text: "Створіть заявку на пробне заняття",
                  icon: Play,
                  color: "orange",
                  href: "/client/requests/new",
                },
                {
                  title: "Підібрати спеціаліста",
                  text: "Каталог з фільтрами та рейтингом",
                  icon: Users,
                  color: "emerald",
                  href: specialistsHref,
                },
              ].map((card, index) => (
                <Link
                  key={card.title}
                  href={card.href}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className={`group animate-fade-in-up rounded-3xl p-7 text-left transition-all hover-lift cursor-pointer ${
                    card.color === "emerald" ? "glass-emerald hover:shadow-glow-emerald" : "glass-orange hover:shadow-glow-orange"
                  }`}
                >
                  <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${
                    card.color === "emerald" ? "bg-emerald-500/10 text-emerald-600" : "bg-orange-500/10 text-orange-600"
                  }`}>
                    <card.icon className="h-7 w-7" />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">{card.title}</p>
                  <p className="text-lg font-semibold text-slate-800 mb-4">{card.text}</p>
                  <div className={`inline-flex items-center gap-2 text-sm font-semibold ${
                    card.color === "emerald" ? "text-emerald-600" : "text-orange-600"
                  } group-hover:gap-3 transition-all`}>
                    Перейти
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm">
              {[
                { icon: Shield, text: "Перевірені спеціалісти" },
                { icon: CheckCircle, text: "Безпечна оплата" },
                { icon: Clock, text: "Підтримка 24/7" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2.5 text-slate-500">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100">
                    <item.icon className="h-4 w-4 text-slate-600" />
                  </div>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="relative container mx-auto px-4 py-24" id="how-it-works">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
              <Sparkles className="h-4 w-4" />
              Простий процес
            </div>
            <h2 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl tracking-tight">{t("nav.how_it_works")}</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">{t("how.subtitle")}</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: t("how.step1.title"), text: t("how.step1.desc"), icon: BookOpen },
              { title: t("how.step2.title"), text: t("how.step2.desc"), icon: Users },
              { title: t("how.step3.title"), text: t("how.step3.desc"), icon: TrendingUp },
            ].map((step, index) => (
              <div
                key={step.title}
                style={{ animationDelay: `${index * 100}ms` }}
                className="group relative animate-fade-in-up rounded-3xl glass-card p-10 hover-glow"
              >
                <div className="absolute top-8 right-8 text-7xl font-black text-slate-100 select-none">
                  {index + 1}
                </div>
                <div className="relative">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 transition-all group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-glow-emerald">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-slate-900">{step.title}</h3>
                  <p className="text-base text-slate-500 leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="relative container mx-auto px-4 py-24" id="specialists">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-1.5 text-sm font-semibold text-orange-700">
              <Award className="h-4 w-4" />
              Категорії
            </div>
            <h2 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl tracking-tight">{t("how.step1.title")}</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">{t("specialists.subtitle")}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Tutor - Emerald */}
            <Link href={`${specialistsCategoryHref}?category=tutor`} className="group">
              <div className="h-full rounded-3xl glass-emerald p-8 hover-lift hover:shadow-glow-emerald transition-all">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/15 text-emerald-600 transition-transform group-hover:scale-110">
                  <BookOpen className="h-10 w-10" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {t("categories.tutor.title")}
                </h3>
                <p className="text-base text-slate-500 mb-8">{t("categories.tutor.desc")}</p>
                
                <div className="flex items-center justify-between border-t border-emerald-100 pt-6">
                  <span className="text-sm font-medium text-slate-400 group-hover:text-emerald-600 transition-colors">
                    {t("categories.tutor.stat")}
                  </span>
                  <div className="h-10 w-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center transition-all group-hover:scale-110 shadow-lg shadow-emerald-200">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Psychologist - Orange */}
            <Link href={`${specialistsCategoryHref}?category=psychologist`} className="group">
              <div className="h-full rounded-3xl glass-orange p-8 hover-lift hover:shadow-glow-orange transition-all">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-500/15 text-orange-600 transition-transform group-hover:scale-110">
                  <Brain className="h-10 w-10" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-slate-900 group-hover:text-orange-700 transition-colors">
                  {t("categories.psychologist.title")}
                </h3>
                <p className="text-base text-slate-500 mb-8">{t("categories.psychologist.desc")}</p>
                
                <div className="flex items-center justify-between border-t border-orange-100 pt-6">
                  <span className="text-sm font-medium text-slate-400 group-hover:text-orange-600 transition-colors">
                    {t("categories.psychologist.stat")}
                  </span>
                  <div className="h-10 w-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center transition-all group-hover:scale-110 shadow-lg shadow-orange-200">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Speech Therapist - Orange */}
            <Link href={`${specialistsCategoryHref}?category=speech-therapist`} className="group">
              <div className="h-full rounded-3xl glass-orange p-8 hover-lift hover:shadow-glow-orange transition-all">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-500/15 text-orange-600 transition-transform group-hover:scale-110">
                  <MessageSquare className="h-10 w-10" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-slate-900 group-hover:text-orange-700 transition-colors">
                  {t("categories.speech.title")}
                </h3>
                <p className="text-base text-slate-500 mb-8">{t("categories.speech.desc")}</p>
                
                <div className="flex items-center justify-between border-t border-orange-100 pt-6">
                  <span className="text-sm font-medium text-slate-400 group-hover:text-orange-600 transition-colors">
                    {t("categories.speech.stat")}
                  </span>
                  <div className="h-10 w-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center transition-all group-hover:scale-110 shadow-lg shadow-orange-200">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Pricing */}
        <section className="relative container mx-auto px-4 py-24" id="pricing">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
              <CheckCircle className="h-4 w-4" />
              Переваги
            </div>
            <h2 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl tracking-tight">Ціни та умови</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">{t("pricing.subtitle")}</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: t("pricing.item1.title"), text: t("pricing.item1.desc"), icon: Shield },
              { title: t("pricing.item2.title"), text: t("pricing.item2.desc"), icon: Zap },
              { title: t("pricing.item3.title"), text: t("pricing.item3.desc"), icon: Award },
            ].map((item, index) => (
              <div
                key={item.title}
                style={{ animationDelay: `${index * 100}ms` }}
                className="rounded-3xl glass-card p-10 hover-glow animate-fade-in-up"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-base text-slate-500 leading-relaxed">{item.text}</p>
                <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600">
                  <span className="h-px w-8 bg-emerald-200"></span>
                  Перевага {index + 1}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="relative container mx-auto px-4 py-24" id="reviews">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-1.5 text-sm font-semibold text-orange-700">
              <Star className="h-4 w-4" />
              Відгуки
            </div>
            <h2 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl tracking-tight">{t("nav.reviews")}</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">{t("reviews.subtitle")}</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { text: t("reviews.item1.text"), name: t("reviews.item1.name"), rating: 5 },
              { text: t("reviews.item2.text"), name: t("reviews.item2.name"), rating: 5 },
              { text: t("reviews.item3.text"), name: t("reviews.item3.name"), rating: 4 },
            ].map((review, i) => (
              <div
                key={i}
                style={{ animationDelay: `${i * 100}ms` }}
                className="rounded-3xl glass-card p-8 animate-fade-in-up hover-glow"
              >
                <div className="mb-6 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className={`h-5 w-5 ${idx < review.rating ? "fill-orange-400 text-orange-400" : "text-slate-200 fill-slate-200"}`} />
                  ))}
                </div>
                <p className="mb-6 text-lg text-slate-600 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center font-bold text-white text-lg">
                    {review.name[0]}
                  </div>
                  <p className="font-bold text-slate-900">{review.name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="relative container mx-auto px-4 py-24" id="faq">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-700">
              <MessageSquare className="h-4 w-4" />
              FAQ
            </div>
            <h2 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl tracking-tight">Часті питання</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">{t("faq.subtitle")}</p>
          </div>
          
          <div className="grid gap-5 md:grid-cols-2 max-w-5xl mx-auto">
            {[
              { q: t("faq.q1.q"), a: t("faq.q1.a") },
              { q: t("faq.q2.q"), a: t("faq.q2.a") },
              { q: t("faq.q3.q"), a: t("faq.q3.a") },
              { q: t("faq.q4.q"), a: t("faq.q4.a") },
            ].map((item, index) => (
              <div
                key={item.q}
                style={{ animationDelay: `${index * 80}ms` }}
                className="group rounded-3xl glass-card p-8 transition-all hover:shadow-elevated animate-fade-in-up"
              >
                <h3 className="mb-3 text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{item.q}</h3>
                <p className="text-base text-slate-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="relative container mx-auto px-4 py-24" id="about">
          <div className="rounded-3xl glass-card p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-orange-50/30" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-slate-200/50 px-4 py-1.5 text-sm font-semibold text-slate-600 mb-8 shadow-sm">
                {t("about.label")}
              </div>
              <h2 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl tracking-tight">{t("about.title")}</h2>
              <p className="mb-12 text-xl text-slate-500 leading-relaxed">{t("about.desc")}</p>
              
              <div className="grid gap-5 md:grid-cols-3 text-left">
                {[t("about.point1"), t("about.point2"), t("about.point3")].map((text, i) => (
                  <div key={i} className="rounded-2xl bg-white/80 border border-slate-100 p-6 transition-all hover:shadow-lg hover:bg-white">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium text-slate-700">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Rules */}
        <section className="relative container mx-auto px-4 py-24" id="contact">
          <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            <div className="rounded-3xl glass-card p-10 hover-glow">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">{t("contact.title")}</h2>
              <p className="mb-8 text-slate-500">{t("contact.desc")}</p>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-0.5">Email</p>
                    <p className="font-semibold text-slate-800">{t("contact.email")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600 shrink-0">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-0.5">Telegram</p>
                    <p className="font-semibold text-slate-800">{t("contact.telegram")}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-3xl glass-card p-10 hover-glow" id="rules">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">{t("rules.title")}</h2>
              <ul className="space-y-5">
                {[t("rules.item1"), t("rules.item2"), t("rules.item3")].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="h-8 w-8 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                    </div>
                    <span className="text-slate-600 pt-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative container mx-auto px-4 py-24">
          <div className="rounded-3xl glass-emerald px-8 py-20 text-center overflow-hidden relative hover-glow">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 via-transparent to-teal-600/5" />
            <div className="relative z-10">
              <h2 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl tracking-tight">{t("cta.title")}</h2>
              <p className="mb-10 text-xl text-slate-600 max-w-2xl mx-auto">{t("cta.subtitle")}</p>
              <Link href="/specialists">
                <Button className="h-16 rounded-3xl bg-emerald-600 px-12 text-xl font-bold text-white shadow-xl shadow-emerald-200/60 transition-all hover:bg-emerald-700 hover:scale-[1.02] hover:shadow-emerald-300/60 active:scale-[0.98]">
                  {t("cta.button")}
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="glass border-t border-white/30 mt-12 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-2xl ring-1 ring-slate-200/50 shadow-lg">
                  <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
                </div>
                <span className="gradient-text-emerald text-2xl font-bold">Libitum</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">Платформа №1 для пошуку репетиторів, психологів та логопедів в Україні.</p>
            </div>

            <div>
              <h3 className="mb-5 font-bold text-slate-900">Для клієнтів</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href={specialistsHref} className="text-slate-500 hover:text-emerald-600 transition-colors">Знайти спеціаліста</Link></li>
                <li><Link href="#how-it-works" className="text-slate-500 hover:text-emerald-600 transition-colors">Як це працює</Link></li>
                <li><Link href="#reviews" className="text-slate-500 hover:text-emerald-600 transition-colors">Відгуки</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 font-bold text-slate-900">Для спеціалістів</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/register" className="text-slate-500 hover:text-emerald-600 transition-colors">Стати спеціалістом</Link></li>
                <li><Link href="#pricing" className="text-slate-500 hover:text-emerald-600 transition-colors">Ціни</Link></li>
                <li><Link href="#faq" className="text-slate-500 hover:text-emerald-600 transition-colors">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 font-bold text-slate-900">Компанія</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="#about" className="text-slate-500 hover:text-emerald-600 transition-colors">Про нас</Link></li>
                <li><Link href="#contact" className="text-slate-500 hover:text-emerald-600 transition-colors">Контакти</Link></li>
                <li><Link href="#rules" className="text-slate-500 hover:text-emerald-600 transition-colors">Правила платформи</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-200/50 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2026 Libitum Education. Всі права захищені.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
