import { OrderItem } from '../../../../domain/checkout/order/aggregates/order_item.aggregate'
import { Order } from '../../../../domain/checkout/order/entity/order.entity'
import { IOrderRepository } from '../../../../domain/checkout/order/repository/order-repository.interface'
import { OrderItemSequelizeModel } from '../model/order-item.model'
import { OrderSequelizeModel } from '../model/order.model'

export class OrderRepository implements IOrderRepository {
  async create(entity: Order) {
    await OrderSequelizeModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map(item => ({
          id: item.id,
          product_id: item.productId,
          order_id: entity.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      },
      {
        include: [{ model: OrderItemSequelizeModel }]
      }
    )
  }

  async update(entity: Order) {
    const sequelize = OrderSequelizeModel.sequelize

    await sequelize.transaction(async t => {
      await OrderItemSequelizeModel.destroy({
        where: { order_id: entity.id },
        transaction: t
      })

      const items = entity.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id
      }))

      await OrderItemSequelizeModel.bulkCreate(items, { transaction: t })

      await OrderSequelizeModel.update(
        { total: entity.total() },
        { where: { id: entity.id }, transaction: t }
      )
    })
  }

  async find(id: string) {
    let orderModel = {} as OrderSequelizeModel

    try {
      orderModel = await OrderSequelizeModel.findOne({
        where: {
          id
        },
        include: [{ model: OrderItemSequelizeModel }],
        rejectOnEmpty: true
      })
    } catch {
      throw new Error('Order not found.')
    }

    const order = new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map(
        item =>
          new OrderItem(
            item.id,
            item.product_id,
            item.name,
            item.price,
            item.quantity
          )
      )
    )

    return order
  }

  async findAll() {
    const orderModels = await OrderSequelizeModel.findAll({
      include: [{ model: OrderItemSequelizeModel }]
    })

    const orders = orderModels.map(order => {
      let generateOrder = new Order(
        order.id,
        order.customer_id,
        order.items.map(
          item =>
            new OrderItem(
              item.id,
              item.product_id,
              item.name,
              item.price,
              item.quantity
            )
        )
      )

      return generateOrder
    })

    return orders
  }
}
