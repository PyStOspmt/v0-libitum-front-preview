"use client"

import {
    BookOpen,
    Calendar,
    CheckCircle2,
    ClipboardList,
    DollarSign,
    Globe,
    Home,
    LayoutDashboard,
    LogOut,
    Menu,
    Settings,
    ShieldCheck,
    TrendingUp,
    UserCog,
    Users,
    X,
} from "lucide-react"
import { usePathname } from "next/navigation"
import type React from "react"
import { useEffect, useState } from "react"

import { LanguageSwitcher } from "@/components/language-switcher"
import { LocaleLink } from "@/components/locale-link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import { useAuth } from "@/lib/auth-context"
import { useTranslation } from "@/lib/i18n"
import { locales } from "@/lib/i18n/config"
import { useLocale } from "@/lib/locale-context"
import { useTheme } from "@/lib/theme-context"
import { cn } from "@/lib/utils"

interface SidebarLayoutProps {
    children: React.ReactNode
    userType: "client" | "tutor" | "admin"
}

export function SidebarLayout({ children, userType }: SidebarLayoutProps) {
    const { user, logout, stopImpersonating } = useAuth()
    const { theme } = useTheme()
    const rawPathname = usePathname()
    const locale = useLocale()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isImpersonating, setIsImpersonating] = useState(false)
    const { t } = useTranslation()

    let pathname = rawPathname
    for (const loc of locales) {
        if (rawPathname.startsWith(`/${loc}/`)) {
            pathname = rawPathname.slice(`/${loc}`.length)
            break
        } else if (rawPathname === `/${loc}`) {
            pathname = "/"
            break
        }
    }

    const sidebarTheme = {
        logoBg: userType === "admin" ? "bg-slate-700" : "",
        activeItem: userType === "admin" ? "bg-slate-100 text-slate-800" : "",
        activeIcon: userType === "admin" ? "text-slate-700" : "",
        label: userType === "admin" ? "text-slate-500" : "",
        accent: theme.primary,
    }

    useEffect(() => {
        const readFlag = () => {
            if (typeof window === "undefined") return false
            return Boolean(localStorage.getItem("admin_user"))
        }

        setTimeout(() => setIsImpersonating(readFlag()), 0)

        const handleStorage = () => setIsImpersonating(readFlag())
        window.addEventListener("storage", handleStorage)
        return () => window.removeEventListener("storage", handleStorage)
    }, [])

    const handleStopImpersonating = () => {
        stopImpersonating()
        setIsImpersonating(false)
    }

    const clientNavItems = [
        { href: "/client", label: t("sidebar.dashboard"), icon: LayoutDashboard },
        { href: "/client/schedule", label: t("sidebar.schedule"), icon: Calendar },
        { href: "/client/requests", label: t("sidebar.requests"), icon: ClipboardList },
        { href: "/client/progress", label: t("sidebar.progress"), icon: TrendingUp },
        { href: "/client/settings", label: t("sidebar.settings"), icon: Settings },
    ]

    const tutorNavItems = [
        { href: "/tutor", label: t("sidebar.dashboard"), icon: LayoutDashboard },
        { href: "/tutor/requests", label: t("sidebar.requests"), icon: ClipboardList },
        { href: "/tutor/exchange", label: t("sidebar.exchange"), icon: TrendingUp },
        { href: "/tutor/clients", label: t("sidebar.clients"), icon: Users },
        { href: "/tutor/schedule", label: t("sidebar.schedule"), icon: Calendar },
        { href: "/tutor/finances", label: t("sidebar.finances"), icon: DollarSign },
        { href: "/tutor/rewards", label: t("sidebar.rewards"), icon: TrendingUp },
        { href: "/tutor/profile", label: t("sidebar.profile"), icon: UserCog },
        { href: "/tutor/settings", label: t("sidebar.settings"), icon: Settings },
    ]

    const adminNavItems = [
        { href: "/admin", label: t("sidebar.dashboard"), icon: LayoutDashboard },
        { href: "/admin/clients", label: t("sidebar.clients"), icon: Users },
        { href: "/admin/specialists", label: t("sidebar.specialists"), icon: UserCog },
        { href: "/admin/moderation", label: t("sidebar.moderation"), icon: CheckCircle2 },
        { href: "/admin/verifications", label: t("sidebar.verifications"), icon: ShieldCheck },
        { href: "/admin/payments", label: t("sidebar.finances"), icon: DollarSign },
        { href: "/admin/analytics", label: t("sidebar.analytics"), icon: TrendingUp },
        { href: "/admin/dictionaries", label: t("sidebar.dictionaries"), icon: ClipboardList },
        { href: "/admin/seo", label: t("sidebar.seo"), icon: Globe },
        { href: "/admin/support-access", label: t("sidebar.support_access"), icon: ShieldCheck },
        { href: "/admin/settings", label: t("sidebar.settings"), icon: Settings },
    ]

    const navItems = userType === "client" ? clientNavItems : userType === "tutor" ? tutorNavItems : adminNavItems

    const navContent = (
        <>
            <div className="flex items-center justify-between p-6 pb-4">
                <LocaleLink href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
                    <div
                        className={cn(
                            "flex h-11 w-11 items-center justify-center rounded-[12px]",
                            sidebarTheme.logoBg || "shadow-lg",
                        )}
                        style={!sidebarTheme.logoBg ? { background: theme.gradient } : {}}
                    >
                        <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <div className="hidden lg:block text-left">
                        <p className="text-lg font-bold text-[#121117] leading-tight">Libitum</p>
                        <p className={cn("text-xs font-medium", sidebarTheme.label)}>
                            {userType === "client"
                                ? t("role.client")
                                : userType === "tutor"
                                  ? t("role.tutor")
                                  : t("role.admin")}
                        </p>
                    </div>
                </LocaleLink>

                <div className="flex items-center gap-2">
                    <div className="lg:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <X className="h-5 w-5 text-[#69686f]" />
                        </Button>
                    </div>
                </div>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-2">
                {isImpersonating && (
                    <Button
                        variant="outline"
                        className="mb-6 w-full justify-start gap-3 border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-[8px] h-[48px] font-[600] transition-all"
                        onClick={handleStopImpersonating}
                    >
                        <ShieldCheck className="h-5 w-5" />
                        <span>{t("sidebar.return_admin")}</span>
                    </Button>
                )}

                <LocaleLink href="/">
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 mb-2 rounded-[8px] text-[#69686f] hover:bg-gray-100 hover:text-[#121117] h-[48px] font-[600] transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <Home className="h-5 w-5" />
                        <span>{t("sidebar.home")}</span>
                    </Button>
                </LocaleLink>

                <div className="h-px bg-gray-200 my-4 mx-2" />

                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                        <LocaleLink key={item.href} href={item.href}>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start gap-3 rounded-[8px] h-[48px] transition-all font-[600]",
                                    isActive
                                        ? userType === "admin"
                                            ? sidebarTheme.activeItem
                                            : "text-[#121117] bg-[#f0f3f3]"
                                        : "text-[#69686f] hover:bg-gray-100 hover:text-[#121117]",
                                )}
                                style={
                                    isActive && userType !== "admin"
                                        ? { backgroundColor: theme.primaryLight, color: theme.primaryDark }
                                        : {}
                                }
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Icon
                                    className={cn(
                                        "h-5 w-5 transition-colors",
                                        isActive
                                            ? userType === "admin"
                                                ? sidebarTheme.activeIcon
                                                : "text-[#121117]"
                                            : "text-[#69686f]",
                                    )}
                                    style={isActive && userType !== "admin" ? { color: theme.primaryDark } : {}}
                                />
                                <span>{item.label}</span>
                            </Button>
                        </LocaleLink>
                    )
                })}
            </nav>

            <div className="p-4 mt-auto">
                <div className="rounded-[16px] border border-gray-200 bg-white p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10 border border-gray-100">
                            <AvatarFallback
                                className="font-bold text-white"
                                style={!sidebarTheme.logoBg ? { background: theme.gradient } : {}}
                            >
                                {user?.name?.[0] ?? "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                            <p className="truncate text-[14px] font-[600] text-[#121117]">{user?.name}</p>
                            <p className="truncate text-[13px] text-[#69686f]">{user?.email}</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-[#69686f] hover:text-rose-600 hover:bg-rose-50 rounded-[8px] h-[40px] px-3 transition-colors font-[600]"
                        onClick={logout}
                    >
                        <LogOut className="h-4 w-4" />
                        <span className="text-[14px]">{t("sidebar.logout")}</span>
                    </Button>
                </div>
            </div>
        </>
    )

    return (
        <div className="flex h-screen overflow-hidden bg-[#f0f3f3] font-sans text-[#121117]">
            {/* Desktop Sidebar */}
            <aside className="hidden w-[280px] flex-col border-r border-gray-200 bg-white lg:flex">{navContent}</aside>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <aside className="absolute left-0 top-0 h-full w-[280px] flex-col border-r border-gray-200 bg-white flex animate-in slide-in-from-left duration-300 shadow-2xl">
                        {navContent}
                    </aside>
                </div>
            )}

            <div className="flex-1 overflow-y-auto">
                {/* Mobile Header */}
                <header className="flex items-center justify-between border-b border-gray-200 bg-white p-4 lg:hidden sticky top-0 z-40">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="-ml-2 hover:bg-gray-100 transition-colors"
                    >
                        <Menu className="h-6 w-6 text-[#121117]" />
                    </Button>
                    <div className="flex items-center gap-2">
                        <div
                            className="flex h-8 w-8 items-center justify-center rounded-[8px]"
                            style={!sidebarTheme.logoBg ? { background: theme.gradient } : {}}
                        >
                            <BookOpen className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-bold text-[#121117]">Libitum</span>
                    </div>
                    <div className="flex items-center justify-end w-12">
                        <LanguageSwitcher />
                    </div>
                </header>

                {/* Desktop Language Switcher */}
                <div className="hidden lg:block fixed top-6 right-8 z-50">
                    <LanguageSwitcher />
                </div>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-[#f0f3f3] p-2 sm:p-4 lg:p-8">{children}</main>
            </div>
        </div>
    )
}
