import { OrderItem } from '../order_item.aggregate'

export class Order {
  private _id: string
  private _customerId: string
  private _items: OrderItem[]
  private _total: number

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id
    this._customerId = customerId
    this._items = items
    this._total = this.total()
    this.validate()
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error('ID is required.')
    }

    if (this._customerId.length === 0) {
      throw new Error('Customer ID is required.')
    }

    if (this._items.length === 0) {
      throw new Error('Items length must be greater than zero.')
    }

    if (this._items.some(item => item.quantity <= 0)) {
      throw new Error('Quantity must be greater than zero.')
    }
  }

  total() {
    return this._items.reduce((acc, item) => acc + item.price, 0)
  }
}
