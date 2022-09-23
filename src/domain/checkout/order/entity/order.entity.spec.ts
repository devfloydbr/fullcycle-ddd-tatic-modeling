import { OrderItem } from '../aggregates/order_item.aggregate'
import { Order } from './order.entity'

describe('Order unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Order('', '1', [])
    }).toThrowError('ID is required.')
  })

  it('should throw error when customerId is empty', () => {
    expect(() => {
      new Order('1', '', [])
    }).toThrowError('Customer ID is required.')
  })

  it('should throw error when items length equal zero.', () => {
    expect(() => {
      new Order('1', '1', [])
    }).toThrowError('Items length must be greater than zero.')
  })

  it('should calculate total.', () => {
    const item1 = new OrderItem('1', '1', 'Item 1', 5, 2)
    const item2 = new OrderItem('2', '1', 'Item 2', 3, 5)
    const item3 = new OrderItem('3', '1', 'Item 3', 10, 15)

    const order = new Order('1', '1', [item1, item2, item3])

    const total = order.total()

    expect(total).toBe(175)
  })

  it('should throw error if the item quantity is less or equal zero.', () => {
    expect(() => {
      const item1 = new OrderItem('1', '1', 'Item 1', 5, 0)
      const item2 = new OrderItem('2', '1', 'Item 2', 3, 5)
      const item3 = new OrderItem('3', '1', 'Item 3', 10, 15)

      new Order('1', '1', [item1, item2, item3])
    }).toThrowError('Quantity must be greater than zero.')
  })
})
