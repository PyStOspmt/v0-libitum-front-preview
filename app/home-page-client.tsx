"use client"

import { useAuth } from "@/lib/auth-context"
import { useTranslation } from "@/lib/i18n"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { BookOpen, Brain, MessageSquare, Star, Users, TrendingUp, ArrowRight, CheckCircle } from "lucide-react"

export default function HomePageClient() {
  const { user } = useAuth()
  const { t } = useTranslation(user?.language || "UA")

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-teal-50/30 via-white to-emerald-50/30">
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-emerald-500 shadow-md">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="gradient-text text-xl font-bold">Libitum</span>
                <p className="text-xs text-muted-foreground">Education</p>
              </div>
            </div>
            <nav className="hidden items-center gap-6 md:flex">
              <Link
                href="/specialists"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-teal-600"
              >
                {t("nav.specialists")}
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-teal-600"
              >
                {t("nav.how_it_works")}
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-teal-600"
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
                <Button className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl transition-all hover:bg-white/90 hover:scale-105 h-14 px-8 text-lg bg-transparent text-foreground">
                  {t("btn.register")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="animate-fade-in-up mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-100 px-6 py-2 text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-teal-600" />
              <span className="text-teal-700">{t("hero.tagline")}</span>
            </div>

            <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              {t("hero.title").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="gradient-text">{t("hero.title").split(" ").pop()}</span>
            </h1>

            <p className="mb-6 text-pretty text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
            <p className="mb-10 text-pretty text-base text-muted-foreground md:text-lg max-w-3xl mx-auto">
              {t("hero.extra")}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/specialists">
                <Button
                  size="lg"
                  className="h-12 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 px-8 text-base shadow-lg shadow-teal-500/30 transition-all hover:shadow-xl hover:shadow-teal-500/40"
                >
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-xl border-2 px-8 text-base transition-all hover:bg-teal-50 bg-transparent"
                >
                  {t("btn.become_specialist")}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="relative container mx-auto px-4 py-14" id="how-it-works">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">{t("nav.how_it_works")}</h2>
            <p className="text-lg text-muted-foreground">{t("how.subtitle")}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: t("how.step1.title"),
                text: t("how.step1.desc"),
              },
              {
                title: t("how.step2.title"),
                text: t("how.step2.desc"),
              },
              {
                title: t("how.step3.title"),
                text: t("how.step3.desc"),
              },
            ].map((step, index) => (
              <div key={step.title} className="rounded-2xl border bg-card p-8 shadow-sm">
                <div className="mb-4 text-sm font-semibold text-teal-600">Крок {index + 1}</div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative container mx-auto px-4 py-12">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-teal-100">
                <Users className="h-7 w-7 text-teal-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{t("features.verified.title")}</h3>
              <p className="text-sm text-muted-foreground">{t("features.verified.desc")}</p>
            </div>

            <div className="rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100">
                <Star className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{t("features.ratings.title")}</h3>
              <p className="text-sm text-muted-foreground">{t("features.ratings.desc")}</p>
            </div>

            <div className="rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-teal-100">
                <TrendingUp className="h-7 w-7 text-teal-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{t("features.progress.title")}</h3>
              <p className="text-sm text-muted-foreground">{t("features.progress.desc")}</p>
            </div>
          </div>
        </section>

        <section className="relative container mx-auto px-4 py-14" id="specialists">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">{t("how.step1.title")}</h2>
            <p className="text-lg text-muted-foreground">{t("specialists.subtitle")}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Link href="/specialists?category=tutor" className="group">
              <div className="rounded-2xl border bg-card overflow-hidden shadow-sm transition-all hover:shadow-lg">
                <div className="bg-gradient-to-br from-teal-500 to-emerald-500 p-8">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">{t("categories.tutor.title")}</h3>
                  <p className="text-sm text-white/90">{t("categories.tutor.desc")}</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t("categories.tutor.stat")}</span>
                    <ArrowRight className="h-4 w-4 text-teal-600 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/specialists?category=psychologist" className="group">
              <div className="rounded-2xl border bg-card overflow-hidden shadow-sm transition-all hover:shadow-lg">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-8">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">{t("categories.psychologist.title")}</h3>
                  <p className="text-sm text-white/90">{t("categories.psychologist.desc")}</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t("categories.psychologist.stat")}</span>
                    <ArrowRight className="h-4 w-4 text-emerald-600 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/specialists?category=speech-therapist" className="group">
              <div className="rounded-2xl border bg-card overflow-hidden shadow-sm transition-all hover:shadow-lg">
                <div className="bg-gradient-to-br from-teal-600 to-emerald-600 p-8">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                    <MessageSquare className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">{t("categories.speech.title")}</h3>
                  <p className="text-sm text-white/90">{t("categories.speech.desc")}</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t("categories.speech.stat")}</span>
                    <ArrowRight className="h-4 w-4 text-teal-600 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        <section className="relative container mx-auto px-4 py-14" id="pricing">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">{t("nav.reviews")}</h2>
            <p className="text-lg text-muted-foreground">{t("pricing.subtitle")}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
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
                className="rounded-2xl border bg-gradient-to-br from-white to-teal-50/70 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600/10">
                  <CheckCircle className="h-5 w-5 text-teal-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.text}</p>
                <p className="mt-4 text-xs text-teal-600/80">Перевага {index + 1}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative container mx-auto px-4 py-14" id="reviews">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">{t("nav.reviews")}</h2>
            <p className="text-lg text-muted-foreground">{t("reviews.subtitle")}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
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
            ].map((review) => (
              <div key={review.text} className="rounded-2xl border bg-card p-8 shadow-sm">
                <div className="mb-4 flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">“{review.text}”</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500" />
                  <p className="text-sm font-semibold">{review.name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative container mx-auto px-4 py-14" id="faq">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">FAQ</h2>
            <p className="text-lg text-muted-foreground">{t("faq.subtitle")}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                q: t("faq.q1.q"),
                a: t("faq.q1.a"),
              },
              {
                q: t("faq.q2.q"),
                a: t("faq.q2.a"),
              },
              {
                q: t("faq.q3.q"),
                a: t("faq.q3.a"),
              },
              {
                q: t("faq.q4.q"),
                a: t("faq.q4.a"),
              },
            ].map((item) => (
              <div
                key={item.q}
                className="group rounded-2xl border bg-gradient-to-br from-white to-emerald-50/60 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="mb-2 text-base font-semibold text-foreground group-hover:text-teal-700">{item.q}</h3>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative container mx-auto px-4 py-14" id="about">
          <div className="rounded-3xl border bg-gradient-to-br from-teal-50/60 via-white to-emerald-50/60 p-10 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/70 px-4 py-1 text-xs font-semibold text-teal-700">
              {t("about.label")}
            </div>
            <h2 className="mb-3 mt-4 text-3xl font-bold text-foreground md:text-4xl">{t("about.title")}</h2>
            <p className="text-lg text-muted-foreground">{t("about.desc")}</p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {[t("about.point1"), t("about.point2"), t("about.point3")].map((text) => (
                <div key={text} className="rounded-2xl border bg-white/80 p-5 shadow-sm">
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative container mx-auto px-4 py-14" id="contact">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border bg-card p-8 shadow-sm">
              <h2 className="mb-3 text-2xl font-bold">{t("contact.title")}</h2>
              <p className="text-sm text-muted-foreground">{t("contact.desc")}</p>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p>{t("contact.email")}</p>
                <p>{t("contact.telegram")}</p>
                <p>{t("contact.hours")}</p>
              </div>
            </div>
            <div className="rounded-2xl border bg-card p-8 shadow-sm" id="rules">
              <h2 className="mb-3 text-2xl font-bold">{t("rules.title")}</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>{t("rules.item1")}</li>
                <li>{t("rules.item2")}</li>
                <li>{t("rules.item3")}</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="relative container mx-auto px-4 py-14">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-violet-500 to-lime-500 p-16 text-center shadow-2xl">
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">{t("cta.title")}</h2>
            <p className="mb-8 text-xl text-white/90">{t("cta.subtitle")}</p>
            <Link href="/specialists">
              <button className="h-14 rounded-2xl bg-white px-10 text-lg font-bold text-purple-600 shadow-2xl transition-all hover:scale-105 hover:bg-white/90">
                {t("cta.button")}
                <ArrowRight className="ml-2 inline-block h-5 w-5" />
              </button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl relative mt-20 border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-emerald-500">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <span className="gradient-text text-xl font-bold">Libitum</span>
              </div>
              <p className="text-sm text-muted-foreground">Платформа №1 для пошуку репетиторів, психологів та логопедів в Україні.</p>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Для клієнтів</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/specialists" className="hover:text-foreground">
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
