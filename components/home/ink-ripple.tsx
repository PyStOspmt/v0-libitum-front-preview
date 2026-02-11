"use client"

import { useCallback, useRef } from "react"

interface Ripple {
  id: number
  x: number
  y: number
}

export function InkRippleLayer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const idCounter = useRef(0)

  const handleClick = useCallback((e: React.MouseEvent) => {
    const el = containerRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ripple = document.createElement("div")
    ripple.className = "ink-ripple-circle"
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    el.appendChild(ripple)

    ripple.addEventListener("animationend", () => {
      ripple.remove()
    })
  }, [])

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className="absolute inset-0 z-[1] cursor-pointer overflow-hidden"
      style={{ pointerEvents: "auto" }}
    />
  )
}
