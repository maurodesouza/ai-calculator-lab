import { Events } from "@types";
import { Handles } from "./handles";

// The event bus is intentionally typed loosely to accept handlers with
// typed CustomEvent payloads as well as native DOM event listeners.

type Callback = (payload: any) => void;
type EventName = Events | keyof DocumentEventMap;

class EventsHandle extends Handles {
  on(event: EventName, callback: Callback) {
    document.addEventListener(event, callback);
  }

  off(event: EventName, callback: Callback) {
    document.removeEventListener(event, callback);
  }
}

const events = new EventsHandle();

export { events };
export type { Callback, EventName };
