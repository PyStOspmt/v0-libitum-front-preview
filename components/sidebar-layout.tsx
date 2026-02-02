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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SidebarLayoutProps {
  children: React.ReactNode
  userType: "client" | "tutor" | "admin"
}

export function SidebarLayout({ children, userType }: SidebarLayoutProps) {
  const { user, logout, stopImpersonating } = useAuth()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isImpersonating, setIsImpersonating] = useState(false)

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

  const languages = [
    { code: "UA", label: "Українська" },
    { code: "EN", label: "English" },
    { code: "RU", label: "Русский" },
  ]

  const currentLanguage = user?.language || "UA"

  const handleLanguageChange = (code: string) => {
    // In a real app, update user preference via API
    if (user) {
      const updatedUser = { ...user, language: code as any }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      window.location.reload()
    }
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
      <div className="flex items-center justify-between border-b p-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-sm font-semibold">Libitum</p>
            <p className="text-xs text-muted-foreground">
              {userType === "client" ? "Учень" : userType === "tutor" ? "Спеціаліст" : "Адміністратор"}
            </p>
          </div>
        </Link>

        <LanguageSwitcher />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {isImpersonating && (
          <Button
            variant="outline"
            className="mb-4 w-full justify-start gap-3 border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"
            onClick={handleStopImpersonating}
          >
            <ShieldCheck className="h-5 w-5" />
            <span>Повернутися в Адмін</span>
          </Button>
        )}
        
        <Link href="/">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 mb-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Home className="h-5 w-5" />
            <span>На головну</span>
          </Button>
        </Link>

        <div className="h-px bg-border my-2" />

        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn("w-full justify-start gap-3", isActive && "bg-primary/10 text-primary")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-4">
        <div className="mb-3 flex items-center gap-3 rounded-lg bg-muted p-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{user?.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">{user?.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <Button variant="ghost" className="w-full justify-start gap-3 text-destructive" onClick={logout}>
          <LogOut className="h-5 w-5" />
          <span>Вийти</span>
        </Button>
      </div>
    </>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-muted/30">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-card lg:flex">
        <NavContent />
      </aside>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 flex-col border-r bg-card flex">
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <BookOpen className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Libitum</p>
                  <p className="text-xs text-muted-foreground">
                    {userType === "client" ? "Учень" : userType === "tutor" ? "Спеціаліст" : "Адміністратор"}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <NavContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="flex items-center justify-between border-b bg-card p-4 lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold">Libitum</span>
          </div>
          <div className="w-10" />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
