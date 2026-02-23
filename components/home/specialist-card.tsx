"use client"

import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"

export type Palette = {
  button: string; price: string; glow: string; soft: string; ring: string
}

export type SpecialistData = {
  name: string; subject: string; rating: number; reviews: number
  price: number; image: string; badge: string | null
}

/* ═══════════════════════════════════════════════
   Specialist Card — clean, uniform, performant
   ═══════════════════════════════════════════════ */
export function SpecialistCard({
  s, palette, idx, visible, delay,
}: {
  s: SpecialistData
  palette: Palette
  idx: number
  visible: boolean
  delay: number
}) {
  return (
    <Link
      href="/specialists"
      className="flex-shrink-0 snap-start w-[150px] sm:w-[185px] lg:w-[200px]"
    >
      <div
        className="group relative bg-white rounded-xl border border-slate-200
          h-full flex flex-col shadow-sm
          hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 lg:hover:shadow-xl
          transition-all duration-300"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transitionDelay: `${delay}ms`,
        }}
      >
        {/* Photo — square ratio, handles any real photo gracefully */}
        <div className="relative aspect-square bg-slate-100 overflow-hidden rounded-t-xl">
          <Image
            src={s.image}
            alt={s.name}
            fill
            className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
            crossOrigin="anonymous"
            sizes="(max-width: 640px) 150px, (max-width: 1024px) 185px, 200px"
          />

          {/* Badge */}
          {s.badge && (
            <span
              className="absolute top-2 left-2 text-white text-[10px] font-bold tracking-wide px-2 py-0.5 rounded z-10"
              style={{ backgroundColor: palette.button }}
            >
              {s.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col flex-1">
          <h3 className="font-bold text-slate-800 text-[13px] leading-tight tracking-tight truncate">
            {s.name}
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
            {s.subject}
          </p>

          <div className="flex items-center justify-end mt-auto pt-2.5">
            <span className="text-[12px] font-bold tracking-tight" style={{ color: palette.price }}>
              {"\u20B4"}{s.price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
