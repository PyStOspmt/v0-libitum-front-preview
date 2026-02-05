"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import {
  BookOpen,
  LayoutDashboard,
  Calendar,
  Users,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X,
  CheckCircle2,
  UserCog,
  ClipboardList,
  TrendingUp,
  ShieldCheck,
  Globe,
  Home,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarLayoutProps {
  children: React.ReactNode
  userType: "client" | "tutor" | "admin"
}

export function SidebarLayout({ children, userType }: SidebarLayoutProps) {
  const { user, logout, stopImpersonating } = useAuth()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isImpersonating, setIsImpersonating] = useState(false)

  const isPsychologist = user?.subjects?.some((subject) =>
    subject.toLowerCase().includes("психол") || subject.toLowerCase().includes("psych")
  )

  const theme = (() => {
    if (userType === "admin") {
      return {
        logoBg: "bg-slate-700",
        activeItem: "bg-slate-100 text-slate-800",
        activeIcon: "text-slate-700",
        label: "text-slate-500",
        accent: "#64748b"
      }
    }
    if (userType === "client") {
      return {
        logoBg: "bg-[#5c6bc0]",
        activeItem: "bg-[#e8eaf6] text-[#3949ab]",
        activeIcon: "text-[#5c6bc0]",
        label: "text-[#7986cb]",
        accent: "#5c6bc0"
      }
    }
    if (userType === "tutor" && isPsychologist) {
      return {
        logoBg: "bg-[#ffb74d]",
        activeItem: "bg-[#fff8e1] text-[#f57c00]",
        activeIcon: "text-[#ffb74d]",
        label: "text-[#ffb74d]",
        accent: "#ffb74d"
      }
    }
    return {
      logoBg: "bg-[#43a047]",
      activeItem: "bg-[#e8f5e9] text-[#2e7d32]",
      activeIcon: "text-[#43a047]",
      label: "text-[#66bb6a]",
      accent: "#43a047"
    }
  })()

  useEffect(() => {
    const readFlag = () => {
      if (typeof window === "undefined") return false
      return Boolean(localStorage.getItem("admin_user"))
    }

    setIsImpersonating(readFlag())

    const handleStorage = () => setIsImpersonating(readFlag())
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  const handleStopImpersonating = () => {
    stopImpersonating()
    setIsImpersonating(false)
  }

  const clientNavItems = [
    { href: "/client", label: "Дашборд", icon: LayoutDashboard },
    { href: "/client/schedule", label: "Розклад", icon: Calendar },
    { href: "/client/requests", label: "Заявки", icon: ClipboardList },
    { href: "/client/progress", label: "Прогрес", icon: TrendingUp },
    { href: "/client/settings", label: "Налаштування", icon: Settings },
  ]

  const tutorNavItems = [
    { href: "/tutor", label: "Дашборд", icon: LayoutDashboard },
    { href: "/tutor/requests", label: "Мої заявки", icon: ClipboardList },
    { href: "/tutor/exchange", label: "Біржа", icon: TrendingUp },
    { href: "/tutor/clients", label: "Учні", icon: Users },
    { href: "/tutor/schedule", label: "Розклад", icon: Calendar },
    { href: "/tutor/finances", label: "Фінанси", icon: DollarSign },
    { href: "/tutor/profile", label: "Профіль", icon: UserCog },
    { href: "/tutor/settings", label: "Налаштування", icon: Settings },
  ]

  const adminNavItems = [
    { href: "/admin", label: "Дашборд", icon: LayoutDashboard },
    { href: "/admin/clients", label: "Користувачі", icon: Users },
    { href: "/admin/specialists", label: "Репетитори", icon: UserCog },
    { href: "/admin/moderation", label: "Модерація", icon: CheckCircle2 },
    { href: "/admin/verifications", label: "Верифікація", icon: ShieldCheck },
    { href: "/admin/payments", label: "Фінанси", icon: DollarSign },
    { href: "/admin/analytics", label: "Аналітика", icon: TrendingUp },
    { href: "/admin/dictionaries", label: "Довідники", icon: ClipboardList },
    { href: "/admin/seo", label: "SEO", icon: Globe },
    { href: "/admin/support-access", label: "Support Access", icon: ShieldCheck },
    { href: "/admin/settings", label: "Налаштування", icon: Settings },
  ]

  const navItems = userType === "client" ? clientNavItems : userType === "tutor" ? tutorNavItems : adminNavItems

  const NavContent = () => (
    <>
      <div className="flex items-center justify-between p-6 pb-4">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-2xl",
              theme.logoBg
            )}
          >
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-lg font-bold text-slate-800 leading-tight">Libitum</p>
            <p className={cn("text-xs font-medium", theme.label)}>
              {userType === "client"
                ? "Кабінет учня"
                : userType === "tutor"
                  ? isPsychologist
                    ? "Кабінет психолога"
                    : "Кабінет викладача"
                  : "Адмін-панель"}
            </p>
          </div>
        </Link>

        <div className="lg:hidden">
          <LanguageSwitcher />
        </div>
      </div>

      <div className="px-5 mb-4 hidden lg:block">
        <LanguageSwitcher />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-2">
        {isImpersonating && (
          <Button
            variant="outline"
            className="mb-6 w-full justify-start gap-3 border-[#ffb74d]/30 bg-[#fff8e1] text-[#f57c00] hover:bg-[#ffecb3] rounded-xl"
            onClick={handleStopImpersonating}
          >
            <ShieldCheck className="h-5 w-5" />
            <span>Повернутися в Адмін</span>
          </Button>
        )}

        <Link href="/">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 mb-2 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-700 h-11"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Home className="h-5 w-5" />
            <span>На головну</span>
          </Button>
        </Link>

        <div className="h-px bg-slate-100 my-4 mx-2" />

        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 rounded-xl h-11 transition-all font-medium",
                  isActive ? theme.activeItem : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isActive ? theme.activeIcon : "text-slate-400"
                  )}
                />
                <span>{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="rounded-2xl border border-slate-100 bg-white p-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-10 w-10 border border-slate-100">
              <AvatarFallback className={cn("font-bold text-white", theme.logoBg)}>
                {user?.name?.[0] ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-bold text-slate-800">{user?.name}</p>
              <p className="truncate text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl h-9 px-2 transition-colors"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm font-medium">Вийти з акаунту</span>
          </Button>
        </div>
      </div>
    </>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-[#fafaf8]">
      {/* Desktop Sidebar */}
      <aside className="hidden w-72 flex-col border-r border-slate-100 bg-white lg:flex">
        <NavContent />
      </aside>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/20"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-72 flex-col border-r bg-white flex animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <div className="flex items-center gap-3">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-2xl", theme.logoBg)}>
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Libitum</p>
                  <p className="text-xs text-slate-500">
                    {userType === "client" ? "Учень" : userType === "tutor" ? "Спеціаліст" : "Адмін"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-full hover:bg-slate-100"
              >
                <X className="h-5 w-5 text-slate-500" />
              </Button>
            </div>
            <NavContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="flex items-center justify-between border-b border-slate-100 bg-white p-4 lg:hidden sticky top-0 z-10">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)} className="-ml-2">
            <Menu className="h-6 w-6 text-slate-700" />
          </Button>
          <div className="flex items-center gap-2">
            <div className={cn("flex h-8 w-8 items-center justify-center rounded-xl", theme.logoBg)}>
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-slate-800">Libitum</span>
          </div>
          <div className="w-10" />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
