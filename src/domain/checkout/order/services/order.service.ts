import { v4 } from 'uuid'
import { Customer } from '../../../customer/entity/costumer.entity'

import { OrderItem } from '../aggregates/order_item.aggregate'
import { Order } from '../entity/order.entity'

export class OrderService {
  static total(orders: Order[]) {
    return orders.reduce((acc, order) => acc + order.total(), 0)
  }

  static placeOrder(customer: Customer, items: OrderItem[]) {
    if (items.length === 0) {
      throw new Error(`Order must have at least one item.`)
    }

    const order = new Order(v4(), customer.id, items)
    customer.addRewardPoints(order.total() / 2)

    return order
  }
}
