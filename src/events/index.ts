import { Events } from '@types'
import { Handles } from './handles'

type Callback = (payload: any) => void
type EventName = Events | keyof DocumentEventMap

class EventsHandle extends Handles {
  on(event: EventName, callback: Callback) {
    document.addEventListener(event, callback)
  }

  off(event: EventName, callback: Callback) {
    document.removeEventListener(event, callback)
  }
}

const events = new EventsHandle()

export { events }
export type { Callback, EventName }
