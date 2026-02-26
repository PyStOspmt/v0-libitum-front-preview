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

function StatCard({ stat, index, visible }: { stat: any, index: number, visible: boolean }) {
  const Icon = stat.icon
  const count = useCountUp(
    stat.decimal ? Math.round(stat.value * 10) : stat.value,
    2200 + index * 200,
    visible
  )
  const display = stat.decimal
    ? (count / 10).toFixed(1)
    : count.toLocaleString("uk-UA")

  return (
    <div
      className={`relative group bg-white border border-slate-200/80 rounded-[20px] p-5 sm:p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#00c5a6]/[0.03] rounded-full group-hover:scale-150 group-hover:bg-[#00c5a6]/[0.05] transition-transform duration-500" />
      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 relative z-10">
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-[#e8fffb] text-[#00a389] group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121117] flex items-baseline">
          {display}
          {stat.suffix && <span className="text-[#00a389] ml-0.5">{stat.suffix}</span>}
        </div>
      </div>
      <p className="text-[13px] sm:text-[14px] font-medium text-[#69686f] leading-snug relative z-10">{stat.label}</p>
    </div>
  )
}

export function AnimatedCounter({ visible }: { visible: boolean }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
      {STATS.map((stat, i) => (
        <StatCard key={i} stat={stat} index={i} visible={visible} />
      ))}
    </div>
  )
}
