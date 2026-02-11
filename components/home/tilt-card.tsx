"use client"

import { useRef, useCallback } from "react"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  intensity?: number
}

export function TiltCard({ children, className = "", intensity = 8 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current
    const glare = glareRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    const rotateX = (0.5 - y) * intensity
    const rotateY = (x - 0.5) * intensity

    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`

    if (glare) {
      const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 90
      glare.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0.15) 0%, transparent 60%)`
      glare.style.opacity = "1"
    }
  }, [intensity])

  const handleLeave = useCallback(() => {
    const el = cardRef.current
    const glare = glareRef.current
    if (!el) return
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    if (glare) glare.style.opacity = "0"
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease-out",
        willChange: "transform",
      }}
    >
      {children}
      <div
        ref={glareRef}
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-20"
        style={{ opacity: 0, transition: "opacity 0.3s ease" }}
      />
    </div>
  )
}
