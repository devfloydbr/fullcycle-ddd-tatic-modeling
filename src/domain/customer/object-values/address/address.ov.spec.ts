import { Address } from './address.ov'

describe('Address Object Value unit tests', () => {
  it('should be able to return address in pt-BR', () => {
    const address = new Address('Street 1', 1, 'City', '00000-000')

    expect(address.getAddressPtBR()).toBe('Street 1, 1, City - 00000-000')
  })
})
