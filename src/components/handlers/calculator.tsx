"use client";

import { useEffect } from "react";

import { events } from "@events";
import {
  type CalcDigitPayload,
  type CalcOperatorPayload,
} from "@events/handles/calculator";
import { Events } from "@types";
import { calculatorStore } from "@/stores/calculator";
import {
  add,
  divide,
  multiply,
  subtract,
  type CalculateArgs,
} from "@/utils/calculate";

const MAX_DIGITS = 12;

function executeAdd(args: CalculateArgs) {
  return add(args);
}

function executeSubtract(args: CalculateArgs) {
  return subtract(args);
}

function executeMultiply(args: CalculateArgs) {
  return multiply(args);
}

function executeDivide(args: CalculateArgs) {
  const result = divide(args);

  if (!result.success) return NaN;

  return result.value;
}

const OPERATORS: Record<string, (args: CalculateArgs) => number> = {
  "+": executeAdd,
  "-": executeSubtract,
  "*": executeMultiply,
  "/": executeDivide,
};

function formatNumber(value: number) {
  if (!Number.isFinite(value)) return "Error";

  const string = String(value);
  if (string.length <= MAX_DIGITS) return string;

  return value.toPrecision(MAX_DIGITS);
}

function evaluate(left: number, operator: string, right: number) {
  const operation = OPERATORS[operator];

  if (!operation) return formatNumber(right);

  return formatNumber(operation({ left, right }));
}

function CalculatorHandler() {
  function onDigit(event: CustomEvent<CalcDigitPayload>) {
    const { value } = event.detail;
    const state = calculatorStore.getState();

    if (state.overwrite) {
      calculatorStore
        .getState()
        .set({ currentOperand: value, overwrite: false });
      return;
    }

    if (state.currentOperand === "0") {
      calculatorStore.getState().set({ currentOperand: value });
      return;
    }

    if (state.currentOperand.length >= MAX_DIGITS) return;

    calculatorStore
      .getState()
      .set({ currentOperand: `${state.currentOperand}${value}` });
  }

  function onDecimal() {
    const state = calculatorStore.getState();

    if (state.overwrite) {
      calculatorStore
        .getState()
        .set({ currentOperand: "0.", overwrite: false });
      return;
    }

    if (state.currentOperand.includes(".")) return;

    calculatorStore
      .getState()
      .set({ currentOperand: `${state.currentOperand}.` });
  }

  function onOperator(event: CustomEvent<CalcOperatorPayload>) {
    const { operator } = event.detail;
    const state = calculatorStore.getState();

    if (state.currentOperand === "Error") return;

    if (state.previousOperand && state.operator && !state.overwrite) {
      const left = Number(state.previousOperand);
      const right = Number(state.currentOperand);
      const result = evaluate(left, state.operator, right);

      calculatorStore.getState().set({
        previousOperand: result,
        currentOperand: result,
        operator,
        overwrite: true,
      });
      return;
    }

    calculatorStore.getState().set({
      previousOperand: state.currentOperand,
      operator,
      overwrite: true,
    });
  }

  function onEquals() {
    const state = calculatorStore.getState();

    if (
      !state.operator ||
      !state.previousOperand ||
      state.currentOperand === "Error"
    )
      return;

    const left = Number(state.previousOperand);
    const right = Number(state.currentOperand);
    const result = evaluate(left, state.operator, right);

    calculatorStore.getState().set({
      previousOperand: "",
      currentOperand: result,
      operator: null,
      overwrite: true,
    });
  }

  function onClear() {
    calculatorStore.getState().reset();
  }

  function onDelete() {
    const state = calculatorStore.getState();

    if (state.overwrite) {
      calculatorStore.getState().set({ currentOperand: "0", overwrite: false });
      return;
    }

    if (state.currentOperand.length === 1) {
      calculatorStore.getState().set({ currentOperand: "0" });
      return;
    }

    calculatorStore
      .getState()
      .set({ currentOperand: state.currentOperand.slice(0, -1) });
  }

  useEffect(() => {
    events.on(Events.CALC_DIGIT, onDigit);
    events.on(Events.CALC_DECIMAL, onDecimal);
    events.on(Events.CALC_OPERATOR, onOperator);
    events.on(Events.CALC_EQUALS, onEquals);
    events.on(Events.CALC_CLEAR, onClear);
    events.on(Events.CALC_DELETE, onDelete);

    return () => {
      events.off(Events.CALC_DIGIT, onDigit);
      events.off(Events.CALC_DECIMAL, onDecimal);
      events.off(Events.CALC_OPERATOR, onOperator);
      events.off(Events.CALC_EQUALS, onEquals);
      events.off(Events.CALC_CLEAR, onClear);
      events.off(Events.CALC_DELETE, onDelete);
    };
  }, []);

  return null;
}

export { CalculatorHandler };
