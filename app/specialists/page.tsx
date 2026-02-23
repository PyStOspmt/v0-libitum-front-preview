"use client"
import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Award, Users, MapPin, Search, Heart, HeartOff, PlayCircle, PauseCircle, Globe, ChevronDown, X, Star, Play, Calendar, Eye, SlidersHorizontal } from "lucide-react"
import { useSearchParams } from "next/navigation"

/* ═══════════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════════ */
const specialists = [
  {
    id: 1,
    name: "Олена І.",
    specialization: "Репетитор",
    badges: ["Професіонал", "Супер-репетитор"],
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    videoThumb: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    subjects: ["Англійська мова", "Німецька мова", "Французька мова"],
    rating: 4.9,
    reviews: 48,
    activeStudents: 49,
    lessonsCompleted: 4975,
    experience: 5,
    pricePerLesson: 400,
    lessonDuration: "50 хв",
    location: "Київ",
    verified: true,
    online: true,
    offline: true,
    homeVisit: true,
    nativeSpeaker: false,
    bioTitle: "Готую до IELTS та TOEFL | Розмовна англійська для дорослих",
    bioText: "Маю 5 років досвіду викладання англійської мови. Працюю з учнями різного віку — від школярів до дорослих. Адаптую програму під цілі кожного учня.",
    popular: "Популярний. Записались 7 разів нещодавно",
  },
  {
    id: 3,
    name: "Марія К.",
    specialization: "Психолог",
    badges: ["Супер-спеціаліст"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    videoThumb: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    subjects: ["Індивідуальна терапія", "Сімейна терапія"],
    rating: 5.0,
    reviews: 62,
    activeStudents: 38,
    lessonsCompleted: 6100,
    experience: 10,
    pricePerLesson: 600,
    lessonDuration: "50 хв",
    location: "Київ",
    verified: true,
    online: true,
    offline: false,
    nativeSpeaker: false,
    bioTitle: "Клінічний психолог | Тривожність, депресія, стрес",
    bioText: "Клінічний психолог з 10-річним досвідом. Спеціалізуюсь на роботі з тривожністю, депресією та стресом. Проводжу індивідуальну та сімейну терапію.",
    popular: "Популярний. Записались 5 разів нещодавно",
  },
  {
    id: 4,
    name: "Анна М.",
    specialization: "Логопед",
    badges: ["Професіонал"],
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    videoThumb: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    subjects: ["Постановка звуків", "Корекція мовлення"],
    rating: 4.9,
    reviews: 41,
    activeStudents: 32,
    lessonsCompleted: 4300,
    experience: 8,
    pricePerLesson: 500,
    lessonDuration: "50 хв",
    location: "Київ",
    verified: true,
    online: true,
    offline: true,
    homeVisit: false,
    nativeSpeaker: true,
    bioTitle: "Логопед-дефектолог | Діти та дорослі",
    bioText: "Працюю з дітьми та дорослими. Корекція вимови, постановка звуків, розвиток мовлення. Індивідуальний підхід до кожного клієнта.",
    popular: "",
  },
]

const ALL_SUBJECTS = [...new Set(specialists.flatMap(s => s.subjects))]
const ALL_CITIES = [...new Set(specialists.map(s => s.location))]
const PRICE_RANGES = [
  { label: "Будь-яка", min: 0, max: Infinity },
  { label: "до ₴300", min: 0, max: 300 },
  { label: "₴300 – ₴500", min: 300, max: 500 },
  { label: "₴500 – ₴800", min: 500, max: 800 },
  { label: "₴800+", min: 800, max: Infinity },
]
const SORT_OPTIONS = [
  { value: "recommended", label: "Рекомендовані" },
  { value: "price-asc", label: "Ціна: від низької" },
  { value: "price-desc", label: "Ціна: від високої" },
  { value: "rating", label: "За рейтингом" },
  { value: "reviews", label: "За відгуками" },
]

/* ═══════════════════════════════════════════════════
   Accent helpers
   ═══════════════════════════════════════════════════ */
type AccentKey = "tutor" | "health" | "neutral"
const accentPalette: Record<AccentKey, {
  badge: string; badgeBorder: string; cta: string; price: string
  cardBg: string; glow: string; soft: string; icon: string; ring: string
}> = {
  tutor: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    badgeBorder: "border border-emerald-200",
    cta: "bg-[linear-gradient(135deg,#00796b,#009688,#0f766e)] hover:brightness-110 text-white border-transparent shadow-emerald-100",
    price: "text-slate-900",
    cardBg: "from-white via-emerald-50/30 to-white",
    glow: "rgba(16,185,129,0.08)",
    soft: "rgba(16,185,129,0.04)",
    icon: "text-emerald-500",
    ring: "ring-emerald-200/50",
  },
  health: {
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    badgeBorder: "border border-amber-200",
    cta: "bg-[linear-gradient(135deg,#f59e0b,#f97316,#fb923c)] hover:brightness-110 text-white border-transparent shadow-amber-100",
    price: "text-slate-900",
    cardBg: "from-white via-amber-50/30 to-white",
    glow: "rgba(249,115,22,0.08)",
    soft: "rgba(249,115,22,0.04)",
    icon: "text-amber-500",
    ring: "ring-amber-200/50",
  },
  neutral: {
    badge: "bg-slate-100 text-slate-700 border-slate-200",
    badgeBorder: "border border-slate-200",
    cta: "bg-slate-800 hover:bg-slate-900",
    price: "text-slate-900",
    cardBg: "from-white via-slate-50/30 to-white",
    glow: "rgba(100,116,139,0.06)",
    soft: "rgba(100,116,139,0.03)",
    icon: "text-slate-400",
    ring: "ring-slate-200/50",
  },
}
function getAccent(spec: string): AccentKey {
  if (spec === "Репетитор") return "tutor"
  if (["Психолог", "Логопед"].includes(spec)) return "health"
  return "neutral"
}

