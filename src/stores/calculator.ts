import { createStore } from "zustand";

type CalculatorState = {
  previousOperand: string;
  currentOperand: string;
  operator: string | null;
  overwrite: boolean;
};

type CalculatorStore = CalculatorState & {
  set: (state: Partial<CalculatorState>) => void;
  reset: () => void;
};

const initialState: CalculatorState = {
  previousOperand: "",
  currentOperand: "0",
  operator: null,
  overwrite: false,
};

const calculatorStore = createStore<CalculatorStore>((set) => ({
  ...initialState,
  set: (state) => set(state),
  reset: () => set(initialState),
}));

export { calculatorStore };
export type { CalculatorState, CalculatorStore };
