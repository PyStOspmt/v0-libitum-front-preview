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

  // Disable tilt effect - card no longer rotates
  const handleMove = useCallback(() => {
    // No tilt effect applied
  }, [])

  const handleLeave = useCallback(() => {
    // No reset needed since no tilt effect
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
