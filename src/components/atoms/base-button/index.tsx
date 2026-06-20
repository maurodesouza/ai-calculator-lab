import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'

import { cn } from '@/utils/cn'
import { tv, type VariantProps } from '@/lib/tailwind-variants'

const baseButtonVariants = tv({
  base: 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-outer disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      default:
        'tone palette-brand bg-tone-luminosity-500 text-tone-foreground-contrast hover:bg-tone-luminosity-400',
      destructive:
        'tone palette-danger bg-tone-luminosity-500 text-tone-foreground-contrast hover:bg-tone-luminosity-400',
      outline: 'border border-ring-inner bg-background-base hover:bg-background-support',
      secondary:
        'tone palette-brand bg-tone-luminosity-100 text-tone-foreground-context hover:bg-tone-luminosity-200',
      ghost: 'hover:bg-background-support',
      link: 'text-foreground underline-offset-4 hover:underline',
    },
    size: {
      default: 'h-10 px-md py-sm',
      sm: 'h-8 rounded-md px-sm text-xs',
      lg: 'h-12 rounded-md px-lg',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

type BaseButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof baseButtonVariants> & {
    asChild?: boolean
  }

function BaseButton(props: BaseButtonProps) {
  const { className, variant, size, asChild = false, ...rest } = props
  const Comp = asChild ? Slot : 'button'

  return <Comp className={cn(baseButtonVariants({ variant, size, className }))} {...rest} />
}

export { BaseButton, baseButtonVariants }
