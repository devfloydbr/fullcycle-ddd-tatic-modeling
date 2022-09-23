import { SendEmailWhenProductCreatedHandler } from '../../product/events/handlers/send-email-when-product-created.handler'
import { ProductCreatedEvent } from '../../product/events/product-created.event'
import { EventDispathcer } from './event-dispatcher'

describe('Event dispatcher unit tests', () => {
  it('should be able to register an event handler', () => {
    const eventDispathcer = new EventDispathcer()
    const eventHandler = new SendEmailWhenProductCreatedHandler()

    eventDispathcer.register('ProductCreated', eventHandler)

    expect(eventDispathcer.handlers['ProductCreated']).toBeDefined()

    expect(eventDispathcer.handlers['ProductCreated'].length).toBe(1)

    expect(eventDispathcer.handlers['ProductCreated'][0]).toMatchObject(
      eventHandler
    )
  })

  it('should be able to unregister an event handler', () => {
    const eventDispathcer = new EventDispathcer()
    const eventHandler = new SendEmailWhenProductCreatedHandler()

    eventDispathcer.register('ProductCreated', eventHandler)

    expect(eventDispathcer.handlers['ProductCreated'][0]).toMatchObject(
      eventHandler
    )

    eventDispathcer.unregister('ProductCreated', eventHandler)

    expect(eventDispathcer.handlers['ProductCreated']).toBeDefined()

    expect(eventDispathcer.handlers['ProductCreated'].length).toBe(0)
  })

  it('should be able to unregister all event handlers', () => {
    const eventDispathcer = new EventDispathcer()
    const eventHandler = new SendEmailWhenProductCreatedHandler()

    eventDispathcer.register('ProductCreated', eventHandler)

    expect(eventDispathcer.handlers['ProductCreated'][0]).toMatchObject(
      eventHandler
    )

    eventDispathcer.unregisterAll()

    expect(eventDispathcer.handlers['ProductCreated']).toBeUndefined()
  })

  it('should be able to notify all event handlers', () => {
    const eventDispathcer = new EventDispathcer()
    const eventHandler = new SendEmailWhenProductCreatedHandler()
    const spyHandler = jest.spyOn(eventHandler, 'handle')

    eventDispathcer.register('ProductCreatedEvent', eventHandler)

    expect(eventDispathcer.handlers['ProductCreatedEvent'][0]).toMatchObject(
      eventHandler
    )

    const productCreatedEvent = new ProductCreatedEvent({
      name: 'Product 1',
      description: 'Product 1 description',
      price: 10
    })

    eventDispathcer.notify(productCreatedEvent)

    expect(spyHandler).toHaveBeenCalled()
  })
})
