"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
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

/* ── Scroll-triggered animation hook ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

export default function HomePageClient() {
  const { user } = useAuth()
  const { t } = useTranslation(user?.language || "UA")
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const specialistHref = user?.role === "client" ? "/client/requests/new" : "/specialists"

  /* section observers */
  const hero = useInView(0.1)
  const cats = useInView()
  const how  = useInView()
  const price = useInView()
  const revs = useInView()
  const faqSec = useInView()
  const ctaSec = useInView()

  const features = [
    { icon: <Shield className="h-5 w-5 text-[#43a047]" />, title: t("features.verified.title"), color: "bg-[#e8f5e9]" },
    { icon: <Star className="h-5 w-5 text-[#f9a825]" />, title: t("features.ratings.title"), color: "bg-[#fff8e1]" },
    { icon: <TrendingUp className="h-5 w-5 text-[#43a047]" />, title: t("features.progress.title"), color: "bg-[#e8f5e9]" },
    { icon: <Users className="h-5 w-5 text-[#5c6bc0]" />, title: "Групові заняття", color: "bg-[#e8eaf6]" },
  ]

  const categories = [
    {
      title: t("categories.tutor.title"),
      desc: t("categories.tutor.desc"),
      stat: t("categories.tutor.stat"),
      iconBg: "bg-[#e8f5e9]",
      iconColor: "text-[#43a047]",
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      title: t("categories.psychologist.title"),
      desc: t("categories.psychologist.desc"),
      stat: t("categories.psychologist.stat"),
      iconBg: "bg-[#e8eaf6]",
      iconColor: "text-[#5c6bc0]",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: t("categories.speech.title"),
      desc: t("categories.speech.desc"),
      stat: t("categories.speech.stat"),
      iconBg: "bg-[#fff8e1]",
      iconColor: "text-[#f9a825]",
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
                  <Button className="h-10 rounded-full bg-[#43a047] px-6 text-sm font-medium text-white hover:bg-[#388e3c] cursor-pointer">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" className="h-10 rounded-full px-6 text-sm font-medium border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer">
                      {t("btn.login")}
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="h-10 rounded-full bg-[#43a047] px-6 text-sm font-medium text-white hover:bg-[#388e3c] cursor-pointer">
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
        {/* ═══ HERO ═══ */}
        <section ref={hero.ref} className="relative py-8 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-12 gap-5">
              {/* Main Hero Card */}
              <div className={`lg:col-span-7 relative bg-[#f5f5f0] rounded-[2rem] p-8 lg:p-12 overflow-hidden min-h-[500px] border-2 border-transparent hover:border-black card-hover ${hero.visible ? "animate-slide-up" : "opacity-0"}`}>
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#e8f5e9] rounded-full translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#fff8e1] rounded-full -translate-x-1/4 translate-y-1/4" />
                <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-[#e0f2f1] rounded-full" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-[#e8f5e9] text-[#2e7d32] px-4 py-2 rounded-full text-sm font-medium mb-8">
                    <Star className="h-4 w-4 fill-[#66bb6a] text-[#66bb6a]" />
                    {t("hero.tagline")}
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-800 mb-6 leading-[1.1] font-heading tracking-tight max-w-xl">
                    {t("hero.title")}
                  </h1>

                  <p className="text-lg text-slate-600 mb-10 max-w-md leading-relaxed">
                    {t("hero.subtitle")}
                  </p>

                  <Link href={specialistHref}>
                    <Button className="h-14 rounded-full bg-[#43a047] text-white pl-8 pr-6 text-base font-semibold hover:bg-[#388e3c] gap-3 cursor-pointer">
                      {t("hero.cta")}
                      <span className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    </Button>
                  </Link>

                  <div className="flex items-center mt-10">
                    <div className="flex -space-x-3">
                      <div className="w-11 h-11 rounded-full bg-[#c8e6c9] border-2 border-[#f5f5f0] flex items-center justify-center text-sm font-medium text-[#2e7d32]">ОК</div>
                      <div className="w-11 h-11 rounded-full bg-[#fff8e1] border-2 border-[#f5f5f0] flex items-center justify-center text-sm font-medium text-[#f9a825]">МШ</div>
                      <div className="w-11 h-11 rounded-full bg-[#e8eaf6] border-2 border-[#f5f5f0] flex items-center justify-center text-sm font-medium text-[#5c6bc0]">АП</div>
                      <div className="w-11 h-11 rounded-full bg-[#ffccbc] border-2 border-[#f5f5f0] flex items-center justify-center text-sm font-medium text-[#e64a19]">+</div>
                    </div>
                    <div className="ml-4">
                      <div className="text-xl font-bold text-slate-800">500+</div>
                      <div className="text-sm text-slate-500">спеціалістів онлайн</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column - Bento cards */}
              <div className="lg:col-span-5 grid grid-rows-2 gap-5">
                <div className={`bg-[#fafaf8] rounded-[2rem] p-6 border-2 border-slate-100 flex items-center gap-5 group hover:border-black card-hover cursor-pointer ${hero.visible ? "animate-slide-in-right delay-200" : "opacity-0"}`}>
                  <div className="relative w-28 h-28 bg-[#e8f5e9] rounded-2xl overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#43a047] flex items-center justify-center">
                        <Play className="h-5 w-5 text-white fill-white ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-slate-800/80 text-white text-[10px] px-2 py-1 rounded-full font-medium">
                      2:30
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-[#2e7d32] bg-[#e8f5e9] px-2.5 py-1 rounded-full">TOP</span>
                      <span className="flex items-center gap-1 text-sm text-slate-500">
                        <Star className="h-3.5 w-3.5 fill-[#ffc107] text-[#ffc107]" />
                        4.9
                      </span>
                    </div>
                    <div className="font-bold text-slate-800 text-lg mb-0.5">Олена Коваленко</div>
                    <div className="text-sm text-slate-500 mb-2">Репетитор англійської</div>
                    <div className="text-sm font-semibold text-[#43a047]">від 350 ₴/год</div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-[#43a047] group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className={`bg-[#fff8e1] rounded-[2rem] p-6 flex flex-col justify-between border-2 border-transparent hover:border-black card-hover ${hero.visible ? "animate-slide-up delay-300" : "opacity-0"}`}>
                    <div className="w-12 h-12 bg-white/80 rounded-2xl flex items-center justify-center mb-4">
                      <TrendingUp className="h-6 w-6 text-[#f9a825]" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-slate-800">98%</div>
                      <div className="text-sm text-slate-600">задоволених учнів</div>
                    </div>
                  </div>

                  <div className={`bg-[#e8f5e9] rounded-[2rem] p-6 flex flex-col justify-between border-2 border-transparent hover:border-black card-hover ${hero.visible ? "animate-slide-up delay-400" : "opacity-0"}`}>
                    <div className="w-12 h-12 bg-white/80 rounded-2xl flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-[#43a047]" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-slate-800">Перевірені</div>
                      <div className="text-sm text-slate-600">сертифіковані викладачі</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
              {features.map((feature, i) => (
                <div key={i} className={`bg-[#fafaf8] rounded-2xl p-5 border-2 border-transparent flex items-center gap-4 hover:border-black card-hover ${hero.visible ? `animate-slide-up delay-${(i + 4) * 100}` : "opacity-0"}`} style={{ animationDelay: `${(i + 4) * 100}ms` }}>
                  <div className={`h-12 w-12 rounded-2xl ${feature.color} flex items-center justify-center flex-shrink-0`}>
                    {feature.icon}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{feature.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CATEGORIES ═══ */}
        <section ref={cats.ref} className="py-20 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className={`text-center mb-14 ${cats.visible ? "animate-slide-up" : "opacity-0"}`}>
              <p className="text-sm font-medium text-[#43a047] mb-4 uppercase tracking-wider">{t("about.label")}</p>
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 font-heading mb-5 tracking-tight">
                Категорії спеціалістів
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg">{t("specialists.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {categories.map((cat, i) => (
                <div key={i} className={`bg-[#fafaf8] rounded-3xl p-8 border-2 border-transparent hover:border-black card-hover ${cats.visible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: `${(i + 1) * 150}ms` }}>
                  <div className={`h-14 w-14 ${cat.iconBg} rounded-2xl flex items-center justify-center mb-6`}>
                    <div className={cat.iconColor}>{cat.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{cat.title}</h3>
                  <p className="text-slate-500 text-sm mb-5 leading-relaxed">{cat.desc}</p>
                  <div className="text-sm font-semibold text-[#43a047]">{cat.stat}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section ref={how.ref} id="how" className="py-20 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className={`bg-[#f5f5f0] rounded-[2.5rem] p-10 lg:p-16 ${how.visible ? "animate-scale-in" : "opacity-0"}`}>
              <div className="text-center mb-14">
                <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 font-heading mb-5 tracking-tight">
                  {t("nav.how_it_works")}
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg">{t("how.subtitle")}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-10">
                {steps.map((step, i) => (
                  <div key={i} className={`text-center ${how.visible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: `${(i + 1) * 200}ms` }}>
                    <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center mx-auto mb-6 border-2 border-transparent hover:border-black transition-all">
                      <span className="text-2xl font-bold text-[#43a047]">{step.num}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">{step.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link href={specialistHref}>
                  <Button className="h-14 rounded-full bg-[#43a047] px-10 text-base font-semibold text-white hover:bg-[#388e3c] cursor-pointer">
                    {t("hero.cta")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ PRICING ═══ */}
        <section ref={price.ref} id="plans" className="py-20 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className={`text-center mb-16 ${price.visible ? "animate-slide-up" : "opacity-0"}`}>
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 font-heading mb-5 tracking-tight">
                Обери свій план
              </h2>
              <p className="text-slate-500 text-lg">{t("pricing.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pricing.map((plan, i) => (
                <div
                  key={i}
                  className={`relative rounded-3xl p-8 border-2 hover:border-black card-hover ${
                    plan.highlight
                      ? "bg-[#e8f5e9] border-[#43a047]"
                      : "bg-[#fafaf8] border-transparent"
                  } ${price.visible ? "animate-slide-up" : "opacity-0"}`}
                  style={{ animationDelay: `${(i + 1) * 150}ms` }}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-6 bg-[#43a047] text-white text-xs font-bold px-4 py-1.5 rounded-full">
                      {plan.badge}
                    </div>
                  )}

                  <div className={`inline-block px-5 py-2 rounded-full text-xs font-bold mb-5 ${
                    plan.highlight ? "bg-[#43a047] text-white" : "bg-[#e8f5e9] text-[#2e7d32]"
                  }`}>
                    {plan.lessons}
                  </div>

                  <h3 className="text-lg font-bold mb-3 text-[#2e7d32]">
                    {plan.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-8">
                    {plan.oldPrice && (
                      <span className="text-sm line-through text-slate-400">
                        {plan.oldPrice}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-slate-800">
                      {plan.price}
                    </span>
                  </div>

                  <Button className={`w-full h-12 rounded-full font-semibold mb-8 cursor-pointer ${
                    plan.highlight
                      ? "bg-[#43a047] text-white hover:bg-[#388e3c]"
                      : "bg-slate-800 text-white hover:bg-slate-700"
                  }`}>
                    Обрати
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="space-y-4">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#43a047]" />
                        <span className="text-sm text-slate-600">
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

        {/* ═══ REVIEWS ═══ */}
        <section ref={revs.ref} id="reviews" className="py-20 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className={`text-center mb-14 ${revs.visible ? "animate-slide-up" : "opacity-0"}`}>
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 font-heading mb-4 tracking-tight">
                {t("nav.reviews")}
              </h2>
              <p className="text-slate-500 text-lg">{t("reviews.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((review, i) => (
                <div key={i} className={`bg-[#fafaf8] rounded-2xl p-7 border-2 border-transparent hover:border-black card-hover ${revs.visible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: `${(i + 1) * 150}ms` }}>
                  <div className="flex gap-1 mb-5">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="h-5 w-5 fill-[#ffc107] text-[#ffc107]" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-5 leading-relaxed">{'"'}{review.text}{'"'}</p>
                  <div className="text-sm font-semibold text-slate-800">{review.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section ref={faqSec.ref} className="py-20 px-4 lg:px-8">
          <div className="container mx-auto max-w-3xl">
            <div className={`text-center mb-14 ${faqSec.visible ? "animate-slide-up" : "opacity-0"}`}>
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 font-heading mb-4 tracking-tight">
                Часті запитання
              </h2>
              <p className="text-slate-500 text-lg">{t("faq.subtitle")}</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className={`bg-[#fafaf8] rounded-2xl overflow-hidden border-2 border-transparent hover:border-black transition-all ${faqSec.visible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: `${(i + 1) * 100}ms` }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-7 py-5 flex items-center justify-between text-left hover:bg-white transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-slate-800">{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ease-in-out ${openFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className="px-7 pb-5 text-slate-600 leading-relaxed">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section ref={ctaSec.ref} className="py-20 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className={`bg-[#e8f5e9] rounded-[2rem] p-10 lg:p-14 text-center border-2 border-transparent hover:border-black card-hover ${ctaSec.visible ? "animate-scale-in" : "opacity-0"}`}>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-5 font-heading tracking-tight">
                {t("cta.title")}
              </h2>
              <p className="text-slate-600 mb-10 max-w-xl mx-auto text-lg">
                {t("cta.subtitle")}
              </p>
              <Link href={specialistHref}>
                <Button className="h-14 rounded-full bg-[#43a047] px-10 text-base font-semibold text-white hover:bg-[#388e3c] cursor-pointer">
                  {t("cta.button")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-14 px-4 lg:px-8 rounded-t-[2rem]">
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
                <Link href={specialistHref} className="block text-slate-400 hover:text-white transition-colors">{t("nav.specialists")}</Link>
                <Link href="#how" className="block text-slate-400 hover:text-white transition-colors">{t("nav.how_it_works")}</Link>
                <Link href="#reviews" className="block text-slate-400 hover:text-white transition-colors">{t("nav.reviews")}</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
            &copy; 2024 Libitum Education. {t("footer.rights")}
          </div>
        </div>
      </footer>
    </div>
  )
}
