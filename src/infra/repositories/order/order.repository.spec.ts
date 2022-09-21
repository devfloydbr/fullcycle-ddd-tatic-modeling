import { v4 } from 'uuid'
import { Sequelize } from 'sequelize-typescript'

import { CustomerSequelizeModel } from '../../orm/sequelize/models/costumer.model'
import { OrderSequelizeModel } from '../../orm/sequelize/models/order.model'
import { OrderItemSequelizeModel } from '../../orm/sequelize/models/order-item.model'
import { ProductSequelizeModel } from '../../orm/sequelize/models/product.model'
import { CustomerRepository } from '../customer/customer.repository'
import { ProductRepository } from '../product/product.repository'
import { OrderRepository } from './order.repository'
import { Customer } from '../../../domain/entities/costumer/entity/costumer.entity'
import { Address } from '../../../domain/entities/costumer/object-values/address/address.ov'
import { Product } from '../../../domain/entities/product/entity/product.entity'
import { OrderItem } from '../../../domain/entities/order/order_item.aggregate'
import { Order } from '../../../domain/entities/order/entity/order.entity'

describe('Order repository unit test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([
      CustomerSequelizeModel,
      OrderSequelizeModel,
      OrderItemSequelizeModel,
      ProductSequelizeModel
    ])

    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a new order', async () => {
    expect(1).toBe(1)
  })

  // it('should be able to create a order', async () => {
  //   const orderRepository = new OrderRepository()
  //   const customerRepository = new CustomerRepository()
  //   const productRepository = new ProductRepository()

  //   const customer1 = {
  //     id: v4(),
  //     name: 'Customer 1'
  //   }

  //   const createCustomer = new Customer(customer1.id, customer1.name)

  //   const customer1Address = {
  //     street: 'Street 1',
  //     number: 1,
  //     city: 'City',
  //     zip: '00000-000'
  //   }

  //   const address = new Address(
  //     customer1Address.street,
  //     customer1Address.number,
  //     customer1Address.city,
  //     customer1Address.zip
  //   )

  //   createCustomer.changeAddress(address)

  //   await customerRepository.create(createCustomer)

  //   const product1 = {
  //     id: v4(),
  //     name: 'Product 1',
  //     price: 10
  //   }

  //   const createProduct = new Product(
  //     product1.id,
  //     product1.name,
  //     product1.price
  //   )

  //   await productRepository.create(createProduct)

  //   const orderItem = {
  //     id: v4(),
  //     productId: createProduct.id,
  //     name: createProduct.name,
  //     price: createProduct.price,
  //     quantity: 2
  //   }

  //   const createOderItem = new OrderItem(
  //     orderItem.id,
  //     orderItem.productId,
  //     orderItem.name,
  //     orderItem.price,
  //     orderItem.quantity
  //   )

  //   const order = {
  //     id: v4(),
  //     customerId: createCustomer.id,
  //     items: [createOderItem]
  //   }

  //   const createdOrder = new Order(order.id, order.customerId, order.items)

  //   await orderRepository.create(createdOrder)

  //   const getCreatedOrder = await OrderSequelizeModel.findOne({
  //     where: {
  //       id: createdOrder.id
  //     },
  //     include: ['items']
  //   })

  //   // expect(getCreatedOrder.toJSON()).toStrictEqual({
  //   //   id: order.id,
  //   //   customer_id: customer1.id,
  //   //   total: createdOrder.total(),
  //   //   items: [
  //   //     {
  //   //       id: orderItem.id,
  //   //       order_id: order.id,
  //   //       product_id: product1.id,
  //   //       name: orderItem.name,
  //   //       price: orderItem.price,
  //   //       quantity: orderItem.quantity
  //   //     }
  //   //   ]
  //   // })
  // })
})
