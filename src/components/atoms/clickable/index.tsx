import * as React from 'react'

import { cn } from '@/utils/cn'
import { tv, type VariantProps } from '@/lib/tailwind-variants'

const buttonVariants = tv({
  base: 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-outer disabled:pointer-events-none disabled:opacity-50',
  variants: {
    tone: {
      brand: 'tone palette-brand',
      success: 'tone palette-success',
      danger: 'tone palette-danger',
      neutral: '',
    },
    variant: {
      solid: 'bg-tone-luminosity-500 text-tone-foreground-contrast hover:bg-tone-luminosity-400',
      subtle: 'bg-tone-luminosity-100 text-tone-foreground-context hover:bg-tone-luminosity-200',
      ghost: 'hover:bg-background-support',
      outline: 'border border-ring-inner bg-background-base hover:bg-background-support',
    },
    size: {
      sm: 'h-8 px-sm text-xs',
      md: 'h-12 px-md text-base',
      lg: 'h-14 px-lg text-lg',
      icon: 'h-12 w-12',
    },
  },
  compoundVariants: [
    {
      tone: 'neutral',
      variant: 'solid',
      class: 'bg-foreground-max text-background-base hover:bg-foreground',
    },
    {
      tone: 'neutral',
      variant: 'subtle',
      class: 'bg-background-support text-foreground hover:bg-ring-inner',
    },
  ],
  defaultVariants: {
    tone: 'neutral',
    variant: 'solid',
    size: 'md',
  },
})

type ClickableButtonProps = React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>

function ClickableButton(props: ClickableButtonProps) {
  const { className, tone, variant, size, ...rest } = props

  return <button className={cn(buttonVariants({ tone, variant, size, className }))} {...rest} />
}

export const Clickable = {
  Button: ClickableButton,
}

export { buttonVariants }
