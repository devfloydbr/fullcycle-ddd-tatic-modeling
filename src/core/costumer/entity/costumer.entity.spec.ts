import { Address } from '../../address/address.ov'
import { Customer } from './costumer.entity'

describe('Costumer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Customer('', 'John')
    }).toThrowError('ID is required.')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      new Customer('1', '')
    }).toThrowError('Name is required.')
  })

  it('should change name', () => {
    //ARRANGE
    const customer = new Customer('1', 'John')

    //ACT
    customer.changeName('Mary')

    //ASSERT
    expect(customer.name).toBe('Mary')
  })

  it('should activate customer', () => {
    const customer = new Customer('1', 'John')
    const address = new Address('Street 1', 1, 'City', '00000-000')
    customer.address = address

    customer.activate()

    expect(customer.isActive()).toBe(true)
  })

  it('should throw error when adrress id undefined when activate a customer', () => {
    expect(() => {
      const customer = new Customer('1', 'John')
      customer.activate()
    }).toThrowError('Address is mandatory to activate a customer.')
  })

  it('should deactivate customer', () => {
    const customer = new Customer('1', 'John')
    customer.deactivate()

    expect(customer.isActive()).toBe(false)
  })
})
