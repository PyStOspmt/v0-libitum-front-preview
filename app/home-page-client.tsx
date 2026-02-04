"use client"

import { useAuth } from "@/lib/auth-context"
import { useTranslation } from "@/lib/i18n"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { BookOpen, Brain, MessageSquare, Star, Users, TrendingUp, ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function HomePageClient() {
  const { user } = useAuth()
  const { t } = useTranslation(user?.language || "UA")
  const specialistsHref = user?.role === "client" ? "/client/specialists" : "/specialists"
  const specialistsCategoryHref = user?.role === "client" ? "/client/specialists" : "/specialists"

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent text-slate-700">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-slate-200 shadow-sm">
                <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
              </div>
              <div>
                <span className="gradient-text text-xl font-bold">Libitum</span>
                <p className="text-xs text-muted-foreground">Education</p>
              </div>
            </div>
            <nav className="hidden items-center gap-6 md:flex">
              <Link
                href={specialistsHref}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("nav.specialists")}
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("nav.how_it_works")}
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Ціни
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Link href="/login">
                <Button variant="ghost" className="rounded-2xl">
                  {t("btn.login")}
                </Button>
              </Link>
              <Link href="/register">
                <Button className="rounded-2xl border border-slate-200 bg-slate-800 text-white shadow-sm transition-all hover:bg-slate-700 h-11 px-6 text-base">
                  {t("btn.register")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="relative scroll-smooth snap-y snap-mandatory">
        {/* Hero Section */}
        <section className="relative container mx-auto px-4 py-24 md:py-28 lg:py-32 overflow-visible snap-start">

          <div className="relative animate-fade-in-up mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-600 shadow-sm transition-transform hover:scale-105">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <span>{t("hero.tagline")}</span>
            </div>

            <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight text-slate-800 md:text-6xl lg:text-7xl">
              {t("hero.title").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 pr-2">
                {t("hero.title").split(" ").pop()}
              </span>
            </h1>

            <p className="mb-6 text-pretty text-xl text-slate-600 md:text-2xl max-w-2xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>
            
            <p className="mb-10 text-pretty text-base text-slate-500 md:text-lg max-w-3xl mx-auto">
              {t("hero.extra")}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href={specialistsHref}>
                <Button
                  size="lg"
                  className="h-14 rounded-2xl bg-emerald-600 px-10 text-lg font-semibold text-white shadow-lg shadow-emerald-100 transition-all hover:bg-emerald-700 hover:scale-105 active:scale-95"
                >
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-2xl border-slate-200 bg-white px-10 text-lg font-medium text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300"
                >
                  {t("btn.become_specialist")}
                </Button>
              </Link>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Швидкий підбір",
                  text: "Сформуйте запит та отримайте відповіді",
                  action: t("hero.cta"),
                  href: specialistsHref,
                },
                {
                  title: "Почати зараз",
                  text: "Створіть заявку на пробне заняття",
                  action: "Створити запит",
                  href: "/client/requests/new",
                },
                {
                  title: "Підібрати спеціаліста",
                  text: "Каталог з фільтрами та рейтингом",
                  action: "Переглянути каталог",
                  href: specialistsHref,
                },
              ].map((card, index) => (
                <Link
                  key={card.title}
                  href={card.href}
                  style={{ animationDelay: `${index * 120}ms` }}
                  className="group animate-fade-in-up rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-slate-300"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{card.title}</p>
                  <p className="mt-2 text-base font-semibold text-slate-800">{card.text}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
                    {card.action}
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Trust markers */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-slate-300" />
                Перевірені спеціалісти
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-slate-300" />
                Безпечна оплата
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-slate-300" />
                Підтримка 24/7
              </div>
            </div>
          </div>
        </section>

        {/* How it works - Cleaner cards */}
        <section className="relative container mx-auto px-4 py-16 snap-start" id="how-it-works">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-800 md:text-4xl">{t("nav.how_it_works")}</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">{t("how.subtitle")}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: t("how.step1.title"),
                text: t("how.step1.desc"),
                icon: BookOpen
              },
              {
                title: t("how.step2.title"),
                text: t("how.step2.desc"),
                icon: Users
              },
              {
                title: t("how.step3.title"),
                text: t("how.step3.desc"),
                icon: TrendingUp
              },
            ].map((step, index) => (
              <div
                key={step.title}
                style={{ animationDelay: `${index * 140}ms` }}
                className="group relative animate-fade-in-up rounded-2xl border border-slate-100 bg-white p-10 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="absolute top-10 right-10 text-6xl font-bold text-slate-100 select-none group-hover:text-slate-200 transition-colors">
                  {index + 1}
                </div>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                  <step.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-800">{step.title}</h3>
                <p className="text-base text-slate-500 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Categories - Strong accent usage */}
        <section className="relative container mx-auto px-4 py-16 snap-start" id="specialists">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-800 md:text-4xl">{t("how.step1.title")}</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">{t("specialists.subtitle")}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Tutor Category - Green Accent */}
            <Link href={`${specialistsCategoryHref}?category=tutor`} className="group">
              <div className="h-full rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50/60 via-white to-white overflow-hidden shadow-sm transition-all hover:shadow-lg hover:border-emerald-200 hover:-translate-y-1 hover-glow">
                <div className="p-8 h-full flex flex-col">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-transform group-hover:scale-110">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{t("categories.tutor.title")}</h3>
                  <p className="text-base text-slate-500 mb-8 flex-1">{t("categories.tutor.desc")}</p>
                  
                  <div className="flex items-center justify-between text-sm font-medium border-t border-slate-100 pt-6">
                    <span className="text-slate-400 group-hover:text-emerald-600 transition-colors">{t("categories.tutor.stat")}</span>
                    <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Psychologist Category - Orange Accent */}
            <Link href={`${specialistsCategoryHref}?category=psychologist`} className="group">
              <div className="h-full rounded-2xl border border-slate-200 bg-gradient-to-br from-amber-50/50 via-white to-white overflow-hidden shadow-sm transition-all hover:shadow-lg hover:border-orange-200 hover:-translate-y-1 hover-glow">
                <div className="p-8 h-full flex flex-col">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 transition-transform group-hover:scale-110">
                    <Brain className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-slate-800 group-hover:text-orange-600 transition-colors">{t("categories.psychologist.title")}</h3>
                  <p className="text-base text-slate-500 mb-8 flex-1">{t("categories.psychologist.desc")}</p>
                  
                  <div className="flex items-center justify-between text-sm font-medium border-t border-slate-100 pt-6">
                    <span className="text-slate-400 group-hover:text-orange-600 transition-colors">{t("categories.psychologist.stat")}</span>
                    <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Speech Therapist Category - Orange Accent */}
            <Link href={`${specialistsCategoryHref}?category=speech-therapist`} className="group">
              <div className="h-full rounded-2xl border border-slate-200 bg-gradient-to-br from-amber-50/50 via-white to-white overflow-hidden shadow-sm transition-all hover:shadow-lg hover:border-orange-200 hover:-translate-y-1 hover-glow">
                <div className="p-8 h-full flex flex-col">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 transition-transform group-hover:scale-110">
                    <MessageSquare className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-slate-800 group-hover:text-orange-600 transition-colors">{t("categories.speech.title")}</h3>
                  <p className="text-base text-slate-500 mb-8 flex-1">{t("categories.speech.desc")}</p>
                  
                  <div className="flex items-center justify-between text-sm font-medium border-t border-slate-100 pt-6">
                    <span className="text-slate-400 group-hover:text-orange-600 transition-colors">{t("categories.speech.stat")}</span>
                    <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Pricing - Clean & Neutral */}
        <section className="relative container mx-auto px-4 py-20" id="pricing">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-800 md:text-4xl">Ціни та умови</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">{t("pricing.subtitle")}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: t("pricing.item1.title"),
                text: t("pricing.item1.desc"),
              },
              {
                title: t("pricing.item2.title"),
                text: t("pricing.item2.desc"),
              },
              {
                title: t("pricing.item3.title"),
                text: t("pricing.item3.desc"),
              },
            ].map((item, index) => (
              <div
                key={item.title}
                style={{ animationDelay: `${index * 140}ms` }}
                className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-800">{item.title}</h3>
                <p className="text-base text-slate-500 leading-relaxed">{item.text}</p>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <span className="h-px w-8 bg-slate-200"></span>
                  Перевага {index + 1}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews - Softer appearance */}
        <section className="relative container mx-auto px-4 py-20" id="reviews">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-800 md:text-4xl">{t("nav.reviews")}</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">{t("reviews.subtitle")}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                text: t("reviews.item1.text"),
                name: t("reviews.item1.name"),
                rating: 5,
              },
              {
                text: t("reviews.item2.text"),
                name: t("reviews.item2.name"),
                rating: 5,
              },
              {
                text: t("reviews.item3.text"),
                name: t("reviews.item3.name"),
                rating: 4,
              },
            ].map((review, i) => (
              <div
                key={i}
                style={{ animationDelay: `${i * 140}ms` }}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm animate-fade-in-up"
              >
                <div className="mb-6 flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className={`h-5 w-5 ${idx < review.rating ? "fill-current" : "text-slate-200 fill-slate-200"}`} />
                  ))}
                </div>
                <p className="mb-6 text-lg italic text-slate-600">“{review.text}”</p>
                <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                    {review.name[0]}
                  </div>
                  <p className="font-bold text-slate-800">{review.name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ section - Simplified */}
        <section className="relative container mx-auto px-4 py-20" id="faq">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-800 md:text-4xl">FAQ</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">{t("faq.subtitle")}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            {[
              { q: t("faq.q1.q"), a: t("faq.q1.a") },
              { q: t("faq.q2.q"), a: t("faq.q2.a") },
              { q: t("faq.q3.q"), a: t("faq.q3.a") },
              { q: t("faq.q4.q"), a: t("faq.q4.a") },
            ].map((item, index) => (
              <div
                key={item.q}
                style={{ animationDelay: `${index * 120}ms` }}
                className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-slate-300 hover:shadow-md animate-fade-in-up"
              >
                <h3 className="mb-3 text-lg font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{item.q}</h3>
                <p className="text-base text-slate-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About section - Light & Airy */}
        <section className="relative container mx-auto px-4 py-20" id="about">
          <div className="rounded-2xl border border-slate-200 bg-white p-12 md:p-20 text-center shadow-sm relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold text-slate-500 mb-8">
                {t("about.label")}
              </div>
              <h2 className="mb-6 text-4xl font-bold text-slate-800 md:text-5xl">{t("about.title")}</h2>
              <p className="mb-12 text-xl text-slate-500 leading-relaxed">{t("about.desc")}</p>
              
              <div className="grid gap-6 md:grid-cols-3 text-left">
                {[t("about.point1"), t("about.point2"), t("about.point3")].map((text, i) => (
                  <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-colors hover:bg-white hover:shadow-sm">
                    <p className="text-sm font-medium text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Rules */}
        <section className="relative container mx-auto px-4 py-20" id="contact">
          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold text-slate-800">{t("contact.title")}</h2>
              <p className="mb-8 text-slate-500">{t("contact.desc")}</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-slate-600">
                  <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Email</p>
                    <p className="font-medium">{t("contact.email")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-600">
                  <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Social</p>
                    <p className="font-medium">{t("contact.telegram")}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm" id="rules">
              <h2 className="mb-6 text-2xl font-bold text-slate-800">{t("rules.title")}</h2>
              <ul className="space-y-4">
                {[t("rules.item1"), t("rules.item2"), t("rules.item3")].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <CheckCircle className="h-6 w-6 text-emerald-500 shrink-0" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative container mx-auto px-4 py-20">
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm md:px-16">
            <h2 className="mb-6 text-4xl font-bold text-slate-800 md:text-5xl tracking-tight">{t("cta.title")}</h2>
            <p className="mb-10 text-xl text-slate-500">{t("cta.subtitle")}</p>
            <Link href="/specialists">
              <button className="h-16 rounded-2xl bg-emerald-600 px-12 text-xl font-bold text-white shadow-lg shadow-emerald-100 transition-all hover:scale-105 hover:bg-emerald-700 active:scale-95">
                {t("cta.button")}
                <ArrowRight className="ml-3 inline-block h-6 w-6" />
              </button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-100 relative mt-20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-slate-200 shadow-sm">
                  <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
                </div>
                <span className="gradient-text text-xl font-bold">Libitum</span>
              </div>
              <p className="text-sm text-muted-foreground">Платформа №1 для пошуку репетиторів, психологів та логопедів в Україні.</p>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Для клієнтів</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href={specialistsHref} className="hover:text-foreground">
                    Знайти спеціаліста
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="hover:text-foreground">
                    Як це працює
                  </Link>
                </li>
                <li>
                  <Link href="#reviews" className="hover:text-foreground">
                    Відгуки
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Для спеціалістів</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/register" className="hover:text-foreground">
                    Стати спеціалістом
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-foreground">
                    Ціни
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Компанія</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#about" className="hover:text-foreground">
                    Про нас
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-foreground">
                    Контакти
                  </Link>
                </li>
                <li>
                  <Link href="#rules" className="hover:text-foreground">
                    Правила платформи
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Libitum Education. Всі права захищені.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
