import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tagged-template helper for static, reusable Tailwind class strings.
 */
export function twx(strings: TemplateStringsArray, ...values: ClassValue[]) {
  const merged = strings.reduce((result, string, index) => {
    const value = values[index]

    return value === undefined ? result + string : result + string + value
  }, '')

  return twMerge(clsx(merged))
}
