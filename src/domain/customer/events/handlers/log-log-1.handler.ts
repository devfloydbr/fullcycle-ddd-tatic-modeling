import { IEventHandler } from '../../../@shared/events/event-handler.interface'
import { CustomerCreatedEvent } from '../customer-created.event'

export class Log1Handler implements IEventHandler<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log('Esse é o primeiro console.log do evento: CustomerCreated')
  }
}
