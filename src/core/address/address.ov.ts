export class Address {
  street: string
  number: number
  city: string
  zip: string

  constructor(street: string, number: number, city: string, zip: string) {
    this.street = street
    this.number = number
    this.city = city
    this.zip = zip
  }
}
