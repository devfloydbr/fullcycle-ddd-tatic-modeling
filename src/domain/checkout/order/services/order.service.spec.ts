import { v4 } from 'uuid'

import { Order } from '../entity/order.entity'
import { OrderItem } from '../aggregates/order_item.aggregate'
import { OrderService } from './order.service'
import { Customer } from '../../../customer/entity/costumer.entity'
import { Product } from '../../../product/entity/product.entity'

describe('Order service unit tests', () => {
  it('should throw error when items are empty when place an order', () => {
    expect(() => {
      const customer = new Customer(v4(), 'John')
      OrderService.placeOrder(customer, [])
    }).toThrowError('Order must have at least one item.')
  })

  it('should able to place an order', () => {
    const customer = new Customer(v4(), 'John')
    const item1 = new OrderItem(v4(), '1', 'Item1', 3, 5)
    const order = OrderService.placeOrder(customer, [item1])

    expect(customer.rewardPoints).toBe(7.5)
    expect(order.total()).toBe(15)
  })

  it('should able to get total of all orders', () => {
    const customer1 = new Customer(v4(), 'John')
    const customer2 = new Customer(v4(), 'Mary')

    const product1 = new Product(v4(), 'Product 1', 5)
    const product2 = new Product(v4(), 'Product 2', 3)
    const product3 = new Product(v4(), 'Product 3', 10)

    const item1 = new OrderItem(v4(), product1.id, product1.name, 5, 5)
    const item2 = new OrderItem(v4(), product2.id, product2.name, 3, 5)
    const item3 = new OrderItem(v4(), product3.id, product3.name, 10, 15)

    const order1 = new Order(v4(), customer1.id, [item1])
    const order2 = new Order(v4(), customer2.id, [item2, item3])

    const total = OrderService.total([order1, order2])

    expect(total).toBe(190)
  })

  it('should able to add reward points', () => {
    const customer = new Customer(v4(), 'Mary')
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(20)
  })
})
