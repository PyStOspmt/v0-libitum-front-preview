"use client"

import { Shield, Clock, CreditCard, Headphones, CheckCircle, Zap } from "lucide-react"

const ITEMS = [
  { icon: Shield, text: "Верифіковані спеціалісти" },
  { icon: Clock, text: "Гнучкий розклад" },
  { icon: CreditCard, text: "Безпечна оплата" },
  { icon: Headphones, text: "Підтримка 24/7" },
  { icon: CheckCircle, text: "Гарантія якості" },
  { icon: Zap, text: "Перший урок — знижка" },
]

export function TrustMarquee() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div className="relative overflow-hidden py-4 border-y border-slate-100 bg-slate-50/50">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => {
          const Icon = item.icon
          return (
            <div
              key={i}
              className="inline-flex items-center gap-2 mx-6 sm:mx-8 flex-shrink-0"
            >
              <Icon className="h-3.5 w-3.5 text-teal-600 flex-shrink-0" />
              <span className="text-xs font-medium text-slate-600 tracking-tight">
                {item.text}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
