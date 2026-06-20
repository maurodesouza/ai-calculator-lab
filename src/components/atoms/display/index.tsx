'use client'

import * as React from 'react'

import { useCalculatorStore } from '@/hooks/use-calculator-store'
import { cn } from '@/utils/cn'
import { twx } from '@/utils/twx'

const containerClasses = twx`base-1 flex flex-col gap-1 rounded-lg bg-background-base p-md text-right`

function Container(props: React.ComponentProps<'div'>) {
  const { className, ...rest } = props
  return <div className={cn(containerClasses, className)} {...rest} />
}

function Expression(props: React.ComponentProps<'span'>) {
  const { className, ...rest } = props
  const previousOperand = useCalculatorStore((state) => state.previousOperand)
  const operator = useCalculatorStore((state) => state.operator)

  const value = operator ? `${previousOperand} ${operator}` : previousOperand

  return (
    <span className={cn('text-foreground-min text-sm', className)} {...rest}>
      {value}
    </span>
  )
}

function Result(props: React.ComponentProps<'span'>) {
  const { className, ...rest } = props
  const currentOperand = useCalculatorStore((state) => state.currentOperand)

  return (
    <span className={cn('text-foreground-max text-3xl font-semibold', className)} {...rest}>
      {currentOperand}
    </span>
  )
}

export const Display = {
  Container,
  Expression,
  Result,
}
