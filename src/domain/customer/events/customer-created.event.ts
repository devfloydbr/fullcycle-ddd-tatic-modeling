import { IEvent } from '../../@shared/events/event.interface'

export class CustomerCreatedEvent implements IEvent {
  ocurredAt: Date
  data: any

  constructor(data: any) {
    this.ocurredAt = new Date()
    this.data = data
  }
}
