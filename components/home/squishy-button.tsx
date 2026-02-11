"use client"

import { motion } from "framer-motion"

interface SquishyButtonProps {
  children: React.ReactNode
  bgColor?: string
  variant?: "filled" | "outline"
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  disabled?: boolean
}

export function SquishyButton({
  children, bgColor = "#009688", variant = "filled", className = "", style, onClick, disabled,
}: SquishyButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`cursor-pointer font-semibold transition-shadow ${
        variant === "filled"
          ? "text-white shadow-md hover:shadow-lg"
          : "border border-slate-200 text-slate-600 hover:bg-slate-50"
      } ${className}`}
      style={{
        ...(variant === "filled" ? { backgroundColor: bgColor } : {}),
        ...style,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  )
}
