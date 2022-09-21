import { Product } from '../entities/product/entity/product.entity'
import { ProductService } from './product.service'

describe('Product service unit tests', () => {
  it('should change price of all products', () => {
    const product1 = new Product('1', 'Product 1', 5)
    const product2 = new Product('2', 'Product 2', 20)

    const products = [product1, product2]

    ProductService.increasePrice(products, 100)

    expect(product1.price).toBe(10)
    expect(product2.price).toBe(40)
  })
})
