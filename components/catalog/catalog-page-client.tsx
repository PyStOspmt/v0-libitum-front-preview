"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo, useState } from "react"
import {
  Search,
  Star,
  Heart,
  ArrowRight,
  Play,
  ChevronDown,
  Filter,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/lib/auth-context"
import { useTranslation } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useToast } from "@/hooks/use-toast"
import { Users } from "lucide-react"

type CatalogPageClientProps = {
  subjectSlug: string
  citySlug: string
}

const languages = [
  { id: "en", name: "Англійська", count: 156 },
  { id: "de", name: "Німецька", count: 89 },
  { id: "fr", name: "Французька", count: 67 },
  { id: "es", name: "Іспанська", count: 54 },
  { id: "it", name: "Італійська", count: 32 },
  { id: "ua", name: "Українська", count: 124 },
]

const countries = [
  { id: "ua", name: "Україна", count: 198 },
  { id: "us", name: "США", count: 45 },
  { id: "uk", name: "Велика Британія", count: 38 },
  { id: "de", name: "Німеччина", count: 29 },
]

export function CatalogPageClient({ subjectSlug, citySlug }: CatalogPageClientProps) {
  const [priceRange, setPriceRange] = useState([200, 800])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["en"])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])

  const { user } = useAuth()
  const { t } = useTranslation(user?.language || "UA")
  const { toast } = useToast()

  const [wishlist, setWishlist] = useState<number[]>([])

  const toggleWishlist = (id: number) => {
    if (!user) {
      toast({
        title: "Потрібна авторизація",
        description: "Увійдіть щоб зберігати репетиторів у вибране",
        variant: "destructive",
      })
      return
    }
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const toggleLanguage = (id: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    )
  }

  const specialists = useMemo(
    () => [
      {
        id: 1,
        name: "Олена Коваленко",
        subjects: ["Англійська"],
        rating: 4.9,
        reviews: 48,
        experience: 3,
        priceMin: 400,
        location: "Київ, Україна",
        verified: true,
        languages: 5,
        students: 27,
        videoLength: "2:23",
        bio: "Привіт! Я викладач англійської з 3-річним досвідом. Люблю подорожі, книги та допомагаю студентам досягати цілей у вивченні мови.",
        available: true,
        color: "bg-emerald-100",
      },
      {
        id: 2,
        name: "Марія Шевченко",
        subjects: ["Математика", "Фізика"],
        rating: 4.7,
        reviews: 35,
        experience: 5,
        priceMin: 450,
        location: "Львів, Україна",
        verified: true,
        languages: 3,
        students: 43,
        videoLength: "2:23",
        bio: "Досвідчений репетитор з математики та фізики для всіх рівнів. Роблю складні концепції простими та цікавими.",
        available: true,
        color: "bg-amber-100",
      },
      {
        id: 3,
        name: "Андрій Петренко",
        subjects: ["Українська"],
        rating: 4.9,
        reviews: 67,
        experience: 3,
        priceMin: 350,
        location: "Львів, Україна",
        verified: true,
        languages: 2,
        students: 27,
        videoLength: "1:45",
        bio: "Носій української мови з пристрастю до викладання мови та літератури. Гарантую веселі та інтерактивні уроки!",
        available: false,
        color: "bg-violet-100",
      },
      {
        id: 4,
        name: "Катерина Бойко",
        subjects: ["Німецька"],
        rating: 4.8,
        reviews: 52,
        experience: 4,
        priceMin: 500,
        location: "Берлін, Німеччина",
        verified: true,
        languages: 4,
        students: 31,
        videoLength: "2:05",
        bio: "Експерт німецької мови. Бізнес-німецька, підготовка до іспитів та розмовна практика — я все охоплюю!",
        available: true,
        color: "bg-sky-100",
      },
    ],
    []
  )

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
              <Link href="/catalog" className="text-sm font-medium text-slate-800 border-b-2 border-[#43a047] pb-0.5">
                {t("nav.specialists")}
              </Link>
              <Link href="/#how" className="text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors">
                {t("nav.how_it_works")}
              </Link>
              <Link href="/#reviews" className="text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors">
                {t("nav.reviews")}
              </Link>
              <LanguageSwitcher />
            </nav>

            <div className="flex items-center gap-3">
              {user ? (
                <Link href={user.role === "specialist" ? "/tutor" : user.role === "admin" ? "/admin" : "/client"}>
                  <Button className="h-10 rounded-full bg-[#43a047] px-6 text-sm font-medium text-white hover:bg-[#388e3c]">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" className="h-10 rounded-full px-6 text-sm font-medium border-slate-200 text-slate-700 hover:bg-slate-50">
                      {t("btn.login")}
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="h-10 rounded-full bg-[#43a047] px-6 text-sm font-medium text-white hover:bg-[#388e3c]">
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
        {/* Hero Banner */}
        <section className="relative py-8 px-3 lg:px-8">
          <div className="container mx-auto">
            <div className="relative bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-14 overflow-hidden border border-slate-100/80">
              {/* Decorative shapes - soft sage green */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#e8f5e9] rounded-full translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#e0f2f1] rounded-full -translate-x-1/4 translate-y-1/4" />

              <svg className="absolute right-8 bottom-0 w-80 h-80 text-[#c8e6c9]/50" viewBox="0 0 200 200">
                <path fill="currentColor" d="M45.3,-51.2C58.3,-40.9,68.1,-25.5,71.2,-8.5C74.3,8.5,70.6,27.1,60.1,40.3C49.6,53.5,32.3,61.3,14.1,66.1C-4.1,70.9,-23.2,72.7,-39.7,66.1C-56.2,59.5,-70.1,44.5,-75.4,27C-80.7,9.5,-77.4,-10.5,-68.4,-26.3C-59.4,-42.1,-44.7,-53.7,-29.5,-63.2C-14.3,-72.7,1.4,-80.1,15.7,-77.3C30,-74.5,32.3,-61.5,45.3,-51.2Z" transform="translate(100 100)" />
              </svg>

              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-[#e8f5e9] text-[#2e7d32] px-5 py-2.5 rounded-full text-sm font-medium mb-8">
                  <Star className="h-4 w-4 fill-[#66bb6a] text-[#66bb6a]" />
                  {t("hero.tagline")}
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 mb-8 font-heading leading-[1.1] tracking-tight">
                  {t("hero.title")}
                </h1>

                <p className="text-lg text-slate-500 mb-10 max-w-xl leading-relaxed">
                  {t("hero.subtitle")}
                </p>

                {/* Search Bar */}
                <div className="bg-slate-50/80 rounded-2xl p-2.5 max-w-2xl">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        placeholder="Пошук за предметом, мовою або іменем..."
                        className="h-13 pl-12 rounded-xl border-0 bg-white text-slate-800 placeholder:text-slate-400 focus-visible:ring-[#43a047]"
                      />
                    </div>
                    <Button className="h-13 px-8 rounded-xl bg-[#43a047] text-white hover:bg-[#388e3c] font-semibold shadow-sm">
                      Знайти
                    </Button>
                  </div>
                </div>

                {/* Language tags */}
                <div className="flex flex-wrap items-center gap-3 mt-8">
                  {["Англійська", "Німецька", "Українська", "Іспанська", "Французька"].map((lang, i) => (
                    <span
                      key={lang}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${i === 0 ? "bg-[#43a047] text-white" : "bg-white text-slate-600 hover:bg-[#e8f5e9] border border-slate-100/80"
                        }`}
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="container mx-auto px-3 sm:px-4 lg:px-8 py-8">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-slate-600 font-medium">{specialists.length} викладачів знайдено</span>
              {selectedLanguages.map(lang => {
                const langData = languages.find(l => l.id === lang)
                return langData ? (
                  <span key={lang} className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium">
                    {langData.name}
                    <button onClick={() => toggleLanguage(lang)} className="ml-1 hover:text-emerald-900">&times;</button>
                  </span>
                ) : null
              })}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">Сортувати:</span>
              <select className="h-10 px-4 rounded-full border border-slate-200 bg-white text-sm font-medium text-slate-700">
                <option>За рейтингом</option>
                <option>Ціна: від низької</option>
                <option>Ціна: від високої</option>
              </select>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24 space-y-4">
                {/* Language Filter */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100/80">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-slate-800">Мова</h3>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="space-y-4">
                    {languages.map(lang => (
                      <label key={lang.id} className="flex items-center gap-3 cursor-pointer group">
                        <Checkbox
                          checked={selectedLanguages.includes(lang.id)}
                          onCheckedChange={() => toggleLanguage(lang.id)}
                          className="border-slate-200 data-[state=checked]:bg-[#43a047] data-[state=checked]:border-[#43a047] rounded"
                        />
                        <span className="text-sm text-slate-600 group-hover:text-slate-800 flex-1">{lang.name}</span>
                        <span className="text-xs text-slate-400">({lang.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Country Filter */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100/80">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-slate-800">Країна</h3>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="space-y-4">
                    {countries.map(country => (
                      <label key={country.id} className="flex items-center gap-3 cursor-pointer group">
                        <Checkbox
                          checked={selectedCountries.includes(country.id)}
                          onCheckedChange={() => setSelectedCountries(prev =>
                            prev.includes(country.id) ? prev.filter(c => c !== country.id) : [...prev, country.id]
                          )}
                          className="border-slate-200 data-[state=checked]:bg-[#43a047] data-[state=checked]:border-[#43a047] rounded"
                        />
                        <span className="text-sm text-slate-600 group-hover:text-slate-800 flex-1">{country.name}</span>
                        <span className="text-xs text-slate-400">({country.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100/80">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-slate-800">Ціна, ₴/год</h3>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <Input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                      className="h-10 rounded-xl text-center text-sm"
                    />
                    <span className="text-slate-400">—</span>
                    <Input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                      className="h-10 rounded-xl text-center text-sm"
                    />
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                    className="w-full accent-emerald-600"
                  />
                </div>

                {/* Experience Filter */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100/80">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-slate-800">Досвід</h3>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="space-y-4">
                    {["1-2 роки", "3-5 років", "5+ років"].map((exp, i) => (
                      <label key={exp} className="flex items-center gap-3 cursor-pointer group">
                        <Checkbox className="border-slate-200 data-[state=checked]:bg-[#43a047] data-[state=checked]:border-[#43a047] rounded" />
                        <span className="text-sm text-slate-600 group-hover:text-slate-800">{exp}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <Button className="w-full h-13 rounded-full bg-[#43a047] text-white hover:bg-[#388e3c] font-semibold shadow-sm">
                  Застосувати
                </Button>
              </div>
            </aside>

            {/* Teachers List */}
            <div className="flex-1 space-y-4">
              {specialists.map((specialist) => (
                <div
                  key={specialist.id}
                  className="bg-white rounded-[1.5rem] sm:rounded-3xl p-4 sm:p-6 border border-slate-100/80 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-6">
                    {/* Photo */}
                    <div className="relative flex-shrink-0">
                      <div className={`w-40 h-48 ${specialist.color} rounded-2xl overflow-hidden relative`}>
                        {/* Video button */}
                        <div className="absolute bottom-3 left-3 bg-[#43a047] text-white rounded-full px-3.5 py-2 flex items-center gap-2 text-xs font-medium shadow-sm">
                          <Play className="h-3 w-3 fill-white" />
                          Відео
                        </div>
                        <div className="absolute bottom-3 right-3 text-xs text-slate-600 bg-white rounded-full px-2.5 py-1 font-medium">
                          {specialist.videoLength}
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-slate-800">{specialist.name}</h3>
                            <button
                              onClick={() => toggleWishlist(specialist.id)}
                              className="text-slate-300 hover:text-rose-500 transition-colors"
                            >
                              <Heart className={`h-5 w-5 ${wishlist.includes(specialist.id) ? "fill-rose-500 text-rose-500" : ""}`} />
                            </button>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-2 mb-2">
                            <div className="flex items-center gap-1.5 bg-[#fff8e1]/80 border border-[#ffc800]/30 px-2 py-1.5 rounded-[8px] shadow-sm">
                              <Star className="h-4 w-4 fill-[#ffc800] text-[#ffc800]" />
                              <span className="font-bold text-[#f57c00] text-[14px] leading-none">{specialist.rating}</span>
                              <span className="text-[13px] font-medium text-[#f57c00]/90 border-l border-[#f57c00]/30 pl-2 ml-0.5 leading-none hover:text-[#f57c00] cursor-pointer">
                                {specialist.reviews} відгуків
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-[#f0f3f3] border border-slate-200 px-2.5 py-1.5 rounded-[8px] shadow-sm">
                              <Users className="h-4 w-4 text-[#00c5a6]" />
                              <span className="text-[13px] font-medium text-[#4d4c53] leading-none">
                                <strong className="text-[#121117] font-bold">{specialist.students}</strong> учнів
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-[#f0f3f3] border border-slate-200 px-2.5 py-1.5 rounded-[8px] shadow-sm">
                              <span className="text-[13px] font-medium text-[#4d4c53] leading-none">
                                Досвід <strong className="text-[#121117] font-bold">{specialist.experience} р.</strong>
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="bg-[#e8fffb] text-[#00a389] border border-[#00c5a6]/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                              {specialist.languages} мов
                            </span>
                            {specialist.available && (
                              <span className="bg-[#00c5a6] text-white px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-sm">
                                Онлайн
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-800">від {specialist.priceMin} ₴</div>
                          <div className="text-xs text-slate-500">за годину</div>
                        </div>
                      </div>

                      <p className="text-sm text-slate-500 mb-5 line-clamp-2 leading-relaxed">
                        {specialist.bio}
                      </p>

                      <div className="flex items-center gap-3">
                        <Link href={`/specialists/${specialist.id}`}>
                          <Button variant="outline" className="h-11 rounded-full px-7 text-sm font-medium border-slate-200 hover:bg-slate-50 text-slate-700">
                            Детальніше
                          </Button>
                        </Link>
                        <Button className="h-11 rounded-full px-7 text-sm font-medium bg-[#43a047] text-white hover:bg-[#388e3c] shadow-sm">
                          Безкоштовний урок
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Load More */}
              <div className="text-center py-10">
                <Button variant="outline" className="h-13 rounded-full px-10 border-slate-200 font-medium hover:bg-slate-50 text-slate-700">
                  Показати більше
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-16 px-4 lg:px-8 rounded-t-[2.5rem]">
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
                <Link href="/catalog" className="block text-slate-400 hover:text-white">{t("nav.specialists")}</Link>
                <Link href="/#how" className="block text-slate-400 hover:text-white">{t("nav.how_it_works")}</Link>
                <Link href="/#reviews" className="block text-slate-400 hover:text-white">{t("nav.reviews")}</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            © 2024 Libitum Education. {t("footer.rights")}
          </div>
        </div>
      </footer>
    </div>
  )
}
