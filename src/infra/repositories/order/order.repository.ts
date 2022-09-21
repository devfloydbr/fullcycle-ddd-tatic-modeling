import { Order } from '../../../domain/entities/order/entity/order.entity'
import { OrderItemSequelizeModel } from '../../orm/sequelize/models/order-item.model'

import { OrderSequelizeModel } from '../../orm/sequelize/models/order.model'

// implements IOrderRepositoryInterface

export class OrderRepository {
  async create(entity: Order) {
    await OrderSequelizeModel.create(
      {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total(),
        items: entity.items.map(item => ({
          id: item.id,
          product_id: item.productId,
          order_id: entity.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      }
      // {
      //   include: [{ model: OrderItemSequelizeModel }]
      // }
    )
  }

  // async update(entity: Customer) {
  //   await CustomerSequelizeModel.update(
  //     {
  //       id: entity.id,
  //       name: entity.name,
  //       active: entity.isActive(),
  //       rewardPoints: entity.rewardPoints,
  //       street: entity.address.street,
  //       number: entity.address.number,
  //       city: entity.address.city,
  //       zip: entity.address.zip
  //     },
  //     {
  //       where: {
  //         id: entity.id
  //       }
  //     }
  //   )
  // }

  // async find(id: string) {
  //   let customerModel = {} as CustomerSequelizeModel

  //   try {
  //     customerModel = await CustomerSequelizeModel.findOne({
  //       where: {
  //         id
  //       },
  //       rejectOnEmpty: true
  //     })
  //   } catch {
  //     throw new Error('Customer not found.')
  //   }

  //   const customer = new Customer(id, customerModel.name)

  //   const address = new Address(
  //     customerModel.street,
  //     customerModel.number,
  //     customerModel.city,
  //     customerModel.zip
  //   )

  //   customer.changeAddress(address)

  //   return customer
  // }

  // async findAll() {
  //   const customerModels = await CustomerSequelizeModel.findAll()

  //   const customers = customerModels.map(customer => {
  //     let generateCustomer = new Customer(customer.id, customer.name)
  //     generateCustomer.addRewardPoints(customer.rewardPoints)

  //     const generateAddress = new Address(
  //       customer.street,
  //       customer.number,
  //       customer.city,
  //       customer.zip
  //     )

  //     generateCustomer.changeAddress(generateAddress)

  //     if (customer.active) {
  //       generateCustomer.activate()
  //     }

  //     return generateCustomer
  //   })

  //   return customers
  // }
}
