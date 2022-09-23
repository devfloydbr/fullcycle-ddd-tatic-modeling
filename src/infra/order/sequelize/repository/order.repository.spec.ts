import { v4 } from 'uuid'
import { Sequelize } from 'sequelize-typescript'

import { ProductSequelizeModel } from '../../../product/sequelize/model/product.model'

import { OrderRepository } from './order.repository'

import { OrderItem } from '../../../../domain/checkout/order/aggregates/order_item.aggregate'
import { Order } from '../../../../domain/checkout/order/entity/order.entity'
import { Customer } from '../../../../domain/customer/entity/costumer.entity'
import { Address } from '../../../../domain/customer/object-values/address/address.ov'
import { Product } from '../../../../domain/product/entity/product.entity'
import { CustomerRepository } from '../../../customer/sequelize/repository/customer.repository'
import { ProductRepository } from '../../../product/sequelize/repository/product.repository'
import { OrderSequelizeModel } from '../model/order.model'
import { CustomerSequelizeModel } from '../../../customer/sequelize/model/costumer.model'
import { OrderItemSequelizeModel } from '../model/order-item.model'

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

  it('should be able to create a order', async () => {
    const orderRepository = new OrderRepository()
    const customerRepository = new CustomerRepository()
    const productRepository = new ProductRepository()

    const customer1 = {
      id: v4(),
      name: 'Customer 1'
    }

    const createCustomer = new Customer(customer1.id, customer1.name)

    const customer1Address = {
      street: 'Street 1',
      number: 1,
      city: 'City',
      zip: '00000-000'
    }

    const address = new Address(
      customer1Address.street,
      customer1Address.number,
      customer1Address.city,
      customer1Address.zip
    )

    createCustomer.changeAddress(address)

    await customerRepository.create(createCustomer)

    const product1 = {
      id: v4(),
      name: 'Product 1',
      price: 10
    }

    const createProduct = new Product(
      product1.id,
      product1.name,
      product1.price
    )

    await productRepository.create(createProduct)

    const orderItem = {
      id: v4(),
      productId: createProduct.id,
      name: createProduct.name,
      price: createProduct.price,
      quantity: 2
    }

    const createOderItem = new OrderItem(
      orderItem.id,
      orderItem.productId,
      orderItem.name,
      orderItem.price,
      orderItem.quantity
    )

    const order = {
      id: v4(),
      customerId: createCustomer.id,
      items: [createOderItem]
    }

    const createdOrder = new Order(order.id, order.customerId, order.items)

    await orderRepository.create(createdOrder)

    const getCreatedOrder = await OrderSequelizeModel.findOne({
      where: {
        id: createdOrder.id
      },
      include: ['items']
    })

    expect(getCreatedOrder.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer1.id,
      total: createdOrder.total(),
      items: [
        {
          id: orderItem.id,
          order_id: order.id,
          product_id: product1.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity
        }
      ]
    })
  })

  it('should be able to update a order', async () => {
    const orderRepository = new OrderRepository()
    const customerRepository = new CustomerRepository()
    const productRepository = new ProductRepository()

    const customer1 = {
      id: v4(),
      name: 'Customer 1'
    }

    const createCustomer = new Customer(customer1.id, customer1.name)

    const customer1Address = {
      street: 'Street 1',
      number: 1,
      city: 'City',
      zip: '00000-000'
    }

    const address = new Address(
      customer1Address.street,
      customer1Address.number,
      customer1Address.city,
      customer1Address.zip
    )

    createCustomer.changeAddress(address)

    await customerRepository.create(createCustomer)

    const product1 = {
      id: v4(),
      name: 'Product 1',
      price: 10
    }

    const createProduct = new Product(
      product1.id,
      product1.name,
      product1.price
    )

    await productRepository.create(createProduct)

    const orderItem1 = {
      id: v4(),
      productId: createProduct.id,
      name: createProduct.name,
      price: createProduct.price,
      quantity: 2
    }

    const createOderItem1 = new OrderItem(
      orderItem1.id,
      orderItem1.productId,
      orderItem1.name,
      orderItem1.price,
      orderItem1.quantity
    )

    const order = {
      id: v4(),
      customerId: createCustomer.id,
      items: [createOderItem1]
    }

    const createdOrder = new Order(order.id, order.customerId, order.items)

    await orderRepository.create(createdOrder)

    const getCreatedOrder = await OrderSequelizeModel.findOne({
      where: {
        id: createdOrder.id
      },
      include: ['items']
    })

    expect(getCreatedOrder.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer1.id,
      total: createdOrder.total(),
      items: [
        {
          id: orderItem1.id,
          order_id: order.id,
          product_id: product1.id,
          name: orderItem1.name,
          price: orderItem1.price,
          quantity: orderItem1.quantity
        }
      ]
    })

    const orderItem2 = {
      id: v4(),
      productId: createProduct.id,
      name: createProduct.name,
      price: createProduct.price,
      quantity: 2
    }

    const createOderItem2 = new OrderItem(
      orderItem2.id,
      orderItem2.productId,
      orderItem2.name,
      orderItem2.price,
      orderItem2.quantity
    )

    createdOrder.addItem(createOderItem2)

    await orderRepository.update(createdOrder)

    const getUpdatedOrder = await OrderSequelizeModel.findOne({
      where: {
        id: order.id
      },
      include: ['items']
    })

    expect(getUpdatedOrder.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer1.id,
      total: createdOrder.total(),
      items: [
        {
          id: orderItem1.id,
          order_id: order.id,
          product_id: product1.id,
          name: orderItem1.name,
          price: orderItem1.price,
          quantity: orderItem1.quantity
        },
        {
          id: orderItem2.id,
          order_id: order.id,
          product_id: product1.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity
        }
      ]
    })
  })

  it('should be able to find a order', async () => {
    const orderRepository = new OrderRepository()
    const customerRepository = new CustomerRepository()
    const productRepository = new ProductRepository()

    const customer1 = {
      id: v4(),
      name: 'Customer 1'
    }

    const createCustomer = new Customer(customer1.id, customer1.name)

    const customer1Address = {
      street: 'Street 1',
      number: 1,
      city: 'City',
      zip: '00000-000'
    }

    const address = new Address(
      customer1Address.street,
      customer1Address.number,
      customer1Address.city,
      customer1Address.zip
    )

    createCustomer.changeAddress(address)

    await customerRepository.create(createCustomer)

    const product1 = {
      id: v4(),
      name: 'Product 1',
      price: 10
    }

    const createProduct = new Product(
      product1.id,
      product1.name,
      product1.price
    )

    await productRepository.create(createProduct)

    const orderItem = {
      id: v4(),
      productId: createProduct.id,
      name: createProduct.name,
      price: createProduct.price,
      quantity: 2
    }

    const createOderItem = new OrderItem(
      orderItem.id,
      orderItem.productId,
      orderItem.name,
      orderItem.price,
      orderItem.quantity
    )

    const order = {
      id: v4(),
      customerId: createCustomer.id,
      items: [createOderItem]
    }

    const createdOrder = new Order(order.id, order.customerId, order.items)

    await orderRepository.create(createdOrder)

    const getCreatedOrder = await OrderSequelizeModel.findOne({
      where: {
        id: createdOrder.id
      },
      include: ['items']
    })

    expect(getCreatedOrder.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer1.id,
      total: createdOrder.total(),
      items: [
        {
          id: orderItem.id,
          order_id: order.id,
          product_id: product1.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity
        }
      ]
    })

    const getCreatedOrderFromRepository = await orderRepository.find(order.id)

    expect(createdOrder).toStrictEqual(getCreatedOrderFromRepository)
  })

  it('should throw an error when customer is not found by id', async () => {
    const orderRepository = new OrderRepository()

    expect(async () => {
      await orderRepository.find('XPTO')
    }).rejects.toThrow('Order not found.')
  })

  it('should be able to find all customers', async () => {
    const orderRepository = new OrderRepository()
    const customerRepository = new CustomerRepository()
    const productRepository = new ProductRepository()

    const customer1 = {
      id: v4(),
      name: 'Customer 1'
    }

    const createCustomer = new Customer(customer1.id, customer1.name)

    const customer1Address = {
      street: 'Street 1',
      number: 1,
      city: 'City',
      zip: '00000-000'
    }

    const address = new Address(
      customer1Address.street,
      customer1Address.number,
      customer1Address.city,
      customer1Address.zip
    )

    createCustomer.changeAddress(address)

    await customerRepository.create(createCustomer)

    const product1 = {
      id: v4(),
      name: 'Product 1',
      price: 10
    }

    const createProduct = new Product(
      product1.id,
      product1.name,
      product1.price
    )

    await productRepository.create(createProduct)

    const orderItem1 = {
      id: v4(),
      productId: createProduct.id,
      name: createProduct.name,
      price: createProduct.price,
      quantity: 2
    }

    const createOderItem1 = new OrderItem(
      orderItem1.id,
      orderItem1.productId,
      orderItem1.name,
      orderItem1.price,
      orderItem1.quantity
    )

    const order1 = {
      id: v4(),
      customerId: createCustomer.id,
      items: [createOderItem1]
    }

    const createdOrder1 = new Order(order1.id, order1.customerId, order1.items)

    const orderItem2 = {
      id: v4(),
      productId: createProduct.id,
      name: createProduct.name,
      price: createProduct.price,
      quantity: 2
    }

    const createOderItem2 = new OrderItem(
      orderItem2.id,
      orderItem2.productId,
      orderItem2.name,
      orderItem2.price,
      orderItem2.quantity
    )

    const order2 = {
      id: v4(),
      customerId: createCustomer.id,
      items: [createOderItem2]
    }

    const createdOrder2 = new Order(order2.id, order2.customerId, order2.items)

    await orderRepository.create(createdOrder1)
    await orderRepository.create(createdOrder2)

    const findOrdersFromRepository = await orderRepository.findAll()

    expect(findOrdersFromRepository).toHaveLength(2)
    expect(findOrdersFromRepository).toContainEqual(createdOrder1)
    expect(findOrdersFromRepository).toContainEqual(createdOrder2)
  })
})
