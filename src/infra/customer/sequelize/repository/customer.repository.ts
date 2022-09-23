import { Customer } from '../../../../domain/customer/entity/costumer.entity'
import { Address } from '../../../../domain/customer/object-values/address/address.ov'
import { ICostumerRepository } from '../../../../domain/customer/repository/customer-repository.interface'
import { CustomerSequelizeModel } from '../model/costumer.model'

export class CustomerRepository implements ICostumerRepository {
  async create(entity: Customer) {
    await CustomerSequelizeModel.create({
      id: entity.id,
      name: entity.name,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
      street: entity.address.street,
      number: entity.address.number,
      city: entity.address.city,
      zip: entity.address.zip
    })
  }

  async update(entity: Customer) {
    await CustomerSequelizeModel.update(
      {
        id: entity.id,
        name: entity.name,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
        street: entity.address.street,
        number: entity.address.number,
        city: entity.address.city,
        zip: entity.address.zip
      },
      {
        where: {
          id: entity.id
        }
      }
    )
  }

  async find(id: string) {
    let customerModel = {} as CustomerSequelizeModel

    try {
      customerModel = await CustomerSequelizeModel.findOne({
        where: {
          id
        },
        rejectOnEmpty: true
      })
    } catch {
      throw new Error('Customer not found.')
    }

    const customer = new Customer(id, customerModel.name)

    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.city,
      customerModel.zip
    )

    customer.changeAddress(address)

    return customer
  }

  async findAll() {
    const customerModels = await CustomerSequelizeModel.findAll()

    const customers = customerModels.map(customer => {
      let generateCustomer = new Customer(customer.id, customer.name)
      generateCustomer.addRewardPoints(customer.rewardPoints)

      const generateAddress = new Address(
        customer.street,
        customer.number,
        customer.city,
        customer.zip
      )

      generateCustomer.changeAddress(generateAddress)

      if (customer.active) {
        generateCustomer.activate()
      }

      return generateCustomer
    })

    return customers
  }
}
