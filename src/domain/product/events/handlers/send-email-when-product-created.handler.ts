import { IEventHandler } from '../../../@shared/events/event-handler.interface'
import { ProductCreatedEvent } from '../product-created.event'

export class SendEmailWhenProductCreatedHandler
  implements IEventHandler<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    console.log(`Sending email to ...`)
  }
}
