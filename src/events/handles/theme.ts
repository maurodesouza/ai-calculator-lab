import { Events } from "@types";
import { BaseEventHandle } from "./base";

export type ThemeSetPayload = {
  theme: "light" | "dark";
};

class ThemeHandleEvents extends BaseEventHandle {
  set(payload: ThemeSetPayload) {
    this.emit(Events.THEME_SET, payload);
  }

  toggle() {
    this.emit(Events.THEME_TOGGLE);
  }
}

export { ThemeHandleEvents };
