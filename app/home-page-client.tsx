"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef, useCallback } from "react"
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useTranslation } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"

/* ── Brand palette ── */
const B = {
  pri:   "#009688",
  dark:  "#00796B",
  light: "#E0F2F1",
  mid:   "#B2DFDB",
} as const

/* ── Accent palettes per specialist type ── */
type Palette = { button: string; price: string; glow: string; soft: string; ring: string }
const PALETTES: Record<string, Palette> = {
  tutor:  { button: B.pri, price: B.pri, glow: "rgba(0,150,136,0.07)", soft: "rgba(0,150,136,0.04)", ring: B.mid },
  health: { button: "#f59e0b", price: "#d97706", glow: "rgba(245,158,11,0.07)", soft: "rgba(245,158,11,0.04)", ring: "#fde68a" },
}

function getPalette(type: string): Palette {
  if (type === "tutor") return PALETTES.tutor
  return PALETTES.health
}

/* Diffuse background for cards */
function getDiffuseBg(palette: Palette, idx: number) {
  const offset = idx * 30
  return {
    backgroundImage: `
      radial-gradient(ellipse at ${20 + offset}% 0%, ${palette.glow} 0%, transparent 60%),
      radial-gradient(ellipse at ${80 - offset}% 100%, ${palette.soft} 0%, transparent 50%),
      linear-gradient(135deg, ${palette.soft} 0%, transparent 100%)
    `,
  }
}

/* ── Intersection observer hook ── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ═══════════════════════════════════════════════
   Specialist Card
   ═══════════════════════════════════════════════ */
