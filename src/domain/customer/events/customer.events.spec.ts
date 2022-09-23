import { EventDispathcer } from '../../@shared/events/event-dispatcher'
import { CustomerCreatedEvent } from './customer-created.event'
import { Log1Handler } from './handlers/log-log-1.handler'
import { Log2Handler } from './handlers/log-log-2.handler'

describe('Customer events unit tests', () => {
  it('should be able to dispatch events when customer is created', () => {
    const eventDispathcer = new EventDispathcer()

    const eventHandler1 = new Log1Handler()
    const eventHandler2 = new Log2Handler()

    const spyHandler1 = jest.spyOn(eventHandler1, 'handle')
    const spyHandler2 = jest.spyOn(eventHandler2, 'handle')

    eventDispathcer.register('CustomerCreatedEvent', eventHandler1)
    eventDispathcer.register('CustomerCreatedEvent', eventHandler2)

    expect(eventDispathcer.handlers['CustomerCreatedEvent']).toHaveLength(2)
    expect(eventDispathcer.handlers['CustomerCreatedEvent']).toMatchObject([
      eventHandler1,
      eventHandler2
    ])

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: 'Customer 1'
    })

    eventDispathcer.notify(customerCreatedEvent)

    expect(spyHandler1).toHaveBeenCalled()
    expect(spyHandler2).toHaveBeenCalled()
  })
})
