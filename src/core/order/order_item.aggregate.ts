export class OrderItem {
  private _id: string
  private _productId: string
  private _name: string
  private _price: number
  private _quantity: number

  constructor(
    id: string,
    productId: string,
    name: string,
    price: number,
    quantity: number
  ) {
    this._id = id
    this._name = name
    this._price = price
    this._productId = productId
    this._quantity = quantity
  }

  get price() {
    return this._price * this._quantity
  }

  get quantity() {
    return this._quantity
  }
}
