import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[8px] border-2 text-[16px] font-[600] transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        default:
          'text-[#121117] border-[#121117] bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-hover)] hover:border-[#121117]',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 border-transparent',
        outline:
          'border-[#121117] bg-white text-[#121117] hover:bg-gray-50',
        secondary:
          'bg-[#E2E8F0] border-transparent text-[#121117] hover:bg-[#CBD5E1]',
        ghost:
          'border-transparent bg-transparent text-[#121117] hover:bg-gray-100 hover:border-gray-100',
        link: 'text-primary underline-offset-4 hover:underline border-transparent',
      },
      size: {
        default: 'h-[48px] px-6 py-2',
        sm: 'h-[40px] px-4 py-1.5 text-[14px]',
        lg: 'h-[56px] px-8 py-3 text-[18px]',
        icon: 'size-[48px]',
        'icon-sm': 'size-[40px]',
        'icon-lg': 'size-[56px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
