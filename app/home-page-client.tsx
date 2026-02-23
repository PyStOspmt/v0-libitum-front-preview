"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useCallback, useEffect } from "react"
import { ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, Search, Star, MessageCircle, Menu, X, CheckCircle2 } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"

import { useAuth } from "@/lib/auth-context"
import { useTranslation } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"

const tutors = [
  {
    id: "1",
    name: "Олена І.",
    specialization: "Репетитор",
    subjects: ["Англійська мова", "Німецька мова"],
    rating: 4.9,
    reviews: 48,
    price: 400,
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    name: "Анна С.",
    specialization: "Репетитор",
    subjects: ["Математика", "Фізика"],
    rating: 4.9,
    reviews: 89,
    price: 350,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    name: "Дмитро В.",
    specialization: "Репетитор",
    subjects: ["Програмування", "Веб-розробка"],
    rating: 5.0,
    reviews: 120,
    price: 500,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "10",
    name: "Катерина С.",
    specialization: "Репетитор",
    subjects: ["Хімія", "Біологія"],
    rating: 5.0,
    reviews: 75,
    price: 450,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "11",
    name: "Максим Л.",
    specialization: "Репетитор",
    subjects: ["Англійська мова", "IELTS"],
    rating: 4.9,
    reviews: 210,
    price: 550,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "12",
    name: "Софія М.",
    specialization: "Репетитор",
    subjects: ["Українська мова", "ЗНО"],
    rating: 4.8,
    reviews: 94,
    price: 350,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  }
];

const psychologists = [
  {
    id: "2",
    name: "Марія К.",
    specialization: "Психолог",
    subjects: ["Індивідуальна терапія", "Сімейна терапія"],
    rating: 5.0,
    reviews: 62,
    price: 600,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "6",
    name: "Олександр М.",
    specialization: "Психолог",
    subjects: ["Дитяча психологія", "Стрес"],
    rating: 4.8,
    reviews: 45,
    price: 550,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "7",
    name: "Вікторія Д.",
    specialization: "Психолог",
    subjects: ["Когнітивно-поведінкова терапія"],
    rating: 4.9,
    reviews: 112,
    price: 700,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "13",
    name: "Роман П.",
    specialization: "Психолог",
    subjects: ["Підліткова психологія", "Депресія"],
    rating: 4.7,
    reviews: 40,
    price: 500,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "14",
    name: "Юлія Т.",
    specialization: "Психолог",
    subjects: ["Арт-терапія", "Тривожність"],
    rating: 5.0,
    reviews: 88,
    price: 650,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "15",
    name: "Денис В.",
    specialization: "Психолог",
    subjects: ["Гештальт-терапія", "Кризи"],
    rating: 4.8,
    reviews: 65,
    price: 550,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  }
];

const speechTherapists = [
  {
    id: "3",
    name: "Ігор П.",
    specialization: "Логопед",
    subjects: ["Корекція звуковимови", "Розвиток мовлення"],
    rating: 4.8,
    reviews: 35,
    price: 450,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "8",
    name: "Наталія Л.",
    specialization: "Логопед",
    subjects: ["Постановка звуків", "Логопедичний масаж"],
    rating: 5.0,
    reviews: 80,
    price: 500,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80", /* placeholder */
  },
  {
    id: "9",
    name: "Євген С.",
    specialization: "Логопед",
    subjects: ["Дизартрія", "Заїкання"],
    rating: 4.7,
    reviews: 29,
    price: 400,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80", /* placeholder */
  },
  {
    id: "16",
    name: "Ірина К.",
    specialization: "Логопед",
    subjects: ["Алалія", "Дошкільнята"],
    rating: 4.9,
    reviews: 82,
    price: 450,
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "17",
    name: "Анастасія Ф.",
    specialization: "Логопед",
    subjects: ["Розвиток мовлення", "Дислексія"],
    rating: 5.0,
    reviews: 50,
    price: 500,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "18",
    name: "Павло З.",
    specialization: "Логопед",
    subjects: ["Корекція звуковимови", "Масаж"],
    rating: 4.8,
    reviews: 41,
    price: 350,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  }
];

