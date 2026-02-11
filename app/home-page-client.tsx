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
  Star,
  Users,
  BookOpen,
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

/* ── Horizontal slider component ── */
function SpecialistSlider({
  title,
  specialists,
  visible,
  catalogHref,
  catalogLabel,
}: {
  title: string
  specialists: { name: string; subject: string; rating: number; reviews: number; price: number; image: string; badge: string | null }[]
  visible: boolean
  catalogHref: string
  catalogLabel: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (dir: "left" | "right") => {
    if (!ref.current) return
    ref.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" })
  }

  return (
    <div>
      <div className={`flex items-end justify-between mb-5 ${visible ? "animate-slide-up" : "opacity-0"}`}>
        <h2 className="text-xl lg:text-2xl font-bold text-slate-800 tracking-tight">{title}</h2>
        <div className="flex items-center gap-2">
          <button onClick={() => scroll("left")} className="h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:border-black hover:text-black transition-colors cursor-pointer" aria-label="Scroll left">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={() => scroll("right")} className="h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:border-black hover:text-black transition-colors cursor-pointer" aria-label="Scroll right">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div ref={ref} className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {specialists.map((s, i) => (
          <Link href="/specialists" key={i} className="flex-shrink-0 w-64 sm:w-72 snap-start">
            <div className={`bg-white rounded-lg border border-slate-200 overflow-hidden hover:border-black transition-colors group ${visible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: `${(i + 1) * 80}ms` }}>
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <Image src={s.image} alt={s.name} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-300" crossOrigin="anonymous" />
                {s.badge && (
                  <div className="absolute top-3 left-3 bg-[#00897B] text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                    {s.badge}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-800 mb-1 text-sm">{s.name}</h3>
                <p className="text-xs text-slate-500 mb-3">{s.subject}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                    <span className="text-sm font-semibold text-slate-800">{s.rating}</span>
                    <span className="text-xs text-slate-400">({s.reviews})</span>
                  </div>
                  <span className="text-sm font-bold text-[#00897B]">{"vid \u20B4"}{s.price}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {/* Last card - View All */}
        <Link href={catalogHref} className="flex-shrink-0 w-64 sm:w-72 snap-start">
          <div className={`bg-[#E0F2F1] rounded-lg border border-[#B2DFDB] overflow-hidden hover:border-black transition-colors h-full flex flex-col items-center justify-center min-h-[280px] group cursor-pointer ${visible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: "500ms" }}>
            <div className="h-12 w-12 rounded-lg bg-[#00897B] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <ArrowRight className="h-5 w-5 text-white" />
            </div>
            <span className="text-base font-bold text-[#00897B]">{catalogLabel}</span>
            <span className="text-xs text-[#00796B] mt-1">500+ {"спеціалістів"}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default function HomePageClient() {
  const { user } = useAuth()
  const { t } = useTranslation(user?.language || "UA")
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const specialistHref = user?.role === "client" ? "/client/requests/new" : "/specialists"

  /* section observers */
  const tutors = useInView(0.1)
  const psychologists = useInView(0.1)
  const speechTherapists = useInView(0.1)
  const how = useInView()
  const price = useInView()
  const revs = useInView()
  const faqSec = useInView()
  const ctaSec = useInView()

  const tutorSlides = [
    { name: "Олена Іваненко", subject: "Англійська мова", rating: 4.9, reviews: 48, price: 400, image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80", badge: "Супер-спеціаліст" },
    { name: "Андрій Петренко", subject: "Математика", rating: 4.8, reviews: 35, price: 350, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", badge: null },
    { name: "Ірина Бондар", subject: "Фізика", rating: 4.7, reviews: 28, price: 380, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80", badge: "TOP" },
    { name: "Тетяна Шевченко", subject: "Хімія", rating: 4.9, reviews: 41, price: 420, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80", badge: null },
    { name: "Дмитро Козак", subject: "Українська мова", rating: 5.0, reviews: 62, price: 360, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", badge: "Супер-спеціаліст" },
  ]

  const psychologistSlides = [
    { name: "Марія Коваленко", subject: "Дитяча психологія", rating: 5.0, reviews: 62, price: 600, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80", badge: "TOP" },
    { name: "Наталія Кравчук", subject: "Сімейна терапія", rating: 4.9, reviews: 55, price: 700, image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80", badge: "Супер-спеціаліст" },
    { name: "Олександр Тимчук", subject: "Когнітивна терапія", rating: 4.8, reviews: 38, price: 550, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80", badge: null },
    { name: "Вікторія Лисенко", subject: "Підліткова психологія", rating: 4.9, reviews: 44, price: 650, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80", badge: null },
  ]

  const speechSlides = [
    { name: "Анна Мельник", subject: "Корекція мовлення", rating: 4.9, reviews: 41, price: 500, image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80", badge: "Супер-спеціаліст" },
    { name: "Юлія Савченко", subject: "Заїкання", rating: 5.0, reviews: 33, price: 550, image: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?auto=format&fit=crop&w=400&q=80", badge: "TOP" },
    { name: "Оксана Гончар", subject: "Дислексія", rating: 4.8, reviews: 29, price: 480, image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?auto=format&fit=crop&w=400&q=80", badge: null },
    { name: "Тарас Коваль", subject: "Розвиток мовлення", rating: 4.7, reviews: 25, price: 450, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", badge: null },
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
      price: "990 \u20B4",
      desc: t("pricing.item1.desc"),
      features: ["4 заняття з репетитором", "Доступ до матеріалів", "Домашні завдання", "Підтримка вчителя"],
      highlight: false,
    },
    {
      lessons: "12 уроків",
      name: t("pricing.item2.title"),
      price: "2199 \u20B4",
      oldPrice: "2590 \u20B4",
      badge: "НАЙКРАЩА ПРОПОЗИЦІЯ",
      desc: t("pricing.item2.desc"),
      features: ["12 занять з репетитором", "Повний доступ до матеріалів", "Детальний фідбек", "Тести прогресу", "Персоналізовані сесії"],
      highlight: true,
    },
    {
      lessons: "24 уроки",
      name: t("pricing.item3.title"),
      price: "5199 \u20B4",
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
      <header className="sticky top-0 z-50 bg-white/95 border-b border-slate-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-14 items-center justify-between">
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
                  <Button className="h-9 rounded-lg bg-[#00897B] px-5 text-sm font-medium text-white hover:bg-[#00796B] cursor-pointer">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" className="h-9 rounded-lg px-5 text-sm font-medium border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer">
                      {t("btn.login")}
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="h-9 rounded-lg bg-[#00897B] px-5 text-sm font-medium text-white hover:bg-[#00796B] cursor-pointer">
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
        {/* === COMPACT HEADLINE === */}
        <section className="px-4 lg:px-8 pt-6 pb-2">
          <div className="container mx-auto">
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 tracking-tight">
              {"Професійні репетитори, психологи та логопеди"}
            </h1>
            <p className="text-slate-500 mt-1 text-sm lg:text-base">{t("hero.subtitle")}</p>
          </div>
        </section>

        {/* === TUTORS SLIDER === */}
        <section ref={tutors.ref} className="py-6 px-4 lg:px-8">
          <div className="container mx-auto">
            <SpecialistSlider
              title="Репетитори"
              specialists={tutorSlides}
              visible={tutors.visible}
              catalogHref="/specialists"
              catalogLabel="Всі репетитори"
            />
          </div>
        </section>

        {/* === PSYCHOLOGISTS SLIDER === */}
        <section ref={psychologists.ref} className="py-6 px-4 lg:px-8">
          <div className="container mx-auto">
            <SpecialistSlider
              title="Психологи"
              specialists={psychologistSlides}
              visible={psychologists.visible}
              catalogHref="/specialists"
              catalogLabel="Всі психологи"
            />
          </div>
        </section>

        {/* === SPEECH THERAPISTS SLIDER === */}
        <section ref={speechTherapists.ref} className="py-6 px-4 lg:px-8">
          <div className="container mx-auto">
            <SpecialistSlider
              title="Логопеди"
              specialists={speechSlides}
              visible={speechTherapists.visible}
              catalogHref="/specialists"
              catalogLabel="Всі логопеди"
            />
          </div>
        </section>

        {/* === HOW IT WORKS === */}
        <section ref={how.ref} id="how" className="py-14 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className={`bg-slate-50 rounded-lg p-8 lg:p-14 ${how.visible ? "animate-scale-in" : "opacity-0"}`}>
              <div className="text-center mb-10">
                <h2 className="text-xl lg:text-3xl font-bold text-slate-800 tracking-tight mb-3">
                  {t("nav.how_it_works")}
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-sm">{t("how.subtitle")}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, i) => (
                  <div key={i} className={`text-center ${how.visible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: `${(i + 1) * 200}ms` }}>
                    <div className="h-14 w-14 rounded-lg bg-white flex items-center justify-center mx-auto mb-4 border border-slate-200 hover:border-black transition-colors">
                      <span className="text-lg font-bold text-[#00897B]">{step.num}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-2">{step.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-10">
                <Link href={specialistHref}>
                  <Button className="h-11 rounded-lg bg-[#00897B] px-8 text-sm font-semibold text-white hover:bg-[#00796B] cursor-pointer">
                    {t("hero.cta")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* === PRICING === */}
        <section ref={price.ref} id="plans" className="py-14 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className={`text-center mb-12 ${price.visible ? "animate-slide-up" : "opacity-0"}`}>
              <h2 className="text-xl lg:text-3xl font-bold text-slate-800 tracking-tight mb-3">
                {"Обери свій план"}
              </h2>
              <p className="text-slate-500 text-sm">{t("pricing.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {pricing.map((plan, i) => (
                <div
                  key={i}
                  className={`relative rounded-lg p-6 border hover:border-black transition-colors ${
                    plan.highlight
                      ? "bg-[#E0F2F1] border-[#00897B]"
                      : "bg-white border-slate-200"
                  } ${price.visible ? "animate-slide-up" : "opacity-0"}`}
                  style={{ animationDelay: `${(i + 1) * 150}ms` }}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-5 bg-[#00897B] text-white text-xs font-bold px-3 py-1 rounded-md">
                      {plan.badge}
                    </div>
                  )}

                  <div className={`inline-block px-3 py-1 rounded-md text-xs font-bold mb-4 ${
                    plan.highlight ? "bg-[#00897B] text-white" : "bg-[#E0F2F1] text-[#00897B]"
                  }`}>
                    {plan.lessons}
                  </div>

                  <h3 className="text-base font-bold mb-2 text-[#00897B]">{plan.name}</h3>

                  <div className="flex items-baseline gap-2 mb-5">
                    {plan.oldPrice && (
                      <span className="text-sm line-through text-slate-400">{plan.oldPrice}</span>
                    )}
                    <span className="text-2xl font-bold text-slate-800">{plan.price}</span>
                  </div>

                  <Button className={`w-full h-10 rounded-lg font-semibold mb-5 cursor-pointer text-sm ${
                    plan.highlight
                      ? "bg-[#00897B] text-white hover:bg-[#00796B]"
                      : "bg-slate-800 text-white hover:bg-slate-700"
                  }`}>
                    {"Обрати"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="space-y-2.5">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#00897B]" />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === REVIEWS === */}
        <section ref={revs.ref} id="reviews" className="py-14 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className={`text-center mb-10 ${revs.visible ? "animate-slide-up" : "opacity-0"}`}>
              <h2 className="text-xl lg:text-3xl font-bold text-slate-800 tracking-tight mb-3">
                {t("nav.reviews")}
              </h2>
              <p className="text-slate-500 text-sm">{t("reviews.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {reviews.map((review, i) => (
                <div key={i} className={`bg-white rounded-lg p-5 border border-slate-200 hover:border-black transition-colors ${revs.visible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: `${(i + 1) * 150}ms` }}>
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-3 leading-relaxed text-sm">{'"'}{review.text}{'"'}</p>
                  <div className="text-sm font-semibold text-slate-800">{review.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === FAQ === */}
        <section ref={faqSec.ref} className="py-14 px-4 lg:px-8">
          <div className="container mx-auto max-w-3xl">
            <div className={`text-center mb-10 ${faqSec.visible ? "animate-slide-up" : "opacity-0"}`}>
              <h2 className="text-xl lg:text-3xl font-bold text-slate-800 tracking-tight mb-3">
                {"Часті запитання"}
              </h2>
              <p className="text-slate-500 text-sm">{t("faq.subtitle")}</p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className={`bg-white rounded-lg overflow-hidden border border-slate-200 hover:border-black transition-all ${faqSec.visible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: `${(i + 1) * 100}ms` }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-slate-800 text-sm">{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ml-4 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ease-in-out ${openFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className="px-5 pb-4 text-slate-600 leading-relaxed text-sm">{faq.a}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === CTA === */}
        <section ref={ctaSec.ref} className="py-14 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className={`bg-[#E0F2F1] rounded-lg p-8 lg:p-12 text-center border border-[#B2DFDB] hover:border-black transition-colors ${ctaSec.visible ? "animate-scale-in" : "opacity-0"}`}>
              <h2 className="text-xl lg:text-3xl font-bold text-slate-800 mb-3 tracking-tight">
                {t("cta.title")}
              </h2>
              <p className="text-slate-600 mb-6 max-w-xl mx-auto text-sm">
                {t("cta.subtitle")}
              </p>
              <Link href={specialistHref}>
                <Button className="h-11 rounded-lg bg-[#00897B] px-8 text-sm font-semibold text-white hover:bg-[#00796B] cursor-pointer">
                  {t("cta.button")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-10 px-4 lg:px-8 rounded-t-lg">
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
              <h4 className="font-semibold mb-4 text-sm">{t("contact.title")}</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p>{t("contact.email")}</p>
                <p>{t("contact.telegram")}</p>
                <p>{t("contact.hours")}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm">{t("rules.title")}</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p>{t("rules.item1")}</p>
                <p>{t("rules.item2")}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm">{"Навігація"}</h4>
              <div className="space-y-2 text-sm">
                <Link href={specialistHref} className="block text-slate-400 hover:text-white transition-colors">{t("nav.specialists")}</Link>
                <Link href="#how" className="block text-slate-400 hover:text-white transition-colors">{t("nav.how_it_works")}</Link>
                <Link href="#reviews" className="block text-slate-400 hover:text-white transition-colors">{t("nav.reviews")}</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-6 text-center text-sm text-slate-400">
            &copy; 2024 Libitum Education. {t("footer.rights")}
          </div>
        </div>
      </footer>
    </div>
  )
}
