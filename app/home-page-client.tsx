"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
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
  const sliderRef = useRef<HTMLDivElement>(null)

  const specialistHref = user?.role === "client" ? "/client/requests/new" : "/specialists"

  /* section observers */
  const hero = useInView(0.1)
  const slider = useInView()
  const cats = useInView()
  const how  = useInView()
  const price = useInView()
  const revs = useInView()
  const faqSec = useInView()
  const ctaSec = useInView()

  const features = [
    { icon: <Shield className="h-5 w-5 text-[#0891b2]" />, title: t("features.verified.title"), color: "bg-[#e0f7fa]" },
    { icon: <Star className="h-5 w-5 text-[#f59e0b]" />, title: t("features.ratings.title"), color: "bg-[#fef3c7]" },
    { icon: <TrendingUp className="h-5 w-5 text-[#0891b2]" />, title: t("features.progress.title"), color: "bg-[#e0f7fa]" },
    { icon: <Users className="h-5 w-5 text-[#6366f1]" />, title: "Групові заняття", color: "bg-[#eef2ff]" },
  ]

  const tutorSlides = [
    { name: "Олена Іваненко", subject: "Англійська мова", rating: 4.9, reviews: 48, price: 400, image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80", badge: "Супер-спеціаліст" },
    { name: "Марія Коваленко", subject: "Психологія", rating: 5.0, reviews: 62, price: 600, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80", badge: "TOP" },
    { name: "Анна Мельник", subject: "Логопедія", rating: 4.9, reviews: 41, price: 500, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80", badge: null },
    { name: "Ірина Бондар", subject: "Математика", rating: 4.8, reviews: 35, price: 350, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80", badge: "Супер-спеціаліст" },
    { name: "Тетяна Шевченко", subject: "Хімія", rating: 4.7, reviews: 28, price: 380, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80", badge: null },
  ]

  const categories = [
    {
      title: t("categories.tutor.title"),
      desc: t("categories.tutor.desc"),
      stat: t("categories.tutor.stat"),
      iconBg: "bg-[#e0f7fa]",
      iconColor: "text-[#0891b2]",
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      title: t("categories.psychologist.title"),
      desc: t("categories.psychologist.desc"),
      stat: t("categories.psychologist.stat"),
      iconBg: "bg-[#eef2ff]",
      iconColor: "text-[#6366f1]",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: t("categories.speech.title"),
      desc: t("categories.speech.desc"),
      stat: t("categories.speech.stat"),
      iconBg: "bg-[#fef3c7]",
      iconColor: "text-[#f59e0b]",
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

  const scrollSlider = (dir: "left" | "right") => {
    if (!sliderRef.current) return
    const amount = 320
    sliderRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 border-b border-slate-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative h-9 w-9 overflow-hidden rounded-lg">
                <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
              </div>
              <span className="text-lg font-bold text-slate-800">LIBITUM</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
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
                  <Button className="h-10 rounded-lg bg-[#0891b2] px-6 text-sm font-medium text-white hover:bg-[#0e7490] cursor-pointer">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" className="h-10 rounded-lg px-6 text-sm font-medium border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer">
                      {t("btn.login")}
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="h-10 rounded-lg bg-[#0891b2] px-6 text-sm font-medium text-white hover:bg-[#0e7490] cursor-pointer">
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
        {/* === HERO === Simple full-width banner */}
        <section ref={hero.ref} className="px-4 lg:px-8 pt-8 pb-4">
          <div className="container mx-auto">
            <div
              className={`relative bg-[#0891b2] rounded-lg px-8 py-14 lg:px-16 lg:py-20 overflow-hidden ${hero.visible ? "animate-slide-up" : "opacity-0"}`}
              style={{
                backgroundImage: `
                  url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"),
                  linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(0,0,0,0.04) 100%)
                `,
                backgroundSize: "180px 180px, 100% 100%",
                boxShadow: "inset 0 0 80px rgba(0,0,0,0.08)",
              }}
            >
              {/* Paper fold crease lines */}
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 left-1/2 w-px h-full bg-white/[0.04]" />
                <div className="absolute top-1/2 left-0 w-full h-px bg-white/[0.04]" />
              </div>

              {/* Worn edge highlight */}
              <div className="absolute inset-0 pointer-events-none rounded-lg" style={{ boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.08), inset -2px -2px 0 rgba(0,0,0,0.06)" }} aria-hidden="true" />

              {/* Subtle ink blot decorations instead of smooth circles */}
              <div className="absolute top-0 right-0 w-72 h-72 translate-x-1/3 -translate-y-1/3 opacity-[0.06]" style={{ background: "radial-gradient(ellipse at 40% 50%, white 0%, transparent 70%)", borderRadius: "43% 57% 51% 49% / 42% 55% 45% 58%" }} />
              <div className="absolute bottom-0 left-0 w-48 h-48 -translate-x-1/4 translate-y-1/4 opacity-[0.04]" style={{ background: "radial-gradient(ellipse at 60% 40%, white 0%, transparent 70%)", borderRadius: "57% 43% 49% 51% / 55% 42% 58% 45%" }} />

              <div className="relative z-10 max-w-2xl">
                <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white mb-5 leading-[1.1] tracking-tight font-serif" style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.1)" }}>
                  {t("hero.title")}
                </h1>
                <div className="w-24 h-0.5 bg-white/30 mb-5" />
                <p className="text-lg text-white/80 mb-8 max-w-lg leading-relaxed" style={{ textShadow: "0.5px 0.5px 0 rgba(0,0,0,0.08)" }}>
                  {t("hero.subtitle")}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link href={specialistHref}>
                    <Button className="h-13 rounded-lg bg-white text-[#0891b2] pl-7 pr-5 text-base font-semibold hover:bg-white/90 gap-3 cursor-pointer">
                      {t("hero.cta")}
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <div className="flex items-center gap-3 text-white/70">
                    <div className="flex -space-x-2">
                      <div className="w-9 h-9 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-xs font-medium text-white">ОК</div>
                      <div className="w-9 h-9 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-xs font-medium text-white">МШ</div>
                      <div className="w-9 h-9 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-xs font-medium text-white">АП</div>
                    </div>
                    <span className="text-sm font-medium text-white">500+ спеціалістів</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features row */}
        <section className="px-4 lg:px-8 py-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {features.map((feature, i) => (
                <div key={i} className={`bg-white rounded-lg p-4 border border-slate-200 flex items-center gap-3 hover:border-black transition-colors ${hero.visible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: `${(i + 2) * 100}ms` }}>
                  <div className={`h-10 w-10 rounded-lg ${feature.color} flex items-center justify-center flex-shrink-0`}>
                    {feature.icon}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{feature.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === TUTORS SLIDER === */}
        <section ref={slider.ref} className="py-14 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className={`flex items-end justify-between mb-8 ${slider.visible ? "animate-slide-up" : "opacity-0"}`}>
              <div>
                <p className="text-sm font-medium text-[#0891b2] mb-2 uppercase tracking-wider">Наші спеціалісти</p>
                <h2 className="text-2xl lg:text-4xl font-bold text-slate-800 tracking-tight">
                  Найкращі репетитори
                </h2>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <button onClick={() => scrollSlider("left")} className="h-10 w-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:border-black hover:text-black transition-colors cursor-pointer">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={() => scrollSlider("right")} className="h-10 w-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:border-black hover:text-black transition-colors cursor-pointer">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div ref={sliderRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 snap-x snap-mandatory" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {tutorSlides.map((tutor, i) => (
                <Link href="/specialists" key={i} className="flex-shrink-0 w-72 snap-start">
                  <div className={`bg-white rounded-lg border border-slate-200 overflow-hidden hover:border-black transition-colors group ${slider.visible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: `${(i + 1) * 100}ms` }}>
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                      <Image src={tutor.image} alt={tutor.name} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-300" crossOrigin="anonymous" />
                      {tutor.badge && (
                        <div className="absolute top-3 left-3 bg-[#0891b2] text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                          {tutor.badge}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-slate-800 mb-1">{tutor.name}</h3>
                      <p className="text-sm text-slate-500 mb-3">{tutor.subject}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Star className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
                          <span className="text-sm font-semibold text-slate-800">{tutor.rating}</span>
                          <span className="text-xs text-slate-400">({tutor.reviews})</span>
                        </div>
                        <span className="text-sm font-bold text-[#0891b2]">{"від ₴"}{tutor.price}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              {/* Last card - View All */}
              <Link href="/specialists" className="flex-shrink-0 w-72 snap-start">
                <div className={`bg-[#e0f7fa] rounded-lg border border-[#b2ebf2] overflow-hidden hover:border-black transition-colors h-full flex flex-col items-center justify-center min-h-[304px] group cursor-pointer ${slider.visible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: "600ms" }}>
                  <div className="h-14 w-14 rounded-lg bg-[#0891b2] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ArrowRight className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-lg font-bold text-[#0891b2]">Дивитись весь каталог</span>
                  <span className="text-sm text-[#0e7490] mt-1">500+ спеціалістів</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* === CATEGORIES === */}
        <section ref={cats.ref} className="py-16 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className={`text-center mb-12 ${cats.visible ? "animate-slide-up" : "opacity-0"}`}>
              <p className="text-sm font-medium text-[#0891b2] mb-3 uppercase tracking-wider">{t("about.label")}</p>
              <h2 className="text-2xl lg:text-4xl font-bold text-slate-800 tracking-tight mb-4">
                Категорії спеціалістів
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">{t("specialists.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {categories.map((cat, i) => (
                <div key={i} className={`bg-white rounded-lg p-7 border border-slate-200 hover:border-black transition-colors ${cats.visible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: `${(i + 1) * 150}ms` }}>
                  <div className={`h-12 w-12 ${cat.iconBg} rounded-lg flex items-center justify-center mb-5`}>
                    <div className={cat.iconColor}>{cat.icon}</div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{cat.title}</h3>
                  <p className="text-slate-500 text-sm mb-4 leading-relaxed">{cat.desc}</p>
                  <div className="text-sm font-semibold text-[#0891b2]">{cat.stat}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === HOW IT WORKS === */}
        <section ref={how.ref} id="how" className="py-16 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className={`bg-slate-50 rounded-lg p-8 lg:p-14 ${how.visible ? "animate-scale-in" : "opacity-0"}`}>
              <div className="text-center mb-12">
                <h2 className="text-2xl lg:text-4xl font-bold text-slate-800 tracking-tight mb-4">
                  {t("nav.how_it_works")}
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto">{t("how.subtitle")}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, i) => (
                  <div key={i} className={`text-center ${how.visible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: `${(i + 1) * 200}ms` }}>
                    <div className="h-16 w-16 rounded-lg bg-white flex items-center justify-center mx-auto mb-5 border border-slate-200 hover:border-black transition-colors">
                      <span className="text-xl font-bold text-[#0891b2]">{step.num}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-10">
                <Link href={specialistHref}>
                  <Button className="h-12 rounded-lg bg-[#0891b2] px-8 text-base font-semibold text-white hover:bg-[#0e7490] cursor-pointer">
                    {t("hero.cta")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* === PRICING === */}
        <section ref={price.ref} id="plans" className="py-16 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className={`text-center mb-14 ${price.visible ? "animate-slide-up" : "opacity-0"}`}>
              <h2 className="text-2xl lg:text-4xl font-bold text-slate-800 tracking-tight mb-4">
                Обери свій план
              </h2>
              <p className="text-slate-500">{t("pricing.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {pricing.map((plan, i) => (
                <div
                  key={i}
                  className={`relative rounded-lg p-7 border hover:border-black transition-colors ${
                    plan.highlight
                      ? "bg-[#e0f7fa] border-[#0891b2]"
                      : "bg-white border-slate-200"
                  } ${price.visible ? "animate-slide-up" : "opacity-0"}`}
                  style={{ animationDelay: `${(i + 1) * 150}ms` }}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-5 bg-[#0891b2] text-white text-xs font-bold px-3 py-1 rounded-md">
                      {plan.badge}
                    </div>
                  )}

                  <div className={`inline-block px-4 py-1.5 rounded-md text-xs font-bold mb-4 ${
                    plan.highlight ? "bg-[#0891b2] text-white" : "bg-[#e0f7fa] text-[#0891b2]"
                  }`}>
                    {plan.lessons}
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-[#0891b2]">
                    {plan.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-6">
                    {plan.oldPrice && (
                      <span className="text-sm line-through text-slate-400">
                        {plan.oldPrice}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-slate-800">
                      {plan.price}
                    </span>
                  </div>

                  <Button className={`w-full h-11 rounded-lg font-semibold mb-6 cursor-pointer ${
                    plan.highlight
                      ? "bg-[#0891b2] text-white hover:bg-[#0e7490]"
                      : "bg-slate-800 text-white hover:bg-slate-700"
                  }`}>
                    Обрати
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#0891b2]" />
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

        {/* === REVIEWS === */}
        <section ref={revs.ref} id="reviews" className="py-16 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className={`text-center mb-12 ${revs.visible ? "animate-slide-up" : "opacity-0"}`}>
              <h2 className="text-2xl lg:text-4xl font-bold text-slate-800 tracking-tight mb-4">
                {t("nav.reviews")}
              </h2>
              <p className="text-slate-500">{t("reviews.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {reviews.map((review, i) => (
                <div key={i} className={`bg-white rounded-lg p-6 border border-slate-200 hover:border-black transition-colors ${revs.visible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: `${(i + 1) * 150}ms` }}>
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-4 leading-relaxed text-sm">{'"'}{review.text}{'"'}</p>
                  <div className="text-sm font-semibold text-slate-800">{review.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === FAQ === */}
        <section ref={faqSec.ref} className="py-16 px-4 lg:px-8">
          <div className="container mx-auto max-w-3xl">
            <div className={`text-center mb-12 ${faqSec.visible ? "animate-slide-up" : "opacity-0"}`}>
              <h2 className="text-2xl lg:text-4xl font-bold text-slate-800 tracking-tight mb-4">
                Часті запитання
              </h2>
              <p className="text-slate-500">{t("faq.subtitle")}</p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className={`bg-white rounded-lg overflow-hidden border border-slate-200 hover:border-black transition-all ${faqSec.visible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: `${(i + 1) * 100}ms` }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-slate-800 text-sm">{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ml-4 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ease-in-out ${openFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className="px-6 pb-4 text-slate-600 leading-relaxed text-sm">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === CTA === */}
        <section ref={ctaSec.ref} className="py-16 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className={`bg-[#e0f7fa] rounded-lg p-10 lg:p-14 text-center border border-[#b2ebf2] hover:border-black transition-colors ${ctaSec.visible ? "animate-scale-in" : "opacity-0"}`}>
              <h2 className="text-2xl lg:text-4xl font-bold text-slate-800 mb-4 tracking-tight">
                {t("cta.title")}
              </h2>
              <p className="text-slate-600 mb-8 max-w-xl mx-auto">
                {t("cta.subtitle")}
              </p>
              <Link href={specialistHref}>
                <Button className="h-12 rounded-lg bg-[#0891b2] px-8 text-base font-semibold text-white hover:bg-[#0e7490] cursor-pointer">
                  {t("cta.button")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 px-4 lg:px-8 rounded-t-xl">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="relative h-8 w-8 overflow-hidden rounded-lg">
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
