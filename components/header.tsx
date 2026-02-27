"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"

import { useAuth } from "@/lib/auth-context"
import { useTranslation } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { LocaleLink } from "@/components/locale-link"

export function Header({ theme = "education" }: { theme?: "education" | "health" }) {
    const { user } = useAuth()
    const { t } = useTranslation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const dashboardHref = user?.legacyRole === "client" ? "/client" : user?.legacyRole === "specialist" ? "/tutor" : "/admin"
    const specialistHref = user?.legacyRole === "client" ? "/client/specialists" : "/specialists"
    const logoSrc = theme === "health" ? "/logo-health.jpg" : "/logo-education.jpg"

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
                {/* Left: Logo + Primary Nav */}
                <div className="flex items-center gap-4 sm:gap-8 min-w-0">
                    <LocaleLink href="/" className="flex items-center gap-2 group shrink-0">
                        <div className="relative h-8 w-8 sm:h-9 sm:w-9 overflow-hidden rounded-md border border-slate-200 group-hover:border-primary/30 transition-colors">
                            <Image src={logoSrc} alt="Libitum" fill className="object-cover" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-[#121117] hidden xs:block">Libitum</span>
                    </LocaleLink>

                    <nav className="hidden lg:flex items-center gap-6 text-[15px] font-medium text-[#121117]">
                        <LocaleLink href={specialistHref} className="hover:text-primary transition-colors underline-offset-4 hover:underline decoration-2">{t("nav.specialists")}</LocaleLink>
                        <LocaleLink href="/#how" className="hover:text-primary transition-colors underline-offset-4 hover:underline decoration-2">{t("nav.how_it_works")}</LocaleLink>
                        <LocaleLink href="/about" className="hover:text-primary transition-colors underline-offset-4 hover:underline decoration-2">{t("about.title")}</LocaleLink>
                    </nav>
                </div>

                {/* Right: Secondary Nav + Auth */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="hidden sm:block">
                        <LanguageSwitcher />
                    </div>

                    {/* Desktop Auth */}
                    <div className="hidden lg:flex items-center gap-3 ml-2">
                        {user ? (
                            <LocaleLink href={dashboardHref}>
                                <Button className="h-[44px] px-6 rounded-[12px] bg-primary text-white hover:bg-primary/90 shadow-sm transition-all active:scale-95">
                                    {user.legacyRole === "admin" ? "Адмін" : "Кабінет"}
                                </Button>
                            </LocaleLink>
                        ) : (
                            <>
                                <LocaleLink href="/login" className="hover:text-primary transition-colors px-2 font-[600] text-[15px]">
                                    {t("btn.login")}
                                </LocaleLink>
                                <LocaleLink href="/register">
                                    <Button className="h-[44px] px-6 rounded-[12px] bg-primary text-white hover:bg-primary/90 shadow-sm transition-all active:scale-95">
                                        {t("btn.register")}
                                    </Button>
                                </LocaleLink>
                            </>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex items-center lg:hidden gap-1">
                        <div className="sm:hidden scale-90 origin-right">
                            <LanguageSwitcher />
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="hover:bg-gray-100 transition-colors rounded-full h-10 w-10"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6 text-[#121117]" />
                            ) : (
                                <Menu className="h-6 w-6 text-[#121117]" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Content */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 top-[73px] z-[100] bg-white animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="flex flex-col h-full overflow-y-auto p-4 pb-12">
                        <nav className="flex flex-col gap-1 text-[18px] font-semibold text-[#121117] border-b border-gray-100 pb-6 mb-6">
                            <LocaleLink href={specialistHref} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 active:bg-slate-100">
                                {t("nav.specialists")}
                                <span className="text-slate-300">→</span>
                            </LocaleLink>
                            <LocaleLink href="/#how" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 active:bg-slate-100">
                                {t("nav.how_it_works")}
                                <span className="text-slate-300">→</span>
                            </LocaleLink>
                            <LocaleLink href="/about" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 active:bg-slate-100">
                                {t("about.title")}
                                <span className="text-slate-300">→</span>
                            </LocaleLink>
                        </nav>

                        <div className="flex flex-col gap-3">
                            {user ? (
                                <LocaleLink href={dashboardHref} onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                                    <Button className="w-full h-[56px] rounded-[16px] bg-primary text-white text-lg font-bold shadow-md active:scale-[0.98] transition-transform">
                                        {user.legacyRole === "admin" ? "Панель адміністратора" : "Перейти в особистий кабінет"}
                                    </Button>
                                </LocaleLink>
                            ) : (
                                <>
                                    <LocaleLink href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                                        <Button variant="outline" className="w-full h-[56px] rounded-[16px] text-lg font-bold border-slate-200 hover:bg-slate-50 active:scale-[0.98] transition-transform">
                                            {t("btn.login")}
                                        </Button>
                                    </LocaleLink>
                                    <LocaleLink href="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                                        <Button className="w-full h-[56px] rounded-[16px] bg-primary text-white text-lg font-bold shadow-lg active:scale-[0.98] transition-transform">
                                            {t("btn.register")}
                                        </Button>
                                    </LocaleLink>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}
