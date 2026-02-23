"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { ArrowRight, Check, ChevronDown, Search, Star, Globe, ShieldCheck, MessageCircle, Menu, X } from "lucide-react"

import { useAuth } from "@/lib/auth-context"
import { useTranslation } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"

import { CatalogView } from "@/components/catalog-view"

/* ── Brand palette ── */
const BRAND = {
  primary: "#00c5a6",
  dark: "#00a389",
  light: "#e8fffb",
  bg: "#f0f3f3"
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
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
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
        <section className="bg-white relative overflow-hidden pt-12 pb-16 lg:pt-24 lg:pb-32">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative">
            
            {/* Left Content */}
            <div className="w-full lg:w-[55%] xl:w-[50%] z-10 relative">
              <div className="absolute -top-12 -left-8 w-[54px] h-[53px] text-[#ffc800] z-20 animate-[spin_10s_linear_infinite] opacity-80 hidden md:block">
                <svg viewBox="0 0 54 53" fill="currentColor"><path fillRule="evenodd" d="M25.753.033c-3.111 2.37-5.076 5.617-7.859 8.283-4.008-2.656-7.798-5.322-11.834-7.792-2.316 4.39-3.791 9.176-5.46 13.882-5.405-3.32-10.45-6.852-16.143-9.87 0 5.485.498 10.873 2.062 16.111-5.187-.638-10.364-1.392-15.421-2.483 3.197 5.093 7.391 9.544 11.666 13.874-5.309 2.502-10.395 5.253-15.688 7.771 4.542 3.847 9.877 6.574 15.358 8.922-3.816 4.321-7.737 8.57-11.841 12.632 6.002 1.547 11.968 2.651 18.068 3.018-2.167 5.176-4.524 10.231-7.147 15.095 5.602-2.112 11.026-4.665 16.27-7.397.643 5.752 1.096 11.558 1.157 17.387 5.561-3.693 10.597-8.026 15.405-12.441 2.709 5.267 5.503 10.493 8.563 15.525 4.095-4.646 8.356-9.141 12.196-14.043 4.52 4.417 8.956 8.917 13.567 13.256-2.179-6.326-4.009-12.78-5.69-19.167 5.343 3.654 11.233 6.643 16.994 9.68-1.574-5.69-3.268-11.332-5.46-16.786 5.864 1.761 11.921 3.268 18.021 4.095-3.08-4.789-6.666-9.284-10.28-13.676 5.485-.295 11.01-1.077 16.516-1.921-4.757-3.81-9.983-7.135-15.333-10.05 5.534-1.503 11.166-2.735 16.892-3.791-5.626-2.42-10.961-5.421-16.204-8.583C45.318 20.301 48.337 14.894 51 9.308c-5.741.25-11.458.74-17.166 1.48C37.07 6.136 40.75 1.762 44.821-2.425c-5.913.689-11.758 1.905-17.514 3.411 1.748-4.832 3.847-9.528 5.892-14.188-5.267 1.831-10.375 4.195-15.346 6.837.283-4.646.126-9.284-.334-13.918" clipRule="evenodd"></path></svg>
              </div>

              <h1 className="text-[42px] sm:text-[60px] lg:text-[72px] leading-[1.05] font-bold text-[#121117] tracking-[-0.03em] mb-10 text-center lg:text-left">
                Швидке навчання <br />
                з вашим ідеальним <br />
                <span className="relative inline-block mt-2">
                  спеціалістом.
                  <svg className="absolute -bottom-3 left-0 w-[110%] h-[20px] text-[#ffc800] -z-10" viewBox="0 0 137 13" fill="currentColor" preserveAspectRatio="none"><path fillRule="evenodd" d="M136.009 2.193c-28.775-1.921-57.94-2.884-86.744-1.921C34.821 1.233 20.378 1.956.126 3.161c-.551.066-1.042.868.175 1.096 16.096 3.011 31.91 5.926 48.064 8.71 28.539 4.931 58.077 4.14 86.815-.992 1.391-.25 2.179-2.124.829-9.782z" clipRule="evenodd"></path></svg>
                </span>
              </h1>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link 
                  href={specialistHref}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-[#121117] border-2 border-transparent text-[18px] font-[600] h-[56px] px-8 rounded-[8px] w-full sm:w-auto hover:bg-primary/90 hover:border-[#121117] transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  Знайти спеціаліста
                  <ArrowRight className="h-6 w-6" />
                </Link>
                <Link 
                  href="#how"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#121117] border-[2px] border-[#121117] text-[18px] font-[600] h-[56px] px-8 rounded-[8px] w-full sm:w-auto hover:bg-gray-50 transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  Як це працює
                </Link>
              </div>
            </div>

            {/* Right Image/Illustration Area */}
            <div className="w-full lg:w-[45%] xl:w-[50%] relative hidden md:block">
              <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]">
                <Image 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" 
                  alt="Happy student learning" 
                  fill 
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Paper / Cartoonish floating badge */}
              <div className="absolute -bottom-8 -left-8 bg-white p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 flex items-center gap-4 rotate-[-3deg] animate-[bounce_6s_infinite]">
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

        {/* Preply-style Stats Strip */}
        <section className="bg-[#f0f3f3] pb-12 border-b border-gray-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-8 py-8 border-t border-gray-200/50">
              <div className="flex items-center gap-3">
                <p className="text-[28px] font-bold text-[#121117] leading-none">32,000+</p>
                <p className="text-[15px] text-[#69686f] leading-snug">Досвідчених<br/>спеціалістів</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-[28px] font-bold text-[#121117] leading-none">300,000+</p>
                <p className="text-[15px] text-[#69686f] leading-snug">5-зіркових<br/>відгуків</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-[28px] font-bold text-[#121117] leading-none">120+</p>
                <p className="text-[15px] text-[#69686f] leading-snug">Напрямків<br/>навчання</p>
              </div>
            </div>
          </div>
        </section>

        {/* Full Specialists Catalog */}
        <section className="bg-slate-50 relative pb-20 pt-8" id="catalog">
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none" />
          <CatalogView />
        </section>

        {/* How it works (Preply Card Layout) */}
        <section id="how" className="py-20 lg:py-28">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tight text-center text-[#121117] mb-16">
              {t("nav.how_it_works")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[t("how.step1.title"), t("how.step2.title"), t("how.step3.title")].map((title, idx) => (
                <div
                  key={title}
                  className="rounded-[24px] bg-white p-8 border border-slate-200/80"
                  style={{ boxShadow: "0 15px 35px rgba(0,0,0,0.08)" }}
                >
                  <div className="w-12 h-12 rounded-full text-[#121117] flex items-center justify-center font-bold text-xl mb-6 bg-[#f0f3f3]">
                    {idx + 1}
                  </div>
                  <h3 className="text-[22px] font-bold text-[#121117] mb-4">{title}</h3>
                  <p className="text-[16px] text-[#69686f] leading-relaxed">{t(`how.step${idx + 1 as 1 | 2 | 3}.desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tight text-center text-[#121117] mb-12">
              Часті запитання
            </h2>
            <div className="space-y-0">
              {faqs.map((faq, idx) => (
                <div key={faq.q} className="border-b border-gray-200 overflow-hidden">
                  <button
                    className="w-full py-6 flex items-center justify-between text-left font-[600] text-[18px] text-[#121117] hover:text-primary transition-colors duration-200"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-6 w-6 shrink-0 text-[#121117] transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="pb-6 pr-8">
                      <p className="text-[16px] text-[#69686f] leading-relaxed">{faq.a}</p>
                    </div>
                  )}
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