// Reusable Carousel Component for specialized lists
function SpecialistCarousel({ title, specialists, theme }: { title: string, specialists: any[], theme: 'teal' | 'amber' }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: true,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isTouchMode, setIsTouchMode] = useState(false)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none) and (pointer: coarse)")

    const syncTouchMode = () => {
      setIsTouchMode(mediaQuery.matches)
    }

    syncTouchMode()
    mediaQuery.addEventListener("change", syncTouchMode)

    return () => {
      mediaQuery.removeEventListener("change", syncTouchMode)
    }
  }, [])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi])

  // Define color tokens based on the theme prop
  const themeClasses: Record<'teal' | 'amber', { bg: string, text: string, borderHighlight: string, arrowBg: string, arrowText: string, pill: string }> = {
    teal: { bg: 'group-hover:bg-[#e8fffb]', text: 'group-hover:text-[#00a389]', borderHighlight: 'group-hover:border-[#00c5a6]/30', arrowBg: 'bg-[#00c5a6]/10 group-hover:bg-[#00c5a6]', arrowText: 'text-[#00c5a6] group-hover:text-[#121117]', pill: 'bg-[#e8fffb] text-[#00a389]' },
    amber: { bg: 'group-hover:bg-[#fff8e1]', text: 'group-hover:text-[#d87b00]', borderHighlight: 'group-hover:border-[#ffc800]/40', arrowBg: 'bg-[#ffc800]/20 group-hover:bg-[#ffc800]', arrowText: 'text-[#d87b00] group-hover:text-[#121117]', pill: 'bg-[#fff8e1] text-[#d87b00]' },
  };

  const tClass = themeClasses[theme];
  const activeThemeClasses = theme === "teal"
    ? {
      card: "border-[#00c5a6]/30 shadow-[0_12px_40px_rgba(0,0,0,0.12)]",
      text: "text-[#00a389]",
      chip: "bg-[#e8fffb] text-[#00a389] border-[#00c5a6]/30",
      arrow: "bg-[#00c5a6] text-[#121117]",
      deco: "opacity-[0.06] scale-[1.8]",
      divider: "border-slate-200",
    }
    : {
      card: "border-[#ffc800]/40 shadow-[0_12px_40px_rgba(0,0,0,0.12)]",
      text: "text-[#d87b00]",
      chip: "bg-[#fff8e1] text-[#d87b00] border-[#ffc800]/40",
      arrow: "bg-[#ffc800] text-[#121117]",
      deco: "opacity-[0.06] scale-[1.8]",
      divider: "border-slate-200",
    }

  return (
    <div className="mb-10 last:mb-0 relative z-20 max-w-[1440px] mx-auto">
      <div className="flex items-center justify-between mb-4 px-3 sm:px-6 lg:px-8">
        <h2 className="text-[22px] sm:text-[28px] font-bold tracking-tight text-[#121117]">
          {title}
        </h2>
        <div className="hidden sm:flex gap-2">
          <button
            onClick={scrollPrev}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-[#121117] hover:bg-white hover:border-slate-300 transition-colors shadow-sm bg-white/50"
            aria-label="Previous specialist"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-[#121117] hover:bg-white hover:border-slate-300 transition-colors shadow-sm bg-white/50"
            aria-label="Next specialist"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden pb-8 pt-2" ref={emblaRef}>
        <div className="flex touch-pan-y gap-3 sm:gap-6 px-3 sm:px-6 lg:px-8" style={{ backfaceVisibility: 'hidden' }}>
          {specialists.map((specialist, idx) => {
            const isActiveSlide = isTouchMode && selectedIndex === idx

            return (
              <div
                key={specialist.id}
                className="flex-none w-[92vw] sm:w-[320px] md:w-[340px] min-w-0"
              >
                <Link href={`/specialists/${specialist.id}`} className="block h-full group">
                  <div className={`bg-white border flex-1 border-slate-200/80 rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] ${tClass.borderHighlight} transition-all duration-300 h-full flex flex-col items-start translate-y-0 hover:-translate-y-1.5 relative overflow-hidden ${isActiveSlide ? activeThemeClasses.card : ""}`}>

                    {/* Subtle background decoration */}
                    <div className={`absolute -right-12 -top-12 w-32 h-32 rounded-full opacity-[0.03] transition-transform duration-500 group-hover:scale-[1.8] group-hover:opacity-[0.06] ${theme === 'teal' ? 'bg-[#00c5a6]' : 'bg-[#ffc800]'} ${isActiveSlide ? activeThemeClasses.deco : ''}`} />

                    <div className="flex gap-4 items-start w-full mb-5 relative z-10">
                      <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden shrink-0 shadow-sm border-2 border-white ring-1 ring-slate-100">
                        <Image
                          src={specialist.image}
                          alt={specialist.name}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          sizes="80px"
                        />
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#00c5a6] border-2 border-white rounded-full"></div>
                      </div>
                      <div className="pt-1 flex-1 min-w-0">
                        <h3 className={`font-bold text-[18px] text-[#121117] leading-tight ${tClass.text} transition-colors truncate ${isActiveSlide ? activeThemeClasses.text : ""}`}>{specialist.name}</h3>
                        <p className="text-[14px] text-[#69686f] font-medium mt-1 truncate">{specialist.specialization}</p>
                        <div className="flex items-center gap-1.5 mt-2.5 bg-[#fff8e1]/80 w-fit px-2 py-0.5 rounded-[6px] border border-[#ffc800]/20">
                          <Star className="w-3.5 h-3.5 fill-[#ffc800] text-[#ffc800]" />
                          <span className="text-[13px] font-bold text-[#f57c00] leading-none">{specialist.rating}</span>
                          <span className="text-[12px] font-medium text-[#f57c00]/80 border-l border-[#f57c00]/20 pl-1.5 ml-0.5 leading-none">
                            {specialist.reviews}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 w-full relative z-10">
                      <div className="flex items-center gap-2 mb-3 text-[13px] text-[#69686f] font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                        <span>Викладає {specialist.subjects.length} {specialist.subjects.length === 1 ? 'предмет' : 'предмети'}</span>
                      </div>
                      <div className="flex flex-wrap items-start gap-2">
                        {specialist.subjects.slice(0, 2).map((subject: string, idx: number) => (
                          <span key={idx} className={`bg-[#f0f3f3] text-[#4d4c53] px-2.5 py-1.5 rounded-[8px] text-[13px] font-[600] leading-tight border border-slate-100 transition-colors ${tClass.bg} ${tClass.text} ${tClass.borderHighlight} ${isActiveSlide ? activeThemeClasses.chip : ""}`}>
                            {subject}
                          </span>
                        ))}
                        {specialist.subjects.length > 2 && (
                          <span className={`bg-[#f0f3f3] text-[#4d4c53] px-2.5 py-1.5 rounded-[8px] text-[13px] font-[600] leading-tight border border-slate-100 transition-colors ${tClass.bg} ${tClass.text} ${tClass.borderHighlight} ${isActiveSlide ? activeThemeClasses.chip : ""}`}>
                            +{specialist.subjects.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className={`flex items-center justify-between pt-4 border-t border-gray-100 mt-auto w-full group-hover:border-slate-200 transition-colors relative z-10 ${isActiveSlide ? activeThemeClasses.divider : ""}`}>
                      <div>
                        <span className="text-[20px] font-bold text-[#121117]">₴{specialist.price}</span>
                        <span className="text-[13px] text-[#69686f] ml-1 font-medium">/ год</span>
                      </div>
                      <div className={`px-4 py-2 rounded-[10px] text-[14px] font-[700] transition-all duration-300 flex items-center gap-1.5 ${tClass.arrowBg} ${tClass.arrowText} ${isActiveSlide ? activeThemeClasses.arrow : ""}`}>
                        Детальніше
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export function HomePageClient() {
  const { user } = useAuth()
  const { t } = useTranslation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const dashboardHref = user?.role === "client" ? "/client" : user?.role === "specialist" ? "/tutor" : "/admin"
  const specialistHref = user?.role === "client" ? "/client/specialists" : "/specialists"

  const faqs = [
    { q: t("faq.q1.q"), a: t("faq.q1.a") },
    { q: t("faq.q2.q"), a: t("faq.q2.a") },
    { q: t("faq.q3.q"), a: t("faq.q3.a") },
    { q: t("faq.q4.q"), a: t("faq.q4.a") },
  ]

  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans">
      {/* Preply-style Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
          {/* Left: Logo + Primary Nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-md">
                <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
              </div>
              <span className="font-bold text-xl tracking-tight text-[#121117]">Libitum</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6 text-[15px] font-medium text-[#121117]">
              <Link href={specialistHref} className="hover:text-primary transition-colors">{t("nav.specialists")}</Link>
              <Link href="#how" className="hover:text-primary transition-colors">{t("nav.how_it_works")}</Link>
              <Link href="#reviews" className="hover:text-primary transition-colors">{t("nav.reviews")}</Link>
            </nav>
          </div>

          {/* Right: Secondary Nav + Auth (Desktop) */}
          <div className="hidden lg:flex items-center gap-4 text-[15px] font-medium text-[#121117]">
            <LanguageSwitcher />

            <div className="flex items-center gap-3 ml-2">
              {user ? (
                <Link href={dashboardHref} className="h-[48px] px-6 rounded-[8px] border-2 border-transparent bg-primary text-[#121117] hover:bg-primary/90 hover:border-[#121117] flex items-center justify-center font-[600] transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/login" className="hover:text-primary transition-colors hidden sm:block px-2 font-[600]">
                    {t("btn.login")}
                  </Link>
                  <Link href="/register" className="h-[48px] px-6 rounded-[8px] border-2 border-transparent bg-primary text-[#121117] hover:bg-primary/90 hover:border-[#121117] flex items-center justify-center font-[600] transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                    {t("btn.register")}
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="hover:bg-gray-100 transition-colors rounded-full ml-1"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-[#121117]" />
              ) : (
                <Menu className="h-6 w-6 text-[#121117]" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-[72px] left-0 w-full bg-white border-b border-gray-200 shadow-lg p-4 flex flex-col gap-4 z-40">
            <nav className="flex flex-col gap-4 text-[16px] font-medium text-[#121117] border-b border-gray-100 pb-4">
              <Link href={specialistHref} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors py-2">{t("nav.specialists")}</Link>
              <Link href="#how" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors py-2">{t("nav.how_it_works")}</Link>
              <Link href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors py-2">{t("nav.reviews")}</Link>
            </nav>
            <div className="flex flex-col gap-3 pt-2">
              {user ? (
                <Link href={dashboardHref} className="h-[48px] w-full rounded-[8px] bg-primary text-[#121117] hover:bg-primary/90 flex items-center justify-center font-[600] transition-colors">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/login" className="h-[48px] w-full rounded-[8px] border-2 border-[#121117] text-[#121117] hover:bg-gray-50 flex items-center justify-center font-[600] transition-colors">
                    {t("btn.login")}
                  </Link>
                  <Link href="/register" className="h-[48px] w-full rounded-[8px] bg-primary text-[#121117] hover:bg-primary/90 flex items-center justify-center font-[600] transition-colors">
                    {t("btn.register")}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Preply-style Hero Section */}
        <section className="bg-[#f0f3f3]/50 relative overflow-visible pt-6 pb-8 lg:pt-10 lg:pb-10 border-b border-gray-200/50">
          <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 relative">

            {/* Left Content */}
            <div className="w-full lg:w-[55%] xl:w-[50%] z-10 relative">
              <div className="absolute -top-12 -left-8 w-[54px] h-[53px] text-[#ffc800] z-20 animate-[spin_10s_linear_infinite] opacity-80 hidden md:block">
                <svg viewBox="0 0 54 53" fill="currentColor"><path fillRule="evenodd" d="M25.753.033c-3.111 2.37-5.076 5.617-7.859 8.283-4.008-2.656-7.798-5.322-11.834-7.792-2.316 4.39-3.791 9.176-5.46 13.882-5.405-3.32-10.45-6.852-16.143-9.87 0 5.485.498 10.873 2.062 16.111-5.187-.638-10.364-1.392-15.421-2.483 3.197 5.093 7.391 9.544 11.666 13.874-5.309 2.502-10.395 5.253-15.688 7.771 4.542 3.847 9.877 6.574 15.358 8.922-3.816 4.321-7.737 8.57-11.841 12.632 6.002 1.547 11.968 2.651 18.068 3.018-2.167 5.176-4.524 10.231-7.147 15.095 5.602-2.112 11.026-4.665 16.27-7.397.643 5.752 1.096 11.558 1.157 17.387 5.561-3.693 10.597-8.026 15.405-12.441 2.709 5.267 5.503 10.493 8.563 15.525 4.095-4.646 8.356-9.141 12.196-14.043 4.52 4.417 8.956 8.917 13.567 13.256-2.179-6.326-4.009-12.78-5.69-19.167 5.343 3.654 11.233 6.643 16.994 9.68-1.574-5.69-3.268-11.332-5.46-16.786 5.864 1.761 11.921 3.268 18.021 4.095-3.08-4.789-6.666-9.284-10.28-13.676 5.485-.295 11.01-1.077 16.516-1.921-4.757-3.81-9.983-7.135-15.333-10.05 5.534-1.503 11.166-2.735 16.892-3.791-5.626-2.42-10.961-5.421-16.204-8.583C45.318 20.301 48.337 14.894 51 9.308c-5.741.25-11.458.74-17.166 1.48C37.07 6.136 40.75 1.762 44.821-2.425c-5.913.689-11.758 1.905-17.514 3.411 1.748-4.832 3.847-9.528 5.892-14.188-5.267 1.831-10.375 4.195-15.346 6.837.283-4.646.126-9.284-.334-13.918" clipRule="evenodd"></path></svg>
              </div>

              <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.05] font-bold text-[#121117] tracking-[-0.03em] mb-6 text-center lg:text-left">
                Швидке навчання <br />
                з вашим ідеальним <br />
                <span className="relative inline-block mt-2">
                  спеціалістом.
                  <svg className="absolute -bottom-3 left-0 w-[110%] h-[20px] text-[#ffc800] -z-10" viewBox="0 0 137 13" fill="currentColor" preserveAspectRatio="none"><path fillRule="evenodd" d="M136.009 2.193c-28.775-1.921-57.94-2.884-86.744-1.921C34.821 1.233 20.378 1.956.126 3.161c-.551.066-1.042.868.175 1.096 16.096 3.011 31.91 5.926 48.064 8.71 28.539 4.931 58.077 4.14 86.815-.992 1.391-.25 2.179-2.124.829-9.782z" clipRule="evenodd"></path></svg>
                </span>
              </h1>

              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                <Link
                  href={specialistHref}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-[#121117] border-2 border-transparent text-[16px] font-[600] h-[48px] px-6 rounded-[8px] w-full sm:w-auto hover:bg-primary/90 hover:border-[#121117] transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  Знайти спеціаліста
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="#how"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#121117] border-[2px] border-[#121117] text-[16px] font-[600] h-[48px] px-6 rounded-[8px] w-full sm:w-auto hover:bg-gray-50 transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  Як це працює
                </Link>
              </div>
            </div>

            {/* Right Image/Illustration Area */}
            <div className="w-full lg:w-[45%] xl:w-[50%] relative hidden md:block">
              <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                  alt="Happy student learning"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Paper / Cartoonish floating badge */}
              <div className="absolute top-12 -left-8 bg-white p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 flex items-center gap-4 rotate-[-3deg] animate-[bounce_6s_infinite] z-30">
                <div className="bg-[#ffc800] p-3 rounded-full flex items-center justify-center">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m12 3 2.221 5.942 6.338.277-4.965 3.95 1.696 6.112L12 15.78l-5.29 3.501 1.695-6.113-4.965-3.95 6.338-.276z"></path></svg>
                </div>
                <div>
                  <p className="text-[#121117] font-bold text-lg leading-tight">4.9/5</p>
                  <p className="text-[#69686f] text-sm">Середня оцінка</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Specialists Carousels (Overlapping Hero) */}
        <section className="relative z-20 mt-6 lg:mt-6 pb-12 lg:pb-16 bg-transparent overflow-visible">
          <div className="max-w-[1440px] mx-auto w-full">
            <SpecialistCarousel title="Популярні репетитори" specialists={tutors} theme="teal" />
            <SpecialistCarousel title="Сертифіковані психологи" specialists={psychologists} theme="amber" />
            <SpecialistCarousel title="Досвідчені логопеди" specialists={speechTherapists} theme="amber" />

            <div className="mt-4 flex justify-center w-full px-4 sm:px-0">
              <Link
                href={specialistHref}
                className="inline-flex items-center justify-center gap-2 bg-white text-[#121117] border-[2px] border-slate-200 text-[16px] font-[700] h-[52px] px-8 rounded-[12px] hover:border-[#121117] hover:bg-slate-50 transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-sm"
              >
                Всі спеціалісти <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* How it works (Preply Card Layout) */}
        <section id="how" className="py-20 lg:py-28 relative overflow-hidden bg-white">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#f0f3f3] rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 z-0"></div>

          <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight text-[#121117] mb-4">
                {t("nav.how_it_works")}
              </h2>
              <p className="text-[18px] text-[#69686f] leading-relaxed">
                Почніть свій шлях до нових знань всього за три простих кроки. Ми зробили процес пошуку спеціаліста максимально зручним.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-[#00c5a6]/0 via-[#00c5a6]/30 to-[#00c5a6]/0 z-0"></div>

              {[
                { title: t("how.step1.title"), icon: <Search className="w-8 h-8 text-[#00c5a6]" />, desc: t("how.step1.desc") },
                { title: t("how.step2.title"), icon: <MessageCircle className="w-8 h-8 text-[#00c5a6]" />, desc: t("how.step2.desc") },
                { title: t("how.step3.title"), icon: <CheckCircle2 className="w-8 h-8 text-[#00c5a6]" />, desc: t("how.step3.desc") }
              ].map((step, idx) => (
                <div
                  key={step.title}
                  className="rounded-[20px] sm:rounded-[24px] bg-white p-6 sm:p-8 border border-slate-100 relative z-10 hover:-translate-y-2 transition-transform duration-300 group"
                  style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.04)" }}
                >
                  <div className="w-[80px] h-[80px] rounded-[24px] bg-[#e8fffb] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3 shadow-inner">
                    {step.icon}
                  </div>
                  <div className="absolute top-8 right-8 text-[64px] font-black text-slate-50/80 leading-none pointer-events-none select-none">
                    {idx + 1}
                  </div>
                  <h3 className="text-[24px] font-bold text-[#121117] mb-4 pr-8">{step.title}</h3>
                  <p className="text-[16px] text-[#69686f] leading-relaxed font-medium">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Value Proposition / Guarantee Section */}
        <section className="py-20 bg-[#121117] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-cover bg-center"></div>
          <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-24">
            <div className="w-full md:w-1/2">
              <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-6 leading-tight">
                Гарантуємо якість <br /> <span className="text-[#00c5a6]">кожного заняття</span>
              </h2>
              <p className="text-[18px] text-slate-300 leading-relaxed mb-8">
                Якщо перше заняття вам не сподобається, ми безкоштовно підберемо іншого спеціаліста або повернемо гроші. Ваш результат — наш пріоритет.
              </p>
              <ul className="space-y-4 mb-10">
                {['Перевірені дипломи та сертифікати', 'Реальні відгуки від учнів', 'Безпечна оплата через платформу'].map((text, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#00c5a6]/20 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-[#00c5a6]" />
                    </div>
                    <span className="text-slate-200 font-medium">{text}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={specialistHref}
                className="inline-flex items-center justify-center gap-2 bg-[#00c5a6] text-[#121117] text-[16px] font-[700] h-[52px] px-8 rounded-[12px] hover:bg-[#00a389] transition-colors duration-200"
              >
                Спробувати безкоштовно
              </Link>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="relative rounded-[24px] overflow-hidden shadow-2xl border border-white/10 aspect-[4/3] w-full">
                <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80" alt="Student success" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white text-[#121117] p-6 rounded-[20px] shadow-xl border border-slate-100 flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-[#ffc800]/20 flex items-center justify-center text-[#ffc800]">
                  <Star className="w-7 h-7 fill-[#ffc800]" />
                </div>
                <div>
                  <p className="text-[32px] font-black leading-none mb-1">4.9</p>
                  <p className="text-[14px] text-[#69686f] font-medium">Середній рейтинг</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-[#f8f9fa]">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tight text-[#121117] mb-4">
                Часті запитання
              </h2>
              <p className="text-[18px] text-[#69686f]">Все, що вам потрібно знати про платформу Libitum</p>
            </div>

            <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 overflow-hidden">
              {faqs.map((faq, idx) => (
                <div key={faq.q} className="border-b border-gray-100 last:border-0">
                  <button
                    className={`w-full py-6 px-6 sm:px-8 flex items-center justify-between text-left font-[700] text-[18px] transition-colors duration-200 ${openFaq === idx ? 'text-[#00c5a6] bg-slate-50/50' : 'text-[#121117] hover:bg-slate-50/50'}`}
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  >
                    <span className="pr-4">{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${openFaq === idx ? 'bg-[#e8fffb] text-[#00c5a6]' : 'bg-slate-100 text-slate-500'}`}>
                      <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`} />
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="pb-8 px-6 sm:px-8 pt-2">
                      <p className="text-[16px] text-[#69686f] leading-relaxed font-medium">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Preply-style Footer */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-12 text-[15px]">
          <div>
            <p className="font-bold text-[#121117] text-lg mb-4">LIBITUM</p>
            <p className="text-[#69686f] leading-relaxed">{t("about.desc")}</p>
          </div>
          <div>
            <p className="font-bold text-[#121117] mb-6 uppercase tracking-wider text-[13px]">{t("contact.title")}</p>
            <div className="space-y-4 text-[#69686f]">
              <p className="hover:text-[#121117] cursor-pointer transition-colors">{t("contact.email")}</p>
              <p className="hover:text-[#121117] cursor-pointer transition-colors">{t("contact.telegram")}</p>
              <p className="hover:text-[#121117] cursor-pointer transition-colors">{t("contact.hours")}</p>
            </div>
          </div>
          <div>
            <p className="font-bold text-[#121117] mb-6 uppercase tracking-wider text-[13px]">{t("rules.title")}</p>
            <div className="space-y-4 text-[#69686f]">
              <p className="hover:text-[#121117] cursor-pointer transition-colors">{t("rules.item1")}</p>
              <p className="hover:text-[#121117] cursor-pointer transition-colors">{t("rules.item2")}</p>
            </div>
          </div>
          <div>
            <p className="font-bold text-[#121117] mb-6 uppercase tracking-wider text-[13px]">Навігація</p>
            <div className="space-y-4">
              <Link href={specialistHref} className="block text-[#69686f] hover:text-[#121117] transition-colors">{t("nav.specialists")}</Link>
              <Link href="#how" className="block text-[#69686f] hover:text-[#121117] transition-colors">{t("nav.how_it_works")}</Link>
              <Link href="#reviews" className="block text-[#69686f] hover:text-[#121117] transition-colors">{t("nav.reviews")}</Link>
            </div>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-200 text-[14px] text-[#69686f]">
          © 2024 Libitum Education. {t("footer.rights")}
        </div>
      </footer>
    </div>
  )
}
