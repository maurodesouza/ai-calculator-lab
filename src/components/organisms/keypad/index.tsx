'use client'

import * as React from 'react'

import { events } from '@events'
import { Clickable } from '@/components/atoms/clickable'
import { cn } from '@/utils/cn'
import { twx } from '@/utils/twx'

const containerClasses = twx`grid grid-cols-4 gap-sm`

function Container(props: React.ComponentProps<'div'>) {
  const { className, ...rest } = props
  return <div className={cn(containerClasses, className)} {...rest} />
}

type KeyAction =
  | { action: 'digit'; value: string }
  | { action: 'operator'; value: string }
  | { action: 'decimal' }
  | { action: 'equals' }
  | { action: 'clear' }
  | { action: 'delete' }

type KeypadKeyProps = React.ComponentProps<'button'> &
  KeyAction & {
    tone?: 'neutral' | 'brand' | 'success' | 'danger'
    variant?: 'solid' | 'subtle' | 'ghost' | 'outline'
  }

function computeAriaLabel(
  action: KeypadKeyProps['action'],
  value?: string | number | readonly string[]
) {
  const stringValue = typeof value === 'string' ? value : undefined

  if (action === 'digit') return `Digit ${stringValue}`
  if (action === 'operator') {
    const label =
      stringValue === '/'
        ? 'divide'
        : stringValue === '*'
          ? 'multiply'
          : stringValue === '-'
            ? 'subtract'
            : 'add'
    return label
  }
  if (action === 'decimal') return 'Decimal'
  if (action === 'equals') return 'Equals'
  if (action === 'clear') return 'Clear'
  if (action === 'delete') return 'Delete'

  return ''
}

function Key(props: KeypadKeyProps) {
  const { className, action, value, tone = 'neutral', variant = 'solid', ...rest } = props

  function onClick() {
    const stringValue = typeof value === 'string' ? value : ''

    if (action === 'digit') {
      events.calculator.digit({ value: stringValue })
      return
    }

    if (action === 'operator') {
      events.calculator.operator({ operator: stringValue })
      return
    }

    if (action === 'decimal') {
      events.calculator.decimal()
      return
    }

    if (action === 'equals') {
      events.calculator.equals()
      return
    }

    if (action === 'clear') {
      events.calculator.clear()
      return
    }

    if (action === 'delete') {
      events.calculator.delete()
    }
  }

  return (
    <Clickable.Button
      aria-label={computeAriaLabel(action, value)}
      className={cn('h-14 w-full text-lg', className)}
      tone={tone}
      variant={variant}
      onClick={onClick}
      {...rest}
    />
  )
}

export const Keypad = {
  Container,
  Key,
}
