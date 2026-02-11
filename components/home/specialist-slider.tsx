"use client"

import Link from "next/link"
import { useRef, useCallback, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { SpecialistCard, type Palette, type SpecialistData } from "./specialist-card"

const B = {
  pri: "#009688",
  light: "#E0F2F1",
  mid: "#B2DFDB",
} as const

const PALETTES: Record<string, Palette> = {
  tutor: { button: B.pri, price: B.pri, glow: "rgba(0,150,136,0.07)", soft: "rgba(0,150,136,0.04)", ring: B.mid },
  health: { button: "#f59e0b", price: "#d97706", glow: "rgba(245,158,11,0.07)", soft: "rgba(245,158,11,0.04)", ring: "#fde68a" },
}

export function getPalette(type: string): Palette {
  return type === "tutor" ? PALETTES.tutor : PALETTES.health
}

/* Gradient colors for accent types */
const GRADIENTS: Record<string, string> = {
  tutor: "linear-gradient(135deg, #009688, #10b981, #34d399)",
  health: "linear-gradient(135deg, #f59e0b, #f97316, #fb923c)",
}

/* ═══════════════════════════════════════════════
   Clickable Section Header with icon
   ═══════════════════════════════════════════════ */
function SectionHeader({
  title, icon: Icon, palette, type, catalogHref,
}: {
  title: string; icon: LucideIcon; palette: Palette; type: string; catalogHref: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setOffset({
      x: (e.clientX - cx) * 0.08,
      y: (e.clientY - cy) * 0.08,
    })
  }, [])

  const handleLeave = useCallback(() => setOffset({ x: 0, y: 0 }), [])

  const gradient = GRADIENTS[type] || GRADIENTS.tutor

  return (
    <Link href={catalogHref}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="flex items-center gap-2.5 cursor-pointer select-none group"
      >
        {/* Section icon with gradient bg */}
        <div
          className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
          style={{ background: gradient }}
        >
          <Icon className="h-4 w-4 text-white" />
        </div>

        {/* Title with gradient text */}
        <h2
          className="font-bold tracking-tight bg-clip-text text-transparent group-hover:opacity-80 transition-opacity"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            lineHeight: 1.3,
            backgroundImage: gradient,
          }}
        >
          {title}
        </h2>

        {/* Arrow hint */}
        <ArrowRight
          className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-200"
          style={{ color: palette.button }}
        />

        {/* Pulse dot */}
        <span
          className="inline-block h-1.5 w-1.5 rounded-full pulse-dot ml-1"
          style={{ backgroundColor: palette.button }}
        />
      </motion.div>
    </Link>
  )
}

/* ═══════════════════════════════════════════════
   Specialist Slider
   ═══════════════════════════════════════════════ */
export function SpecialistSlider({
  title, type, icon, specialists, visible, catalogHref, catalogLabel,
}: {
  title: string
  type: string
  icon: LucideIcon
  specialists: SpecialistData[]
  visible: boolean
  catalogHref: string
  catalogLabel: string
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const palette = getPalette(type)

  const scroll = useCallback((dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -260 : 260, behavior: "smooth" })
  }, [])

  return (
    <div className="py-1">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-end justify-between mb-4"
      >
        <SectionHeader title={title} icon={icon} palette={palette} type={type} catalogHref={catalogHref} />

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll("left")}
            className="h-7 w-7 rounded-md border border-slate-200 flex items-center justify-center text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-colors cursor-pointer bg-white"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="h-7 w-7 rounded-md border border-slate-200 flex items-center justify-center text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-colors cursor-pointer bg-white"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </motion.div>

      {/* Scrollable row */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-3.5 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {specialists.map((s, i) => (
            <SpecialistCard
              key={i}
              s={s}
              palette={palette}
              idx={i}
              visible={visible}
              delay={(i + 1) * 80}
            />
          ))}

          {/* "View all" card */}
          <Link href={catalogHref} className="flex-shrink-0 w-[170px] sm:w-[190px] lg:w-[200px] snap-start">
            <div
              className="rounded-xl border overflow-hidden h-full flex flex-col items-center justify-center min-h-[240px] sm:min-h-[260px] group cursor-pointer hover:shadow-md transition-shadow"
              style={{ backgroundColor: B.light, borderColor: B.mid }}
            >
              <div
                className="h-10 w-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: palette.button }}
              >
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
              <span className="text-xs font-bold tracking-tight" style={{ color: palette.button }}>
                {catalogLabel}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
