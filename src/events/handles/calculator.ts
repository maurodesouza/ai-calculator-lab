import { Events } from "@types";
import { BaseEventHandle } from "./base";

export type CalcDigitPayload = {
  value: string;
};

export type CalcOperatorPayload = {
  operator: string;
};

class CalculatorHandleEvents extends BaseEventHandle {
  digit(payload: CalcDigitPayload) {
    this.emit(Events.CALC_DIGIT, payload);
  }

  decimal() {
    this.emit(Events.CALC_DECIMAL);
  }

  operator(payload: CalcOperatorPayload) {
    this.emit(Events.CALC_OPERATOR, payload);
  }

  equals() {
    this.emit(Events.CALC_EQUALS);
  }

  clear() {
    this.emit(Events.CALC_CLEAR);
  }

  delete() {
    this.emit(Events.CALC_DELETE);
  }
}

export { CalculatorHandleEvents };
