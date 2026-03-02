"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { BookOpen, GraduationCap, Heart, MessageCircle, Sparkles } from "lucide-react"
import { useCallback, useRef } from "react"

/* ── Floating icon with parallax ── */
function FloatingIcon({
    icon: Icon,
    x,
    y,
    size,
    delay,
    color,
    blur,
}: {
    icon: React.ElementType
    x: string
    y: string
    size: number
    delay: number
    color: string
    blur: number
}) {
    const { scrollY } = useScroll()
    const yOffset = useTransform(scrollY, [0, 600], [0, -40 - delay * 10])

    return (
        <motion.div
            className="absolute pointer-events-none"
            style={{ left: x, top: y, y: yOffset }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay * 0.15, duration: 0.8, ease: "easeOut" }}
        >
            <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 3, -3, 0] }}
                transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut" }}
                style={{ filter: `blur(${blur}px)` }}
            >
                <Icon size={size} color={color} strokeWidth={1.2} />
            </motion.div>
        </motion.div>
    )
}

const FLOATING_ICONS = [
    { icon: BookOpen, x: "8%", y: "15%", size: 28, delay: 0, color: "rgba(16,185,129,0.18)", blur: 1 },
    { icon: Heart, x: "85%", y: "20%", size: 22, delay: 1, color: "rgba(245,158,11,0.18)", blur: 1.5 },
    { icon: MessageCircle, x: "75%", y: "65%", size: 26, delay: 2, color: "rgba(0,150,136,0.15)", blur: 1 },
    { icon: Sparkles, x: "15%", y: "70%", size: 20, delay: 3, color: "rgba(245,158,11,0.15)", blur: 2 },
    { icon: GraduationCap, x: "92%", y: "45%", size: 24, delay: 4, color: "rgba(16,185,129,0.14)", blur: 1.5 },
    { icon: BookOpen, x: "50%", y: "80%", size: 18, delay: 5, color: "rgba(0,150,136,0.12)", blur: 2 },
]

/* ═══════════════════════════════════════════════
   Hero Spotlight Section
   — Uses ref-based mouse tracking (no state updates → no re-renders)
   ═══════════════════════════════════════════════ */
export function HeroSpotlight({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const spotlightRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const el = containerRef.current
        const spot = spotlightRef.current
        if (!el || !spot) return
        const rect = el.getBoundingClientRect()
        const rx = ((e.clientX - rect.left) / rect.width) * 100
        const ry = ((e.clientY - rect.top) / rect.height) * 100
        spot.style.background = `
      radial-gradient(600px circle at ${rx}% ${ry}%, rgba(16,185,129,0.06) 0%, transparent 50%),
      radial-gradient(400px circle at ${rx + 5}% ${ry - 5}%, rgba(245,158,11,0.04) 0%, transparent 50%)
    `
    }, [])

    return (
        <section ref={containerRef} onMouseMove={handleMouseMove} className="relative overflow-hidden grain-overlay">
            {/* Mouse-follower dual-color spotlight (updated via ref, zero re-renders) */}
            <div ref={spotlightRef} className="pointer-events-none absolute inset-0 z-0" />

            {/* Floating parallax icons */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {FLOATING_ICONS.map((props, i) => (
                    <FloatingIcon key={i} {...props} />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </section>
    )
}
