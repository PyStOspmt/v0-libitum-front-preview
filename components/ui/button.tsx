"use client"

import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[14px] font-bold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 active:scale-[0.98]",
    {
        variants: {
            variant: {
                default:
                    "bg-[var(--theme-primary)] text-white shadow-sm hover:bg-[var(--theme-primary-hover)] hover:shadow-md hover:-translate-y-0.5 border border-transparent",
                destructive:
                    "bg-red-500 text-white shadow-sm hover:bg-red-600 hover:shadow-md hover:-translate-y-0.5 border border-transparent",
                outline: "border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900",
                secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 border border-transparent",
                ghost: "text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-transparent",
                link: "text-[var(--theme-primary)] underline-offset-4 hover:underline border border-transparent",
            },
            size: {
                default: "h-[48px] px-6 text-[15px]",
                sm: "h-[40px] px-4 text-[14px] rounded-[12px]",
                lg: "h-[56px] px-8 text-[16px] rounded-[16px]",
                icon: "h-[48px] w-[48px]",
                "icon-sm": "h-[40px] w-[40px] rounded-[12px]",
                "icon-lg": "h-[56px] w-[56px] rounded-[16px]",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
)

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }) {
    const Comp = asChild ? Slot : "button"

    return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
