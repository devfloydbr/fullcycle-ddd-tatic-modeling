import { v4 } from 'uuid'
import { Sequelize } from 'sequelize-typescript'

import { CustomerSequelizeModel } from '../../orm/sequelize/models/costumer.model'
import { CustomerRepository } from './customer.repository'
import { Customer } from '../../../domain/entities/costumer/entity/costumer.entity'
import { Address } from '../../../domain/entities/costumer/object-values/address/address.ov'

describe('Product repository unit test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([CustomerSequelizeModel])

    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should be able to create a customer', async () => {
    const customerRepository = new CustomerRepository()

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

    createCustomer.address = address

    await customerRepository.create(createCustomer)

    const getCreatedCustomer = await CustomerSequelizeModel.findOne({
      where: {
        id: customer1.id
      }
    })

    expect(getCreatedCustomer?.toJSON()).toStrictEqual({
      id: createCustomer.id,
      name: createCustomer.name,
      active: createCustomer.active,
      rewardPoints: createCustomer.rewardPoints,
      street: address.street,
      number: address.number,
      city: address.city,
      zip: address.zip
    })
  })

  it('should be able to update a customer', async () => {
    const customerRepository = new CustomerRepository()

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

    createCustomer.address = address

    await customerRepository.create(createCustomer)

    const getCreatedCustomer = await CustomerSequelizeModel.findOne({
      where: {
        id: customer1.id
      }
    })

    expect(getCreatedCustomer?.toJSON()).toStrictEqual({
      id: createCustomer.id,
      name: createCustomer.name,
      active: createCustomer.active,
      rewardPoints: createCustomer.rewardPoints,
      street: address.street,
      number: address.number,
      city: address.city,
      zip: address.zip
    })

    createCustomer.changeName('Product 2')

    await customerRepository.update(createCustomer)

    const getUpdatedCustomer = await CustomerSequelizeModel.findOne({
      where: {
        id: customer1.id
      }
    })

    expect(getUpdatedCustomer?.toJSON()).toStrictEqual({
      id: createCustomer.id,
      name: 'Product 2',
      active: createCustomer.active,
      rewardPoints: createCustomer.rewardPoints,
      street: address.street,
      number: address.number,
      city: address.city,
      zip: address.zip
    })
  })

  it('should be able to find a customer', async () => {
    const customerRepository = new CustomerRepository()

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

    createCustomer.address = address

    await customerRepository.create(createCustomer)

    const getCreatedCustomerFromRepository = await customerRepository.find(
      customer1.id
    )

    expect(createCustomer).toStrictEqual(getCreatedCustomerFromRepository)
  })

  it('should throw an error when customer is not found by id', async () => {
    const customerRepository = new CustomerRepository()

    expect(async () => {
      await customerRepository.find('XPTO')
    }).rejects.toThrow('Customer not found.')
  })

  it('should be able to find all customers', async () => {
    const customerRepository = new CustomerRepository()

    const customer1 = {
      id: v4(),
      name: 'Customer 1'
    }

    const customer1Address = {
      street: 'Street 1',
      number: 1,
      city: 'City',
      zip: '00000-000'
    }

    const customer2 = {
      id: v4(),
      name: 'Customer 2'
    }

    const customer2Address = {
      street: 'Street 2',
      number: 2,
      city: 'City',
      zip: '00000-000'
    }

    const createCustomer1 = new Customer(customer1.id, customer1.name)

    const createCustomer2 = new Customer(customer2.id, customer1.name)

    createCustomer1.address = new Address(
      customer1Address.street,
      customer1Address.number,
      customer1Address.city,
      customer1Address.zip
    )

    createCustomer2.address = new Address(
      customer2Address.street,
      customer2Address.number,
      customer2Address.city,
      customer2Address.zip
    )

    await customerRepository.create(createCustomer1)

    await customerRepository.create(createCustomer2)

    const findCustomersFromRepository = await customerRepository.findAll()

    expect(findCustomersFromRepository).toHaveLength(2)
    expect(findCustomersFromRepository).toContainEqual(createCustomer1)
    expect(findCustomersFromRepository).toContainEqual(createCustomer2)
  })
})
