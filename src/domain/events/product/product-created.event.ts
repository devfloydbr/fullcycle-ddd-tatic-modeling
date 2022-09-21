import { IEvent } from '../@shared/event.interface'

export class ProductCreatedEvent implements IEvent {
  ocurredAt: Date
  data: any

  constructor(data: any) {
    this.ocurredAt = new Date()
    this.data = data
  }
}
