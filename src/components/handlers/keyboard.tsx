"use client";

import { useEffect } from "react";

import { events } from "@events";

const DIGIT_KEYS = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
const OPERATOR_KEYS: Record<string, string> = {
  "+": "+",
  "-": "-",
  "*": "*",
  "/": "/",
};

function KeyboardHandler() {
  function onKeyDown(event: KeyboardEvent) {
    const key = event.key;

    if (DIGIT_KEYS.has(key)) {
      events.calculator.digit({ value: key });
      return;
    }

    if (key === "." || key === ",") {
      events.calculator.decimal();
      return;
    }

    if (key in OPERATOR_KEYS) {
      events.calculator.operator({ operator: OPERATOR_KEYS[key] });
      return;
    }

    if (key === "Enter" || key === "=") {
      events.calculator.equals();
      return;
    }

    if (key === "Backspace") {
      events.calculator.delete();
      return;
    }

    if (key === "Escape" || key === "c" || key === "C") {
      events.calculator.clear();
    }
  }

  useEffect(() => {
    events.on("keydown", onKeyDown);

    return () => {
      events.off("keydown", onKeyDown);
    };
  }, []);

  return null;
}

export { KeyboardHandler };
