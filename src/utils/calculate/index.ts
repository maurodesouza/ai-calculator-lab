type CalculateArgs = {
  left: number
  right: number
}

/**
 * Adds two numbers.
 */
export function add(args: CalculateArgs) {
  return args.left + args.right
}

/**
 * Subtracts the right number from the left number.
 */
export function subtract(args: CalculateArgs) {
  return args.left - args.right
}

/**
 * Multiplies two numbers.
 */
export function multiply(args: CalculateArgs) {
  return args.left * args.right
}

type DivideResult = { success: true; value: number } | { success: false; error: 'division-by-zero' }

/**
 * Divides the left number by the right number.
 * Returns an error when dividing by zero instead of Infinity/NaN.
 */
export function divide(args: CalculateArgs): DivideResult {
  if (args.right === 0) {
    return { success: false, error: 'division-by-zero' }
  }

  return { success: true, value: args.left / args.right }
}

export type { CalculateArgs, DivideResult }
