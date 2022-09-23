import { IEventHandler } from '../../../@shared/events/event-handler.interface'
import { CustomerCreatedEvent } from '../customer-created.event'

export class Log2Handler implements IEventHandler<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated')
  }
}
