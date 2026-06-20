import { useStore } from 'zustand'

import { calculatorStore, type CalculatorStore } from '@/stores/calculator'

function useCalculatorStore<T>(selector: (state: CalculatorStore) => T) {
  return useStore(calculatorStore, selector)
}

export { useCalculatorStore }
