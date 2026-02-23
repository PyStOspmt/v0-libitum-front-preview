"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "@/lib/theme-context"
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
  const { theme } = useTheme()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isImpersonating, setIsImpersonating] = useState(false)

  const sidebarTheme = {
    logoBg: userType === "admin" ? "bg-slate-700" : "",
    activeItem: userType === "admin" 
      ? "bg-slate-100 text-slate-800" 
      : "",
    activeIcon: userType === "admin" ? "text-slate-700" : "",
    label: userType === "admin" ? "text-slate-500" : "",
    accent: theme.primary,
  }

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
    { href: "/tutor/rewards", label: "Магазин винагород", icon: TrendingUp },
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
              "flex h-11 w-11 items-center justify-center rounded-[12px]",
              sidebarTheme.logoBg || "shadow-lg"
            )}
            style={!sidebarTheme.logoBg ? { background: theme.gradient } : {}}
          >
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-lg font-bold text-[#121117] leading-tight">Libitum</p>
            <p className={cn("text-xs font-medium", sidebarTheme.label)}>
              {userType === "client"
                ? "Кабінет учня"
                : userType === "tutor"
                  ? theme.type === "psychologist"
                    ? "Кабінет психолога"
                    : theme.type === "speech-therapist"
                      ? "Кабінет логопеда"
                      : "Кабінет викладача"
                  : "Адмін-панель"}
            </p>
          </div>
        </Link>

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
          <div className="lg:hidden">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="px-5 mb-4 hidden lg:block">
        <LanguageSwitcher />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-2">
        {isImpersonating && (
          <Button
            variant="outline"
            className="mb-6 w-full justify-start gap-3 border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-[8px] h-[48px] font-[600] transition-all"
            onClick={handleStopImpersonating}
          >
            <ShieldCheck className="h-5 w-5" />
            <span>Повернутися в Адмін</span>
          </Button>
        )}

        <Link href="/">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 mb-2 rounded-[8px] text-[#69686f] hover:bg-gray-100 hover:text-[#121117] h-[48px] font-[600] transition-all"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Home className="h-5 w-5" />
            <span>На головну</span>
          </Button>
        </Link>

        <div className="h-px bg-gray-200 my-4 mx-2" />

        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 rounded-[8px] h-[48px] transition-all font-[600]",
                  isActive 
                    ? userType === "admin" 
                      ? sidebarTheme.activeItem
                      : "text-[#121117] bg-[#f0f3f3]"
                    : "text-[#69686f] hover:bg-gray-100 hover:text-[#121117]"
                )}
                style={isActive && userType !== "admin" ? { backgroundColor: theme.primaryLight, color: theme.primaryDark } : {}}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isActive ? (userType === "admin" ? sidebarTheme.activeIcon : "text-[#121117]") : "text-[#69686f]"
                  )}
                  style={isActive && userType !== "admin" ? { color: theme.primaryDark } : {}}
                />
                <span>{item.label}</span>
              </Button>
            </Link>
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
            <span className="text-[14px]">Вийти з акаунту</span>
          </Button>
        </div>
      </div>
    </>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-[#f0f3f3] font-sans text-[#121117]">
      {/* Desktop Sidebar */}
      <aside className="hidden w-[280px] flex-col border-r border-gray-200 bg-white lg:flex">
        <NavContent />
      </aside>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-[280px] flex-col border-r border-gray-200 bg-white flex animate-in slide-in-from-left duration-300 shadow-2xl">
            <NavContent />
          </aside>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white p-4 lg:hidden sticky top-0 z-10">
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
          <div className="w-10" />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#f0f3f3] p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
