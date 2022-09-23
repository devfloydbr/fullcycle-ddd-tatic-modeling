export class Address {
  private _street: string
  private _number: number
  private _city: string
  private _zip: string

  constructor(street: string, number: number, city: string, zip: string) {
    this._street = street
    this._number = number
    this._city = city
    this._zip = zip
  }

  get street(): string {
    return this._street
  }

  get number(): number {
    return this._number
  }

  get city(): string {
    return this._city
  }

  get zip(): string {
    return this._zip
  }

  getAddressPtBR() {
    return `${this._street}, ${this._number}, ${this._city} - ${this._zip}`
  }
}
