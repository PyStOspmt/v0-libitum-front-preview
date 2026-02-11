"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Check,
  ChevronDown,
  Star,
  GraduationCap,
  Brain,
  MessageCircle,
} from "lucide-react"

import { useAuth } from "@/lib/auth-context"
import { useTranslation } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"
import { HeroSpotlight } from "@/components/home/hero-spotlight"
import { SpecialistSlider } from "@/components/home/specialist-slider"
import { SquishyButton } from "@/components/home/squishy-button"
import { AnimatedCounter } from "@/components/home/animated-counter"
import { TrustMarquee } from "@/components/home/trust-marquee"
import { MorphBlob } from "@/components/home/morph-blob"
import { InkRippleLayer } from "@/components/home/ink-ripple"
import { TiltCard } from "@/components/home/tilt-card"

/* ── Brand palette ── */
const B = {
  pri: "#009688",
  dark: "#00796B",
  light: "#E0F2F1",
  mid: "#B2DFDB",
} as const

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

/* ══════════════════════════════════════════════════════════
   Home Page — Premium Orchestrator
   ══════════════════════════════════════════════════════════ */
export default function HomePageClient() {
  const { user } = useAuth()
  const { t } = useTranslation(user?.language || "UA")
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)

  const specialistHref = user?.role === "client" ? "/client/requests/new" : "/specialists"

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const stats = useInView(0.2)
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
      <header
        className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? "bg-white/80 shadow-sm border-b border-slate-100/80"
            : "bg-white/95"
        }`}
      >
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
                  <SquishyButton bgColor={B.pri} className="h-8 rounded-md px-4 text-xs">
                    Dashboard
                  </SquishyButton>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <SquishyButton variant="outline" className="h-8 rounded-md px-4 text-xs">
                      {t("btn.login")}
                    </SquishyButton>
                  </Link>
                  <Link href="/register">
                    <SquishyButton bgColor={B.pri} className="h-8 rounded-md px-4 text-xs">
                      {t("btn.register")}
                    </SquishyButton>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* ═══ Hero with Spotlight + Ink Ripple + Scramble Text ═══ */}
        <HeroSpotlight>
          {/* Ink ripple — click anywhere in hero to see expanding teal rings */}
          <InkRippleLayer />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-4 relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[13px] font-bold tracking-widest uppercase mb-3"
              style={{ color: B.pri }}
            >
              Libitum Education
            </motion.p>

            <h1
              className="font-bold text-slate-900 tracking-tight text-balance leading-tight"
              style={{ fontSize: "clamp(1.5rem, 4vw, 2.75rem)", letterSpacing: "-0.025em" }}
            >
              Професійні репетитори, психологи
              <br className="hidden sm:block" />
              та логопеди
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-slate-500 mt-3 text-sm max-w-lg leading-relaxed"
            >
              {t("hero.subtitle")}
            </motion.p>

            {/* CTA with morphing blob behind it */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="mt-6 relative inline-block"
            >
              <MorphBlob
                color="rgba(0,150,136,0.07)"
                size={200}
                className="absolute -top-16 -left-16 z-0"
              />
              <Link href={specialistHref} className="relative z-10">
                <SquishyButton bgColor={B.pri} className="h-10 rounded-lg px-6 text-sm inline-flex items-center gap-2">
                  {t("hero.cta")}
                  <ArrowRight className="h-4 w-4" />
                </SquishyButton>
              </Link>
            </motion.div>
          </div>
        </HeroSpotlight>

        {/* ═══ Tutors ═══ */}
        <section ref={tutors.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
          <SpecialistSlider title="Репетитори" type="tutor" icon={GraduationCap} specialists={tutorSlides} visible={tutors.visible} catalogHref="/specialists" catalogLabel="Всі репетитори" />
        </section>

        {/* ═══ Psychologists ═══ */}
        <section ref={psychologists.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <SpecialistSlider title="Психологи" type="health" icon={Brain} specialists={psychologistSlides} visible={psychologists.visible} catalogHref="/specialists" catalogLabel="Всі психологи" />
        </section>

        {/* ═══ Speech Therapists ═══ */}
        <section ref={speechTherapists.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-6">
          <SpecialistSlider title="Логопеди" type="health" icon={MessageCircle} specialists={speechSlides} visible={speechTherapists.visible} catalogHref="/specialists" catalogLabel="Всі логопеди" />
        </section>

        {/* ═══ Stats Counter ═══ */}
        <section ref={stats.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatedCounter visible={stats.visible} />
        </section>

        {/* ═══ Trust Marquee ═══ */}
        <TrustMarquee />

        {/* ═══ How it works ═══ */}
        <section ref={how.ref} id="how" className="py-14 sm:py-20 relative grain-overlay" style={{ backgroundColor: B.light }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={how.visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="font-bold text-slate-800 text-balance tracking-tight" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}>
                {t("nav.how_it_works")}
              </h2>
              <p className="text-slate-500 text-sm mt-1.5 max-w-md mx-auto">{t("how.subtitle")}</p>
            </motion.div>

            <div className="relative grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {/* Connecting line between steps (desktop) */}
              <div className="hidden sm:block absolute top-[22px] left-[16.67%] right-[16.67%] h-[2px] bg-gradient-to-r from-transparent via-teal-200 to-transparent z-0" />

              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={how.visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: (i + 1) * 0.15, duration: 0.5 }}
                  className="text-center relative z-10"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="h-11 w-11 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-md"
                    style={{ backgroundColor: B.pri }}
                  >
                    <span className="text-sm font-bold text-white">{step.num}</span>
                  </motion.div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1 tracking-tight">{step.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href={specialistHref}>
                <SquishyButton bgColor={B.pri} className="h-10 rounded-lg px-6 text-sm inline-flex items-center gap-2">
                  {t("hero.cta")}
                  <ArrowRight className="h-4 w-4" />
                </SquishyButton>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ Pricing ═══ */}
        <section ref={price.ref} id="plans" className="py-14 sm:py-20 relative overflow-hidden">
          {/* Floating gradient orbs */}
          <div className="absolute top-20 -left-32 w-64 h-64 rounded-full bg-emerald-100/40 blur-3xl animate-orb pointer-events-none" />
          <div className="absolute bottom-20 -right-32 w-72 h-72 rounded-full bg-amber-100/30 blur-3xl animate-orb-slow pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={price.visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="font-bold text-slate-800 text-balance tracking-tight" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}>
                {"Обери свій план"}
              </h2>
              <p className="text-slate-500 text-sm mt-1.5">{t("pricing.subtitle")}</p>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {pricing.map((plan, i) => (
                <TiltCard key={i} className="rounded-xl" intensity={6}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={price.visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: (i + 1) * 0.12, duration: 0.5 }}
                    className={`relative rounded-xl p-5 border transition-colors backdrop-blur-sm h-full
                      ${plan.highlight ? "border-2 bg-white/80 shadow-lg" : "bg-white/70 border-slate-200 hover:border-slate-300"}`}
                    style={plan.highlight ? { borderColor: B.pri } : {}}
                  >
                  {plan.badge && (
                    <div className="absolute -top-3 left-4 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md" style={{ backgroundColor: B.pri }}>
                      {plan.badge}
                    </div>
                  )}

                  <div
                    className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold mb-3"
                    style={plan.highlight ? { backgroundColor: B.pri, color: "white" } : { backgroundColor: B.light, color: B.pri }}
                  >
                    {plan.lessons}
                  </div>

                  <h3 className="text-sm font-bold mb-1.5 tracking-tight" style={{ color: B.pri }}>{plan.name}</h3>

                  <div className="flex items-baseline gap-2 mb-4">
                    {plan.oldPrice && <span className="text-xs line-through text-slate-400">{plan.oldPrice}</span>}
                    <span className="text-xl font-bold text-slate-800 tracking-tight">{plan.price}</span>
                  </div>

                  <SquishyButton
                    bgColor={plan.highlight ? B.pri : "#1e293b"}
                    className="w-full h-9 rounded-lg mb-4 text-sm inline-flex items-center justify-center gap-1.5"
                  >
                    {"Обрати"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </SquishyButton>

                  <div className="space-y-2">
                    {plan.features.map((f, j) => (
                      <div key={j} className="flex items-start gap-1.5">
                        <Check className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" style={{ color: B.pri }} />
                        <span className="text-xs text-slate-600">{f}</span>
                      </div>
                    ))}
                  </div>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Reviews ═══ */}
        <section ref={revs.ref} id="reviews" className="py-14 sm:py-20 bg-slate-50/80 relative grain-overlay">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={revs.visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h2 className="font-bold text-slate-800 text-balance tracking-tight" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}>
                {t("nav.reviews")}
              </h2>
              <p className="text-slate-500 text-sm mt-1.5">{t("reviews.subtitle")}</p>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {reviews.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={revs.visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: (i + 1) * 0.12, duration: 0.5 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-2 leading-relaxed text-xs">{'"'}{review.text}{'"'}</p>
                  <div className="text-xs font-semibold text-slate-800">{review.name}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section ref={faqSec.ref} className="py-14 sm:py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={faqSec.visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h2 className="font-bold text-slate-800 text-balance tracking-tight" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}>
                {"Часті запитання"}
              </h2>
              <p className="text-slate-500 text-sm mt-1.5">{t("faq.subtitle")}</p>
            </motion.div>

            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={faqSec.visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: (i + 1) * 0.08, duration: 0.4 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-200/80 hover:border-slate-300 transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50/50 transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-slate-800 text-sm tracking-tight">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0 ml-3" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-3 text-slate-600 leading-relaxed text-sm">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section ref={ctaSec.ref} className="py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={ctaSec.visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden grain-overlay"
              style={{ backgroundColor: B.light, border: `1px solid ${B.mid}` }}
            >
              {/* Shimmer glow behind CTA */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full shimmer-glow -z-0"
                style={{ backgroundColor: B.pri }}
              />
              <div className="relative z-10">
                <h2 className="font-bold text-slate-800 mb-2 text-balance tracking-tight" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}>
                  {t("cta.title")}
                </h2>
                <p className="text-slate-600 mb-6 max-w-md mx-auto text-sm">{t("cta.subtitle")}</p>
                <Link href={specialistHref}>
                  <SquishyButton bgColor={B.pri} className="h-10 rounded-lg px-6 text-sm inline-flex items-center gap-2">
                    {t("cta.button")}
                    <ArrowRight className="h-4 w-4" />
                  </SquishyButton>
                </Link>
              </div>
            </motion.div>
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
                <span className="font-bold text-sm tracking-tight">LIBITUM</span>
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