function SpecialistCard({
  s, palette, idx, visible, delay,
}: {
  s: { name: string; subject: string; rating: number; reviews: number; price: number; image: string; badge: string | null }
  palette: Palette
  idx: number
  visible: boolean
  delay: number
}) {
  return (
    <Link href="/specialists" className="flex-shrink-0 w-[180px] sm:w-[200px] lg:w-[210px] snap-start">
      <div
        className={`group bg-white rounded-lg border border-slate-200 overflow-hidden
          hover:border-slate-900 hover:shadow-lg hover:-translate-y-0.5
          transition-all duration-200 h-full flex flex-col
          ${visible ? "animate-slide-up" : "opacity-0"}`}
        style={{ animationDelay: `${delay}ms`, ...getDiffuseBg(palette, idx) }}
      >
        {/* Image */}
        <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
          <Image
            src={s.image}
            alt={s.name}
            fill
            className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
            crossOrigin="anonymous"
            sizes="(max-width: 640px) 180px, 210px"
          />
          {s.badge && (
            <span
              className="absolute top-2 left-2 text-white text-[10px] font-bold tracking-wide px-2 py-0.5 rounded"
              style={{ backgroundColor: palette.button }}
            >
              {s.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col flex-1">
          <h3 className="font-bold text-slate-800 text-[13px] leading-tight truncate">{s.name}</h3>
          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{s.subject}</p>

          <div className="flex items-center justify-between mt-auto pt-2.5">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-[11px] font-semibold text-slate-700">{s.rating}</span>
              <span className="text-[10px] text-slate-400">({s.reviews})</span>
            </div>
            <span className="text-[12px] font-bold" style={{ color: palette.price }}>
              {"\u20B4"}{s.price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ═══════════════════════════════════════════════
   Horizontal Snap Slider
   ═══════════════════════════════════════════════ */
function SpecialistSlider({
  title, type, specialists, visible, catalogHref, catalogLabel,
}: {
  title: string
  type: string
  specialists: { name: string; subject: string; rating: number; reviews: number; price: number; image: string; badge: string | null }[]
  visible: boolean
  catalogHref: string
  catalogLabel: string
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const palette = getPalette(type)

  const scroll = useCallback((dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -240 : 240, behavior: "smooth" })
  }, [])

  return (
    <div>
      {/* Section header */}
      <div className={`flex items-end justify-between mb-4 ${visible ? "animate-slide-up" : "opacity-0"}`}>
        <div>
          <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 !text-[length:inherit]" style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", lineHeight: 1.3, letterSpacing: "-0.01em" }}>
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll("left")}
            className="h-7 w-7 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="h-7 w-7 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
          <Link
            href={catalogHref}
            className="hidden sm:flex items-center gap-1 ml-2 text-xs font-semibold hover:underline"
            style={{ color: palette.button }}
          >
            {catalogLabel}
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {specialists.map((s, i) => (
          <SpecialistCard key={i} s={s} palette={palette} idx={i} visible={visible} delay={(i + 1) * 80} />
        ))}

        {/* "View all" card */}
        <Link href={catalogHref} className="flex-shrink-0 w-[180px] sm:w-[200px] lg:w-[210px] snap-start">
          <div
            className={`rounded-lg border overflow-hidden hover:border-slate-900 transition-all h-full flex flex-col items-center justify-center min-h-[300px] sm:min-h-[330px] group cursor-pointer
              ${visible ? "animate-slide-up" : "opacity-0"}`}
            style={{ backgroundColor: B.light, borderColor: B.mid, animationDelay: "500ms" }}
          >
            <div
              className="h-10 w-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
              style={{ backgroundColor: palette.button }}
            >
              <ArrowRight className="h-4 w-4 text-white" />
            </div>
            <span className="text-xs font-bold" style={{ color: palette.button }}>{catalogLabel}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   Home Page
   ══════════════════════════════════════════════════════════ */
export default function HomePageClient() {
  const { user } = useAuth()
  const { t } = useTranslation(user?.language || "UA")
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)

  const specialistHref = user?.role === "client" ? "/client/requests/new" : "/specialists"

  /* Header scroll state */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  /* Section observers */
  const tutors = useInView()
  const psychologists = useInView()
  const speechTherapists = useInView()
  const how = useInView()
  const price = useInView()
  const revs = useInView()
  const faqSec = useInView()
  const ctaSec = useInView()

  /* ── Mock data ── */
  const tutorSlides = [
    { name: "Олена Іваненко", subject: "Англійська мова", rating: 4.9, reviews: 48, price: 400, image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80", badge: "TOP" },
    { name: "Андрій Петренко", subject: "Математика", rating: 4.8, reviews: 35, price: 350, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", badge: null },
    { name: "Ірина Бондар", subject: "Фізика", rating: 4.7, reviews: 28, price: 380, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80", badge: null },
    { name: "Тетяна Шевченко", subject: "Хімія", rating: 4.9, reviews: 41, price: 420, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80", badge: null },
    { name: "Дмитро Козак", subject: "Українська мова", rating: 5.0, reviews: 62, price: 360, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", badge: "TOP" },
  ]

  const psychologistSlides = [
    { name: "Марія Коваленко", subject: "Дитяча психологія", rating: 5.0, reviews: 62, price: 600, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80", badge: "TOP" },
    { name: "Наталія Кравчук", subject: "Сімейна терапія", rating: 4.9, reviews: 55, price: 700, image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80", badge: null },
    { name: "Олександр Тимчук", subject: "Когнітивна терапія", rating: 4.8, reviews: 38, price: 550, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80", badge: null },
    { name: "Вікторія Лисенко", subject: "Підліткова психологія", rating: 4.9, reviews: 44, price: 650, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80", badge: null },
  ]

  const speechSlides = [
    { name: "Анна Мельник", subject: "Корекція мовлення", rating: 4.9, reviews: 41, price: 500, image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80", badge: "TOP" },
    { name: "Юлія Савченко", subject: "Заїкання", rating: 5.0, reviews: 33, price: 550, image: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?auto=format&fit=crop&w=400&q=80", badge: null },
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
      lessons: "4 уроки", name: t("pricing.item1.title"), price: "990 \u20B4",
      desc: t("pricing.item1.desc"),
      features: ["4 заняття з репетитором", "Доступ до матеріалів", "Домашні завдання", "Підтримка вчителя"],
      highlight: false,
    },
    {
      lessons: "12 уроків", name: t("pricing.item2.title"), price: "2199 \u20B4", oldPrice: "2590 \u20B4", badge: "ВИГІДНО",
      desc: t("pricing.item2.desc"),
      features: ["12 занять з репетитором", "Повний доступ до матеріалів", "Детальний фідбек", "Тести прогресу", "Персоналізовані сесії"],
      highlight: true,
    },
    {
      lessons: "24 уроки", name: t("pricing.item3.title"), price: "5199 \u20B4",
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
    <div className="min-h-screen bg-white">
      {/* ═══ Sticky Header ═══ */}
      <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm transition-shadow duration-200 ${scrolled ? "shadow-sm border-b border-slate-100" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative h-8 w-8 overflow-hidden rounded-lg flex-shrink-0">
                <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
              </div>
              <span className="text-sm font-bold text-slate-800 tracking-tight hidden sm:block">LIBITUM</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href={specialistHref} className="text-[13px] text-slate-600 hover:text-slate-900 transition-colors">{t("nav.specialists")}</Link>
              <Link href="#how" className="text-[13px] text-slate-600 hover:text-slate-900 transition-colors">{t("nav.how_it_works")}</Link>
              <Link href="#reviews" className="text-[13px] text-slate-600 hover:text-slate-900 transition-colors">{t("nav.reviews")}</Link>
              <LanguageSwitcher />
            </nav>

            <div className="flex items-center gap-2">
              {user ? (
                <Link href={user.role === "specialist" ? "/tutor" : user.role === "admin" ? "/admin" : "/client"}>
                  <Button className="h-8 rounded-md px-4 text-xs font-semibold text-white cursor-pointer" style={{ backgroundColor: B.pri }}>
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" className="h-8 rounded-md px-4 text-xs text-slate-600 border-slate-200 hover:bg-slate-50 cursor-pointer">
                      {t("btn.login")}
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="h-8 rounded-md px-4 text-xs font-semibold text-white cursor-pointer" style={{ backgroundColor: B.pri }}>
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
        {/* ═══ Hero headline ═══ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-2">
          <p className="text-[13px] font-bold tracking-widest uppercase mb-2" style={{ color: B.pri }}>
            Libitum Education
          </p>
          <h1
            className="font-bold text-slate-900 tracking-tight text-balance"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}
          >
            {"Професійні репетитори, психологи"}
            <br className="hidden sm:block" />
            {" та логопеди"}
          </h1>
          <p className="text-slate-500 mt-2 text-sm max-w-lg leading-relaxed">{t("hero.subtitle")}</p>
        </section>

        {/* ═══ Tutors ═══ */}
        <section ref={tutors.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <SpecialistSlider title="Репетитори" type="tutor" specialists={tutorSlides} visible={tutors.visible} catalogHref="/specialists" catalogLabel="Всі репетитори" />
        </section>

        {/* ═══ Psychologists ═══ */}
        <section ref={psychologists.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <SpecialistSlider title="Психологи" type="health" specialists={psychologistSlides} visible={psychologists.visible} catalogHref="/specialists" catalogLabel="Всі психологи" />
        </section>

        {/* ═══ Speech Therapists ═══ */}
        <section ref={speechTherapists.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-10">
          <SpecialistSlider title="Логопеди" type="health" specialists={speechSlides} visible={speechTherapists.visible} catalogHref="/specialists" catalogLabel="Всі логопеди" />
        </section>

        {/* ═══ How it works ═══ */}
        <section ref={how.ref} id="how" className="py-14 sm:py-20" style={{ backgroundColor: B.light }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-10 ${how.visible ? "animate-slide-up" : "opacity-0"}`}>
              <h2 className="font-bold text-slate-800 text-balance" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}>
                {t("nav.how_it_works")}
              </h2>
              <p className="text-slate-500 text-sm mt-1.5 max-w-md mx-auto">{t("how.subtitle")}</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {steps.map((step, i) => (
                <div key={i} className={`text-center ${how.visible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: `${(i + 1) * 150}ms` }}>
                  <div className="h-11 w-11 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: B.pri }}>
                    <span className="text-sm font-bold text-white">{step.num}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1 !text-[14px]">{step.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href={specialistHref}>
                <Button className="h-10 rounded-md px-6 text-sm font-semibold text-white cursor-pointer" style={{ backgroundColor: B.pri }}>
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ Pricing ═══ */}
        <section ref={price.ref} id="plans" className="py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-10 ${price.visible ? "animate-slide-up" : "opacity-0"}`}>
              <h2 className="font-bold text-slate-800 text-balance" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}>
                {"Обери свій план"}
              </h2>
              <p className="text-slate-500 text-sm mt-1.5">{t("pricing.subtitle")}</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {pricing.map((plan, i) => (
                <div
                  key={i}
                  className={`relative rounded-lg p-5 border transition-colors hover:border-slate-900
                    ${plan.highlight ? "border-2 bg-white" : "bg-white border-slate-200"}
                    ${price.visible ? "animate-slide-up" : "opacity-0"}`}
                  style={{
                    animationDelay: `${(i + 1) * 120}ms`,
                    ...(plan.highlight ? { borderColor: B.pri } : {}),
                  }}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-4 text-white text-[10px] font-bold px-2.5 py-0.5 rounded" style={{ backgroundColor: B.pri }}>
                      {plan.badge}
                    </div>
                  )}

                  <div
                    className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold mb-3"
                    style={plan.highlight ? { backgroundColor: B.pri, color: "white" } : { backgroundColor: B.light, color: B.pri }}
                  >
                    {plan.lessons}
                  </div>

                  <h3 className="text-sm font-bold mb-1.5 !text-[14px]" style={{ color: B.pri }}>{plan.name}</h3>

                  <div className="flex items-baseline gap-2 mb-4">
                    {plan.oldPrice && <span className="text-xs line-through text-slate-400">{plan.oldPrice}</span>}
                    <span className="text-xl font-bold text-slate-800">{plan.price}</span>
                  </div>

                  <Button
                    className="w-full h-9 rounded-md font-semibold mb-4 cursor-pointer text-sm text-white"
                    style={plan.highlight ? { backgroundColor: B.pri } : { backgroundColor: "#1e293b" }}
                  >
                    {"Обрати"}
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>

                  <div className="space-y-2">
                    {plan.features.map((f, j) => (
                      <div key={j} className="flex items-start gap-1.5">
                        <Check className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" style={{ color: B.pri }} />
                        <span className="text-xs text-slate-600">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Reviews ═══ */}
        <section ref={revs.ref} id="reviews" className="py-14 sm:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-8 ${revs.visible ? "animate-slide-up" : "opacity-0"}`}>
              <h2 className="font-bold text-slate-800 text-balance" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}>
                {t("nav.reviews")}
              </h2>
              <p className="text-slate-500 text-sm mt-1.5">{t("reviews.subtitle")}</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {reviews.map((review, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-lg p-4 border border-slate-200 hover:border-slate-900 transition-colors
                    ${revs.visible ? "animate-slide-up" : "opacity-0"}`}
                  style={{ animationDelay: `${(i + 1) * 120}ms` }}
                >
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-2 leading-relaxed text-xs">{'"'}{review.text}{'"'}</p>
                  <div className="text-xs font-semibold text-slate-800">{review.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section ref={faqSec.ref} className="py-14 sm:py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <div className={`text-center mb-8 ${faqSec.visible ? "animate-slide-up" : "opacity-0"}`}>
              <h2 className="font-bold text-slate-800 text-balance" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}>
                {"Часті запитання"}
              </h2>
              <p className="text-slate-500 text-sm mt-1.5">{t("faq.subtitle")}</p>
            </div>

            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-lg overflow-hidden border border-slate-200 hover:border-slate-900 transition-all
                    ${faqSec.visible ? "animate-slide-up" : "opacity-0"}`}
                  style={{ animationDelay: `${(i + 1) * 80}ms` }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-slate-800 text-sm">{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 flex-shrink-0 ml-3 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ease-in-out ${openFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className="px-4 pb-3 text-slate-600 leading-relaxed text-sm">{faq.a}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section ref={ctaSec.ref} className="py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`rounded-lg p-8 sm:p-12 text-center ${ctaSec.visible ? "animate-scale-in" : "opacity-0"}`}
              style={{ backgroundColor: B.light, border: `1px solid ${B.mid}` }}
            >
              <h2 className="font-bold text-slate-800 mb-2 text-balance" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}>
                {t("cta.title")}
              </h2>
              <p className="text-slate-600 mb-6 max-w-md mx-auto text-sm">{t("cta.subtitle")}</p>
              <Link href={specialistHref}>
                <Button className="h-10 rounded-md px-6 text-sm font-semibold text-white cursor-pointer" style={{ backgroundColor: B.pri }}>
                  {t("cta.button")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ═══ Footer ═══ */}
      <footer className="bg-slate-800 text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-3">
                <div className="relative h-7 w-7 overflow-hidden rounded-md flex-shrink-0">
                  <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
                </div>
                <span className="font-bold text-sm">LIBITUM</span>
              </Link>
              <p className="text-slate-400 text-xs leading-relaxed">{t("about.desc")}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-xs">{t("contact.title")}</h4>
              <div className="space-y-1.5 text-xs text-slate-400">
                <p>{t("contact.email")}</p>
                <p>{t("contact.telegram")}</p>
                <p>{t("contact.hours")}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-xs">{t("rules.title")}</h4>
              <div className="space-y-1.5 text-xs text-slate-400">
                <p>{t("rules.item1")}</p>
                <p>{t("rules.item2")}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-xs">{"Навігація"}</h4>
              <div className="space-y-1.5 text-xs">
                <Link href={specialistHref} className="block text-slate-400 hover:text-white transition-colors">{t("nav.specialists")}</Link>
                <Link href="#how" className="block text-slate-400 hover:text-white transition-colors">{t("nav.how_it_works")}</Link>
                <Link href="#reviews" className="block text-slate-400 hover:text-white transition-colors">{t("nav.reviews")}</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-5 text-center text-xs text-slate-400">
            &copy; 2024 Libitum Education. {t("footer.rights")}
          </div>
        </div>
      </footer>
    </div>
  )
}
