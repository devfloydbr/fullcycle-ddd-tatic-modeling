import { Product } from '../entities/product/entity/product.entity'

export class ProductService {
  static increasePrice(products: Product[], percentage: number) {
    products.forEach(product =>
      product.changePrice((product.price * percentage) / 100 + product.price)
    )

    return products
  }
}
