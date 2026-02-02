"use client"

import { useEffect, useState } from "react"
import { Clock, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface CountdownTimerProps {
  expiresAt: string
  onExpire?: () => void
  variant?: "default" | "warning" | "danger"
  showIcon?: boolean
  className?: string
}

export function CountdownTimer({
  expiresAt,
  onExpire,
  variant = "default",
  showIcon = true,
  className,
}: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>("")
  const [isExpired, setIsExpired] = useState(false)
  const [urgency, setUrgency] = useState<"normal" | "warning" | "danger">("normal")

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date()
      const expires = new Date(expiresAt)
      const diff = expires.getTime() - now.getTime()

      if (diff <= 0) {
        setIsExpired(true)
        setTimeRemaining("Прострочено")
        onExpire?.()
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      // Set urgency based on time remaining
      if (hours === 0 && minutes <= 20) {
        setUrgency("danger")
      } else if (hours < 1) {
        setUrgency("warning")
      } else {
        setUrgency("normal")
      }

      if (hours > 0) {
        setTimeRemaining(`${hours} год ${minutes} хв`)
      } else {
        setTimeRemaining(`${minutes} хв`)
      }
    }

    calculateTimeRemaining()
    const interval = setInterval(calculateTimeRemaining, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [expiresAt, onExpire])

  const getVariantStyles = () => {
    const effectiveVariant = variant !== "default" ? variant : urgency

    switch (effectiveVariant) {
      case "danger":
        return "text-red-600 bg-red-50 border-red-200"
      case "warning":
        return "text-orange-600 bg-orange-50 border-orange-200"
      default:
        return "text-muted-foreground bg-muted/50 border-border"
    }
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium",
        getVariantStyles(),
        isExpired && "text-red-700 bg-red-100 border-red-300",
        className,
      )}
    >
      {showIcon &&
        (urgency === "danger" || isExpired ? <AlertTriangle className="h-3 w-3" /> : <Clock className="h-3 w-3" />)}
      <span>{isExpired ? "Прострочено" : `Залишилось ${timeRemaining}`}</span>
    </div>
  )
}
