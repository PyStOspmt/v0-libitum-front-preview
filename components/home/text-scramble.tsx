"use client"

import { useEffect, useRef, useState } from "react"

const CHARS = "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЮЯабвгдежзиклмнопрстуфхцчшщюя0123456789@#$%"

interface TextScrambleProps {
    text: string
    className?: string
    style?: React.CSSProperties
    delay?: number
    speed?: number
}

export function TextScramble({ text, className, style, delay = 0, speed = 30 }: TextScrambleProps) {
    const [displayed, setDisplayed] = useState("")
    const [started, setStarted] = useState(false)
    const frameRef = useRef<number | null>(null)
    const startTimeRef = useRef(0)

    useEffect(() => {
        const timer = setTimeout(() => setStarted(true), delay)
        return () => clearTimeout(timer)
    }, [delay])

    useEffect(() => {
        if (!started) return

        const totalChars = text.length
        const totalDuration = totalChars * speed
        startTimeRef.current = performance.now()

        const animate = (now: number) => {
            const elapsed = now - startTimeRef.current
            const progress = Math.min(elapsed / totalDuration, 1)

            const revealedCount = Math.floor(progress * totalChars)

            let result = ""
            for (let i = 0; i < totalChars; i++) {
                if (text[i] === " " || text[i] === "\n") {
                    result += text[i]
                } else if (i < revealedCount) {
                    result += text[i]
                } else if (i < revealedCount + 4) {
                    result += CHARS[Math.floor(Math.random() * CHARS.length)]
                } else {
                    result += " "
                }
            }

            setDisplayed(result)

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(animate)
            } else {
                setDisplayed(text)
            }
        }

        frameRef.current = requestAnimationFrame(animate)
        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current)
        }
    }, [started, text, speed])

    return (
        <span className={className} style={style}>
            {started ? displayed : "\u00A0".repeat(text.length)}
        </span>
    )
}