function getDiffuseBackground(index: number, accents: AccentKey[]) {
  const current = accentPalette[accents[index] || "neutral"]
  const prev = accentPalette[accents[index - 1] || accents[index] || "neutral"]
  const next = accentPalette[accents[index + 1] || accents[index] || "neutral"]
  return {
    backgroundImage: [
      `radial-gradient(ellipse 80% 50% at 20% 10%, ${prev.glow}, transparent 70%)`,
      `radial-gradient(ellipse 60% 60% at 80% 50%, ${current.glow}, transparent 60%)`,
      `radial-gradient(ellipse 80% 50% at 30% 90%, ${next.glow}, transparent 70%)`,
      `linear-gradient(135deg, ${current.soft}, transparent 60%)`,
    ].join(", "),
  }
}

/* ═══════════════════════════════════════════════════
   FilterBox component
   ═══════════════════════════════════════════════════ */
function FilterBox({ label, children, onClick }: { label: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <div 
      className="border border-slate-200 rounded-lg px-3 py-2.5 hover:border-slate-400 transition-colors cursor-pointer bg-white"
      onClick={onClick}
    >
      <div className="text-[10px] text-slate-400 leading-none mb-1">{label}</div>
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   PillDropdown — clickable pill with dropdown
   ═══════════════════════════════════════════════════ */
function PillDropdown({ label, options, value, onChange, multi = false }: {
  label: string
  options: { value: string; label: string }[]
  value: string | string[]
  onChange: (v: string | string[]) => void
  multi?: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node
      if (ref.current?.contains(target)) return
      if (menuRef.current?.contains(target)) return
      setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const hasValue = multi
    ? (value as string[]).length > 0
    : value !== "all"

  const displayLabel = multi
    ? (value as string[]).length > 0
      ? `${label} (${(value as string[]).length})`
      : label
    : options.find(o => o.value === value)?.label || label

  return (
    <div ref={ref} className={`relative flex-shrink-0 ${open ? "z-[60]" : "z-0"}`}>
      <button
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-colors whitespace-nowrap ${
          hasValue
            ? "border-slate-900 bg-slate-900 text-white"
            : "border-slate-200 text-slate-600 hover:border-slate-400"
        }`}
      >
        {displayLabel}
        {hasValue && !multi ? (
          <X className="h-3 w-3 ml-0.5 cursor-pointer" onClick={(e) => { e.stopPropagation(); onChange(multi ? [] : "all"); setOpen(false) }} />
        ) : (
          <ChevronDown className={`h-3.5 w-3.5 opacity-50 transition-transform ${open ? "rotate-180" : ""}`} />
        )}
      </button>
      {open && (
        <div
          ref={menuRef}
          className="absolute left-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-[60] min-w-[200px] w-max py-1 max-h-[280px] overflow-y-auto"
        >
          {multi ? (
            options.map(opt => {
              const selected = (value as string[]).includes(opt.value)
              return (
                <button
                  key={opt.value}
                  onClick={() => {
                    const arr = value as string[]
                    onChange(selected ? arr.filter(v => v !== opt.value) : [...arr, opt.value])
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center gap-2 ${selected ? "text-slate-900 font-medium" : "text-slate-600"}`}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${selected ? "bg-slate-900 border-slate-900 text-white" : "border-slate-300"}`}>
                    {selected && "✓"}
                  </div>
                  {opt.label}
                </button>
              )
            })
          ) : (
            options.map(opt => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false) }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 ${opt.value === value ? "text-slate-900 font-medium" : "text-slate-600"}`}
              >
                {opt.label}
              </button>
            ))
          )}
          {multi && (value as string[]).length > 0 && (
            <div className="border-t border-slate-100 mt-1 pt-1">
              <button onClick={() => { onChange([]); setOpen(false) }} className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50">
                Скинути
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   Main Page
   ═══════════════════════════════════════════════════ */
export default function SpecialistsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState(categoryParam && ["tutor", "psychologist", "speech-therapist"].includes(categoryParam) ? categoryParam : "all")
  const [format, setFormat] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [city, setCity] = useState("all")
  const [sortBy, setSortBy] = useState("recommended")
  const [subjectFilter, setSubjectFilter] = useState<string[]>([])
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [expandedBio, setExpandedBio] = useState<number | null>(null)
  const [expandedSubjects, setExpandedSubjects] = useState<number | null>(null)
  const [hoveredSpecialist, setHoveredSpecialist] = useState<number | null>(null)
  const [videoPlaying, setVideoPlaying] = useState<number | null>(null)
  const [showVerifiedTooltip, setShowVerifiedTooltip] = useState<number | null>(null)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  // Refs for Select triggers
  const categorySelectRef = useRef<HTMLButtonElement>(null)
  const priceSelectRef = useRef<HTMLButtonElement>(null)
  const citySelectRef = useRef<HTMLButtonElement>(null)
  const formatSelectRef = useRef<HTMLButtonElement>(null)
  const sortSelectRef = useRef<HTMLButtonElement>(null)
  const stickyFiltersRef = useRef<HTMLDivElement>(null)

  // Handle category query parameter changes
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam && ["tutor", "psychologist", "speech-therapist"].includes(categoryParam)) {
      setCategory(categoryParam)
    }
  }, [searchParams])

  // Sticky filters shadow on scroll
  useEffect(() => {
    const el = stickyFiltersRef.current
    if (!el) return
    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      el.classList.toggle("stuck", rect.top <= 56)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
  }

  const SubjectsLine = ({ specialist, textClass, iconClass, maxCharsFallback }: {
    specialist: typeof specialists[number]
    textClass: string
    iconClass: string
    maxCharsFallback: number
  }) => {
    const containerRef = useRef<HTMLButtonElement>(null)
    const measureRef = useRef<HTMLSpanElement>(null)
    const isExpanded = expandedSubjects === specialist.id
    const [visibleCount, setVisibleCount] = useState(specialist.subjects.length)

    const recompute = useCallback(() => {
      if (isExpanded) {
        setVisibleCount(specialist.subjects.length)
        return
      }
      const containerWidth = containerRef.current?.clientWidth || 0
      const measure = measureRef.current
      if (!measure || containerWidth === 0) {
        // Fallback by characters if measurement not ready
        let chars = 0
        let count = 0
        for (const subj of specialist.subjects) {
          const needed = (count > 0 ? 2 : 0) + subj.length // add comma+space
          if (chars + needed > maxCharsFallback) break
          chars += needed
          count++
        }
        setVisibleCount(Math.max(1, count || 1))
        return
      }

      const available = Math.max(0, containerWidth - 22) // leave space for icon and gap
      let count = specialist.subjects.length
      for (let i = 1; i <= specialist.subjects.length; i++) {
        measure.textContent = specialist.subjects.slice(0, i).join(", ")
        if (measure.getBoundingClientRect().width > available) {
          count = Math.max(1, i - 1)
          break
        }
      }
      setVisibleCount(count)
    }, [isExpanded, specialist.subjects, maxCharsFallback])

    useEffect(() => {
      recompute()
    }, [recompute])

    useEffect(() => {
      if (!containerRef.current) return
      const ro = new ResizeObserver(() => recompute())
      ro.observe(containerRef.current)
      return () => ro.disconnect()
    }, [recompute])

    const hiddenCount = specialist.subjects.length - visibleCount
    const subjectsToShow = isExpanded ? specialist.subjects : specialist.subjects.slice(0, visibleCount)

    return (
      <button
        type="button"
        ref={containerRef}
        className={`relative flex items-start gap-2 text-left w-full ${textClass}`}
        onClick={() => setExpandedSubjects(isExpanded ? null : specialist.id)}
      >
        <Globe className={`h-3.5 w-3.5 mt-0.5 flex-shrink-0 ${iconClass}`} />
        <span className="block truncate">
          {subjectsToShow.join(", ")}
          {!isExpanded && hiddenCount > 0 && <span className="text-slate-500"> +{hiddenCount}</span>}
        </span>
        <span ref={measureRef} className={`absolute invisible pointer-events-none whitespace-nowrap ${textClass}`} />
      </button>
    )
  }

  const getAvailability = (s: typeof specialists[number]) => {
    const parts = [] as string[]
    if (s.online) parts.push("Онлайн")
    if (s.offline) parts.push("Офлайн")
    if (s.homeVisit) parts.push("Виїзд")
    return parts.join(" · ")
  }

  /* ── Filtering ── */
  const selectedPrice = PRICE_RANGES.find((_, i) => `price-${i}` === priceRange) || PRICE_RANGES[0]

  const filtered = specialists
    .filter(s => {
      if (category === "tutor" && s.specialization !== "Репетитор") return false
      if (category === "psychologist" && s.specialization !== "Психолог") return false
      if (category === "speech-therapist" && s.specialization !== "Логопед") return false
      if (format === "online" && !s.online) return false
      if (format === "offline" && !s.offline) return false
      if (priceRange !== "all") {
        if (s.pricePerLesson < selectedPrice.min || s.pricePerLesson > selectedPrice.max) return false
      }
      if (city !== "all" && s.location !== city) return false
      if (verifiedOnly && !s.verified) return false
      if (showFavoritesOnly && !favorites.includes(s.id)) return false
      if (subjectFilter.length > 0 && !s.subjects.some(sub => subjectFilter.includes(sub))) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return s.name.toLowerCase().includes(q) || s.subjects.some(sub => sub.toLowerCase().includes(q))
      }
      return true
    })
    .sort((a, b) => {
      // First, prioritize TOP specialists (those with "Супер" in badges)
      const aIsTop = a.badges.some(badge => badge.includes("Супер"))
      const bIsTop = b.badges.some(badge => badge.includes("Супер"))
      
      if (aIsTop && !bIsTop) return -1
      if (!aIsTop && bIsTop) return 1
      
      // Then apply regular sorting
      switch (sortBy) {
        case "price-asc": return a.pricePerLesson - b.pricePerLesson
        case "price-desc": return b.pricePerLesson - a.pricePerLesson
        case "rating": return b.rating - a.rating
        case "reviews": return b.reviews - a.reviews
        default: return 0
      }
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-white overflow-x-clip">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-800">Libitum</span>
            </Link>
            <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600">
              <Link href="/specialists" className="text-slate-900">Знайти спеціаліста</Link>
              <Link href="/about" className="hover:text-slate-900 transition-colors">Про нас</Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-sm font-medium text-slate-600">Увійти</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-sm">Реєстрація</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Floating gradient orbs - desktop only */}
      <div className="hidden sm:block fixed top-20 -left-32 w-64 h-64 rounded-full bg-emerald-100/40 blur-3xl animate-orb pointer-events-none" />
      <div className="hidden sm:block fixed top-40 -right-32 w-96 h-96 rounded-full bg-amber-100/30 blur-3xl animate-orb pointer-events-none" style={{ animationDelay: "1s" }} />
      <div className="hidden sm:block fixed bottom-40 left-1/4 w-80 h-80 rounded-full bg-emerald-50/30 blur-3xl animate-orb pointer-events-none" style={{ animationDelay: "2s" }} />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* ── Title ── */}
        <div className="pt-6 pb-2 sm:pt-8">
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-slate-900 leading-tight">
            Спеціалісти для приватних занять
          </h1>
          <p className="text-sm text-slate-500 mt-1 mb-4 max-w-2xl leading-relaxed">
            Оберіть з {filtered.length} перевірених спеціалістів. Запишіться на пробне заняття та почніть навчання вже сьогодні.
          </p>
        </div>

        {/* ── Sticky Filters Container ── */}
        <div className="sticky top-14 z-40 bg-white/80 backdrop-blur-md pt-3 pb-2 -mx-4 sm:-mx-6 px-4 sm:px-6 border-b border-transparent [&.stuck]:border-slate-100/50 [&.stuck]:shadow-sm [&.stuck]:bg-white/90" ref={stickyFiltersRef}>

        {/* ── MOBILE: Compact filter bar (Preply-style) ── */}
        <div className="sm:hidden">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-10 rounded-full border-slate-200 text-sm font-medium text-slate-800 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Всі спеціалісти</SelectItem>
                  <SelectItem value="tutor">Репетитори</SelectItem>
                  <SelectItem value="psychologist">Психологи</SelectItem>
                  <SelectItem value="speech-therapist">Логопеди</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className={`flex items-center justify-center h-10 w-10 rounded-full border transition-colors flex-shrink-0 ${
                showMobileFilters ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 text-slate-600 hover:border-slate-400"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </button>
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className={`flex items-center justify-center h-10 w-10 rounded-full border transition-colors flex-shrink-0 ${
                showMobileSearch ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 text-slate-600 hover:border-slate-400"
              }`}
            >
              <Search className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile search input */}
          {showMobileSearch && (
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                autoFocus
                placeholder="Пошук за ім'ям"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 rounded-full border-slate-200 bg-white pl-10 text-sm focus-visible:ring-slate-300"
              />
            </div>
          )}

          {/* Mobile expanded filters panel */}
          {showMobileFilters && (
            <div className="space-y-3 pb-2 animate-in slide-in-from-top-2 duration-200">
              <div className="grid grid-cols-2 gap-2">
                <div className="border border-slate-200 rounded-lg px-3 py-2.5 hover:border-slate-400 transition-colors bg-white">
                  <div className="text-[10px] text-slate-400 leading-none mb-1">Ціна за заняття</div>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="h-auto p-0 border-0 shadow-none text-sm font-medium text-slate-800 focus:ring-0 [&>svg]:h-3.5 [&>svg]:w-3.5">
                      <SelectValue placeholder="Будь-яка" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Будь-яка</SelectItem>
                      {PRICE_RANGES.slice(1).map((r, i) => (
                        <SelectItem key={i} value={`price-${i + 1}`}>{r.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="border border-slate-200 rounded-lg px-3 py-2.5 hover:border-slate-400 transition-colors bg-white">
                  <div className="text-[10px] text-slate-400 leading-none mb-1">Місто</div>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger className="h-auto p-0 border-0 shadow-none text-sm font-medium text-slate-800 focus:ring-0 [&>svg]:h-3.5 [&>svg]:w-3.5">
                      <SelectValue placeholder="Будь-яке" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Будь-яке</SelectItem>
                      {ALL_CITIES.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="border border-slate-200 rounded-lg px-3 py-2.5 hover:border-slate-400 transition-colors bg-white">
                  <div className="text-[10px] text-slate-400 leading-none mb-1">Формат занять</div>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger className="h-auto p-0 border-0 shadow-none text-sm font-medium text-slate-800 focus:ring-0 [&>svg]:h-3.5 [&>svg]:w-3.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Будь-який</SelectItem>
                      <SelectItem value="online">Онлайн</SelectItem>
                      <SelectItem value="offline">Офлайн</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="border border-slate-200 rounded-lg px-3 py-2.5 hover:border-slate-400 transition-colors bg-white">
                  <div className="text-[10px] text-slate-400 leading-none mb-1">Сортування</div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-auto p-0 border-0 shadow-none text-sm font-medium text-slate-800 focus:ring-0 [&>svg]:h-3.5 [&>svg]:w-3.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SORT_OPTIONS.map(o => (
                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 overflow-visible py-1">
                <PillDropdown
                  label="Предмети"
                  multi
                  options={ALL_SUBJECTS.map(s => ({ value: s, label: s }))}
                  value={subjectFilter}
                  onChange={(v) => setSubjectFilter(v as string[])}
                />
                <button
                  onClick={() => setVerifiedOnly(!verifiedOnly)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-colors whitespace-nowrap flex-shrink-0 ${
                    verifiedOnly ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 text-slate-600 hover:border-slate-400"
                  }`}
                >
                  Верифіковані
                  {verifiedOnly ? <X className="h-3 w-3 ml-0.5" onClick={(e) => { e.stopPropagation(); setVerifiedOnly(false) }} /> : <ChevronDown className="h-3.5 w-3.5 opacity-50" />}
                </button>
                <button
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-colors whitespace-nowrap flex-shrink-0 ${
                    showFavoritesOnly ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 text-slate-600 hover:border-slate-400"
                  }`}
                >
                  Обрані
                  {showFavoritesOnly ? <X className="h-3 w-3 ml-0.5" onClick={(e) => { e.stopPropagation(); setShowFavoritesOnly(false) }} /> : <ChevronDown className="h-3.5 w-3.5 opacity-50" />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── DESKTOP: Full FilterBox grid + pill row ── */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-4 gap-3 mb-3">
            <FilterBox label="Спеціалізація" onClick={() => categorySelectRef.current?.click()}>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger
                  ref={categorySelectRef}
                  className="h-auto p-0 border-0 shadow-none text-sm font-medium text-slate-800 focus:ring-0 [&>svg]:h-3.5 [&>svg]:w-3.5 pointer-events-none"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Всі спеціалісти</SelectItem>
                  <SelectItem value="tutor">Репетитори</SelectItem>
                  <SelectItem value="psychologist">Психологи</SelectItem>
                  <SelectItem value="speech-therapist">Логопеди</SelectItem>
                </SelectContent>
              </Select>
            </FilterBox>
            <FilterBox label="Ціна за заняття" onClick={() => priceSelectRef.current?.click()}>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger
                  ref={priceSelectRef}
                  className="h-auto p-0 border-0 shadow-none text-sm font-medium text-slate-800 focus:ring-0 [&>svg]:h-3.5 [&>svg]:w-3.5 pointer-events-none"
                >
                  <SelectValue placeholder="Будь-яка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Будь-яка</SelectItem>
                  {PRICE_RANGES.slice(1).map((r, i) => (
                    <SelectItem key={i} value={`price-${i + 1}`}>{r.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FilterBox>
            <FilterBox label="Місто" onClick={() => citySelectRef.current?.click()}>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger
                  ref={citySelectRef}
                  className="h-auto p-0 border-0 shadow-none text-sm font-medium text-slate-800 focus:ring-0 [&>svg]:h-3.5 [&>svg]:w-3.5 pointer-events-none"
                >
                  <SelectValue placeholder="Будь-яке" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Будь-яке</SelectItem>
                  {ALL_CITIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FilterBox>
            <FilterBox label="Формат занять" onClick={() => formatSelectRef.current?.click()}>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger
                  ref={formatSelectRef}
                  className="h-auto p-0 border-0 shadow-none text-sm font-medium text-slate-800 focus:ring-0 [&>svg]:h-3.5 [&>svg]:w-3.5 pointer-events-none"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Будь-який</SelectItem>
                  <SelectItem value="online">Онлайн</SelectItem>
                  <SelectItem value="offline">Офлайн</SelectItem>
                </SelectContent>
              </Select>
            </FilterBox>
          </div>

          <div className="flex items-center justify-between gap-3 pb-1">
            <div className="flex items-center gap-2">
              <PillDropdown
                label="Предмети"
                multi
                options={ALL_SUBJECTS.map(s => ({ value: s, label: s }))}
                value={subjectFilter}
                onChange={(v) => setSubjectFilter(v as string[])}
              />
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-colors whitespace-nowrap ${
                  verifiedOnly ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 text-slate-600 hover:border-slate-400"
                }`}
              >
                Верифіковані
                {verifiedOnly ? <X className="h-3 w-3 ml-0.5" onClick={(e) => { e.stopPropagation(); setVerifiedOnly(false) }} /> : <ChevronDown className="h-3.5 w-3.5 opacity-50" />}
              </button>
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-colors whitespace-nowrap ${
                  showFavoritesOnly ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 text-slate-600 hover:border-slate-400"
                }`}
              >
                Обрані
                {showFavoritesOnly ? <X className="h-3 w-3 ml-0.5" onClick={(e) => { e.stopPropagation(); setShowFavoritesOnly(false) }} /> : <ChevronDown className="h-3.5 w-3.5 opacity-50" />}
              </button>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <PillDropdown
                label={`Сортувати: ${SORT_OPTIONS.find(o => o.value === sortBy)?.label}`}
                options={SORT_OPTIONS}
                value={sortBy}
                onChange={(v) => setSortBy(v as string)}
              />
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Пошук за ім'ям"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8 w-[180px] rounded-full border-slate-200 bg-white pl-8 text-sm focus-visible:ring-slate-300"
                />
              </div>
            </div>
          </div>
        </div>

        </div>{/* end sticky filters */}

        {/* ── Results count ── */}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5">
          {filtered.length} спеціалістів доступні
        </h2>

        {/* ── Specialist cards ── */}
        <div className="space-y-4 pb-12">
          {(() => {
            const accentKeys = filtered.map(s => getAccent(s.specialization))
            return filtered.map((specialist, index) => {
              const key = accentKeys[index]
              const a = accentPalette[key]
              const isFav = favorites.includes(specialist.id)
              const isExpanded = expandedBio === specialist.id
              const isHovered = hoveredSpecialist === specialist.id
              const isVideoActive = videoPlaying === specialist.id

              return (
                <div key={specialist.id} className="relative">
                  {/* ═══ DESKTOP: Card + Video sidebar ═══ */}
                  <div
                    className="hidden sm:flex gap-4 items-start relative z-10"
                    onMouseEnter={() => setHoveredSpecialist(specialist.id)}
                    onMouseLeave={() => { setHoveredSpecialist(null); setVideoPlaying(null) }}
                  >
                    <article
                      className={`flex-1 min-w-0 bg-white border rounded-[24px] p-6 transition-all duration-200 ${isHovered ? `border-slate-300 shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-1 ring-slate-200` : "border-slate-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)]"}`}
                    >
                      <div className="flex gap-6">
                        {/* COL 1: Photo */}
                        <Link href={`/specialists/${specialist.id}`} className="flex-shrink-0 self-start">
                          <div className="relative w-[140px] h-[140px] rounded-[16px] overflow-hidden bg-slate-100">
                            {specialist.image ? (
                              <Image src={specialist.image} alt={specialist.name} fill className="object-cover object-center" sizes="140px" />
                            ) : (
                              <Avatar className="h-full w-full rounded-[16px]">
                                <AvatarFallback className="bg-slate-100 text-2xl font-bold text-slate-600 rounded-[16px]">{specialist.name[0]}</AvatarFallback>
                              </Avatar>
                            )}
                            {specialist.online && (
                              <div className="absolute bottom-2 left-2 flex items-center justify-center bg-white rounded-full p-0.5">
                                <div className="w-3 h-3 rounded-full bg-[#00c5a6] border-2 border-white" />
                              </div>
                            )}
                          </div>
                        </Link>

                        {/* COL 2: Info */}
                        <div className="flex-1 min-w-0 flex flex-col">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Link href={`/specialists/${specialist.id}`}>
                                <h3 className="text-[20px] font-bold text-[#121117] hover:underline decoration-1 underline-offset-2 leading-tight">{specialist.name}</h3>
                              </Link>
                              {specialist.verified && (
                                <span
                                  className="relative group cursor-help"
                                  onMouseEnter={() => setShowVerifiedTooltip(specialist.id)}
                                  onMouseLeave={() => setShowVerifiedTooltip(null)}
                                  onClick={() => setShowVerifiedTooltip(showVerifiedTooltip === specialist.id ? null : specialist.id)}
                                >
                                  <div className="flex items-center justify-center bg-[#e8fffb] rounded-full p-1">
                                    <Award className="h-4 w-4 text-[#00a389] flex-shrink-0" />
                                  </div>
                                  {(showVerifiedTooltip === specialist.id) && (
                                    <span className="absolute left-0 top-full mt-2 whitespace-nowrap rounded-[8px] bg-[#121117] text-white text-[12px] font-medium px-3 py-1.5 shadow-lg z-10 before:content-[''] before:absolute before:-top-1 before:left-2 before:w-2 before:h-2 before:bg-[#121117] before:rotate-45">
                                      Верифікований спеціаліст
                                    </span>
                                  )}
                                </span>
                              )}
                              <span className={`text-[12px] font-[600] px-2.5 py-0.5 rounded-full ${a.badge} border-transparent`}>{specialist.specialization}</span>
                            </div>
                            <button
                              onClick={(e) => toggleFavorite(e, specialist.id)}
                              className={`p-2 rounded-full transition-all hover:bg-slate-50 ${isFav ? "text-[#ff4757]" : "text-[#b2b1b9] hover:text-[#ff4757]"}`}
                            >
                              <Heart className={`h-6 w-6 ${isFav ? "fill-current" : ""}`} />
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-4 text-[14px] text-[#69686f] font-medium mb-3">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-4 w-4 text-[#b2b1b9] flex-shrink-0" />
                              <span>{specialist.location}</span>
                            </div>
                            {getAvailability(specialist) && (
                              <div className="flex items-center gap-1.5">
                                <Globe className="h-4 w-4 text-[#b2b1b9] flex-shrink-0" />
                                <span>{getAvailability(specialist)}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="mb-2">
                            <SubjectsLine specialist={specialist} textClass="text-[15px] text-[#121117] font-semibold" iconClass="text-[#121117] hidden" maxCharsFallback={40} />
                          </div>
                          <div
                            className="mt-1 mb-2 cursor-pointer group/bio"
                            onClick={() => setExpandedBio(isExpanded ? null : specialist.id)}
                          >
                            <p className={`text-[15px] text-[#3e3d45] leading-relaxed font-medium ${isExpanded ? "" : "line-clamp-2"} relative`}>
                              <span className="font-bold text-[#121117] mr-1">{specialist.bioTitle}</span>
                              <span className="text-[#69686f]">{specialist.bioText}</span>
                            </p>
                            {!isExpanded && specialist.bioText.length > 100 && (
                              <span className="text-[14px] font-bold text-[#121117] underline decoration-1 underline-offset-2 mt-1 inline-block">Читати далі</span>
                            )}
                          </div>
                        </div>

                        {/* COL 3: Stats + CTA */}
                        <div className="flex flex-col items-end flex-shrink-0 w-[220px] pl-6 border-l border-slate-100">
                          <div className="flex items-start justify-between w-full mb-3">
                            <div className="flex flex-col gap-1 w-full">
                              <div className="flex items-center justify-between w-full">
                                <span className="text-[14px] font-medium text-[#69686f]">Оцінка</span>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                  <span className="text-[16px] font-bold text-[#121117]">{specialist.rating}</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between w-full">
                                <span className="text-[14px] font-medium text-[#69686f]">Відгуки</span>
                                <span className="text-[15px] font-semibold text-[#121117]">{specialist.reviews}</span>
                              </div>
                              <div className="flex items-center justify-between w-full mt-1 pt-1 border-t border-slate-50">
                                <span className="text-[14px] font-medium text-[#69686f]">Студенти</span>
                                <span className="text-[15px] font-semibold text-[#121117]">{specialist.activeStudents}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-auto w-full text-right mb-4">
                            <div className="text-[28px] font-bold text-[#121117] leading-none mb-1">₴{specialist.pricePerLesson}</div>
                            <div className="text-[14px] font-medium text-[#69686f]">{specialist.lessonDuration} хв</div>
                          </div>
                          
                          <Link href={`/specialists/${specialist.id}`} className="w-full">
                            <Button 
                              className={`w-full h-12 rounded-[12px] text-[16px] font-bold text-white transition-colors shadow-sm ${
                                specialist.specialization === "Репетитор" || specialist.specialization === "Tutor"
                                  ? "bg-[#00c5a6] hover:bg-[#00a389]"
                                  : "bg-[#f57c00] hover:bg-[#e65100]"
                              }`}
                            >
                              Записатись
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </article>

                    {/* Video sidebar anchored to card — landscape, compact */}
                    <div className={`absolute top-0 right-[-236px] hidden lg:block flex-shrink-0 w-[220px] transition-all duration-300 z-0 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"}`}>
                      <div className="border border-slate-200 rounded-[24px] overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                        <div
                          className="relative aspect-[3/4] bg-slate-900 cursor-pointer"
                          onClick={() => setVideoPlaying(isVideoActive ? null : specialist.id)}
                        >
                          {isVideoActive ? (
                            <>
                              <video
                                autoPlay
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                                poster={specialist.videoThumb}
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm">
                                  <div className="flex gap-1">
                                    <div className="w-1.5 h-5 bg-white rounded-sm" />
                                    <div className="w-1.5 h-5 bg-white rounded-sm" />
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <Image
                                src={specialist.videoThumb}
                                alt={specialist.name}
                                fill
                                className="object-cover object-top"
                                sizes="220px"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                                <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300">
                                  <Play className="h-6 w-6 text-[#121117] ml-1" />
                                </div>
                              </div>
                            </>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-4 pt-12">
                            <p className="text-white font-bold text-[15px] leading-tight mb-0.5">{specialist.name}</p>
                            <p className="text-white/80 text-[12px] font-medium">{specialist.specialization}</p>
                          </div>
                        </div>
                        <div className="p-3 space-y-2 bg-[#f0f3f3]/50">
                          <Link href={`/specialists/${specialist.id}#schedule`} className="block">
                            <Button variant="outline" className="w-full h-10 rounded-[10px] text-[13px] font-bold border-slate-200 text-[#121117] bg-white hover:bg-slate-50 flex items-center justify-center gap-2">
                              <Calendar className="h-4 w-4 text-[#69686f]" />
                              Розклад
                            </Button>
                          </Link>
                          <Link href={`/specialists/${specialist.id}`} className="block">
                            <Button variant="outline" className="w-full h-10 rounded-[10px] text-[13px] font-bold border-slate-200 text-[#121117] bg-white hover:bg-slate-50 flex items-center justify-center gap-2">
                              <Eye className="h-4 w-4 text-[#69686f]" />
                              Профіль
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ═══ MOBILE: Vertical card ═══ */}
                  <article
                    className={`sm:hidden bg-gradient-to-br ${a.cardBg} border border-slate-200 rounded-2xl p-4 hover:shadow-md transition-shadow`}
                    style={getDiffuseBackground(index, accentKeys)}
                  >
                    <div className="flex gap-3 mb-3">
                      <Link href={`/specialists/${specialist.id}`} className="flex-shrink-0">
                        <div className="relative w-[96px] h-[96px] rounded-xl overflow-hidden bg-slate-100">
                          {specialist.image ? (
                            <Image src={specialist.image} alt={specialist.name} fill className="object-cover object-center" sizes="96px" />
                          ) : (
                            <Avatar className="h-full w-full rounded-xl">
                              <AvatarFallback className="bg-slate-100 text-lg font-bold text-slate-600 rounded-xl">{specialist.name[0]}</AvatarFallback>
                            </Avatar>
                          )}
                          {specialist.online && (
                            <div className="absolute bottom-1 left-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                          )}
                        </div>
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <Link href={`/specialists/${specialist.id}`}>
                              <h3 className="text-[16px] font-semibold text-slate-900 leading-tight">{specialist.name}</h3>
                            </Link>
                            {specialist.verified && <Award className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />}
                          </div>
                          <button
                            onClick={(e) => toggleFavorite(e, specialist.id)}
                            className={`p-1 ${isFav ? "text-red-500" : "text-slate-300"}`}
                          >
                            <Heart className={`h-5 w-5 ${isFav ? "fill-current" : ""}`} />
                          </button>
                        </div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${a.badge} ${a.badgeBorder}`}>{specialist.specialization}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-[14px] font-bold text-slate-900">{specialist.rating}</span>
                            <span className="text-[12px] text-slate-500">{specialist.reviews} відгуків</span>
                          </div>
                          <div>
                            <span className={`text-[16px] font-bold ${a.price}`}>₴{specialist.pricePerLesson}</span>
                            <span className="text-[12px] text-slate-500 ml-1">{specialist.lessonDuration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1.5 mb-2.5">
                      <div>
                        <SubjectsLine specialist={specialist} textClass="text-[14px] text-slate-700 font-medium" iconClass={a.icon} maxCharsFallback={24} />
                      </div>
                      <div className="flex items-center gap-1.5 text-[13px] text-slate-600">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                        <span>{specialist.location}</span>
                        {getAvailability(specialist) && <span className="text-slate-400">• {getAvailability(specialist)}</span>}
                      </div>
                      <div className="flex items-center gap-2 text-[13px] text-slate-600">
                        <Users className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                        <span>{specialist.activeStudents} учнів • {specialist.lessonsCompleted.toLocaleString()} занять • {specialist.experience} років досвіду</span>
                      </div>
                    </div>
                    <div
                      className="mb-4 cursor-pointer"
                      onClick={() => setExpandedBio(isExpanded ? null : specialist.id)}
                    >
                      <p className={`text-[15px] text-[#3e3d45] leading-relaxed font-medium ${isExpanded ? "" : "line-clamp-2"}`}>
                        <span className="font-bold text-[#121117] mr-1">{specialist.bioTitle}</span>
                        {specialist.bioText}
                      </p>
                      {!isExpanded && specialist.bioText.length > 80 && (
                        <span className="text-[14px] font-bold text-[#121117] underline decoration-1 underline-offset-2 mt-1 inline-block">Читати далі</span>
                      )}
                    </div>
                    
                    <Link href={`/specialists/${specialist.id}`} className="block w-full">
                      <Button 
                        className={`w-full h-12 rounded-[12px] text-[16px] font-bold text-white transition-colors shadow-sm ${
                          specialist.specialization === "Репетитор" || specialist.specialization === "Tutor"
                            ? "bg-[#00c5a6] hover:bg-[#00a389]"
                            : "bg-[#f57c00] hover:bg-[#e65100]"
                        }`}
                      >
                        Записатись
                      </Button>
                    </Link>
                  </article>
                </div>
              )
            })
          })()}

          {/* ── Empty state ── */}
          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <Search className="h-10 w-10 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-700 mb-1">Нічого не знайдено</h3>
              <p className="text-sm text-slate-400">Спробуйте змінити фільтри або пошуковий запит</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
