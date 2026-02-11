"use client"

import { useEffect, useRef, useState } from "react"
import { Users, BookOpen, Star, Award } from "lucide-react"

function useCountUp(target: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0)
  const ref = useRef<number | null>(null)

  useEffect(() => {
    if (!start) return
    const startTime = performance.now()
    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) ref.current = requestAnimationFrame(step)
    }
    ref.current = requestAnimationFrame(step)
    return () => { if (ref.current) cancelAnimationFrame(ref.current) }
  }, [target, duration, start])

  return value
}

const STATS = [
  { icon: Users, label: "Активних учнів", value: 2400, suffix: "+" },
  { icon: BookOpen, label: "Проведених занять", value: 18500, suffix: "+" },
  { icon: Star, label: "Середній рейтинг", value: 4.9, suffix: "", decimal: true },
  { icon: Award, label: "Верифікованих спеціалістів", value: 350, suffix: "+" },
]

export function AnimatedCounter({ visible }: { visible: boolean }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
      {STATS.map((stat, i) => {
        const Icon = stat.icon
        const count = useCountUp(
          stat.decimal ? Math.round(stat.value * 10) : stat.value,
          2200 + i * 200,
          visible
        )
        const display = stat.decimal
          ? (count / 10).toFixed(1)
          : count.toLocaleString("uk-UA")

        return (
          <div
            key={i}
            className="relative text-center py-4 px-3 rounded-xl bg-white border border-slate-100 shadow-sm
              hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transitionDelay: `${i * 100}ms`,
              transitionDuration: "500ms",
            }}
          >
            <div className="flex items-center justify-center mb-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
                <Icon className="h-4 w-4 text-teal-600" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight tabular-nums">
              {display}{stat.suffix}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
              {stat.label}
            </div>
          </div>
        )
      })}
    </div>
  )
}
