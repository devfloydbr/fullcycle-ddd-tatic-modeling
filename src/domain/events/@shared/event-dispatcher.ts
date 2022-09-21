import { IEventDispatcher } from './event-dispatcher.interface'
import { IEventHandler } from './event-handler.interface'
import { IEvent } from './event.interface'

type EventHandlers = {
  [eventName: string]: IEventHandler[]
}

export class EventDispathcer implements IEventDispatcher {
  private _handlers: EventHandlers = {}

  get handlers() {
    return this._handlers
  }

  notify(event: IEvent) {
    const eventName = event.constructor.name

    if (this._handlers[eventName]) {
      this._handlers[eventName].forEach(handler => handler.handle(event))
    }
  }

  register(eventName: string, eventHandler: IEventHandler<IEvent>) {
    if (!this._handlers[eventName]) {
      this._handlers[eventName] = []
    }

    this._handlers[eventName].push(eventHandler)
  }

  unregister(eventName: string, eventHandler: IEventHandler<IEvent>) {
    if (!this._handlers[eventName]) {
      return
    }

    const index = this._handlers[eventName].indexOf(eventHandler)

    if (index !== -1) {
      this._handlers[eventName].splice(index, 1)
    }
  }

  unregisterAll() {
    this._handlers = {}
  }
}
