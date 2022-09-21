import { v4 } from 'uuid'
import { Sequelize } from 'sequelize-typescript'

import { ProductRepository } from './product.repository'
import { ProductSequelizeModel } from '../../orm/sequelize/models/product.model'
import { Product } from '../../../domain/entities/product/entity/product.entity'

describe('Product repository unit test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ProductSequelizeModel])

    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should be able to create a product', async () => {
    const product1 = {
      id: v4(),
      name: 'Product 1',
      price: 10
    }

    const productRepository = new ProductRepository()

    const createProduct = new Product(
      product1.id,
      product1.name,
      product1.price
    )

    await productRepository.create(createProduct)

    const getCreatedProduct = await ProductSequelizeModel.findOne({
      where: {
        id: product1.id
      }
    })

    expect(getCreatedProduct?.toJSON()).toStrictEqual({
      id: product1.id,
      name: product1.name,
      price: product1.price
    })
  })

  it('should be able to update a product', async () => {
    const product1 = {
      id: v4(),
      name: 'Product 1',
      price: 10
    }

    const productRepository = new ProductRepository()

    const createProduct = new Product(
      product1.id,
      product1.name,
      product1.price
    )

    await productRepository.create(createProduct)

    const getCreatedProduct = await ProductSequelizeModel.findOne({
      where: {
        id: product1.id
      }
    })

    expect(getCreatedProduct?.toJSON()).toStrictEqual({
      id: product1.id,
      name: product1.name,
      price: product1.price
    })

    createProduct.changeName('Product 2')
    createProduct.changePrice(20)

    await productRepository.update(createProduct)

    const getUpdatedProduct = await ProductSequelizeModel.findOne({
      where: {
        id: product1.id
      }
    })

    expect(getUpdatedProduct?.toJSON()).toStrictEqual({
      id: product1.id,
      name: 'Product 2',
      price: 20
    })
  })

  it('should be able to find a product', async () => {
    const product1 = {
      id: v4(),
      name: 'Product 1',
      price: 10
    }

    const productRepository = new ProductRepository()

    const createProduct = new Product(
      product1.id,
      product1.name,
      product1.price
    )

    await productRepository.create(createProduct)

    const getCreatedProduct = await ProductSequelizeModel.findOne({
      where: {
        id: product1.id
      }
    })

    const getCreatedProductFromRepository = await productRepository.find(
      product1.id
    )

    expect(getCreatedProduct?.toJSON()).toStrictEqual({
      id: getCreatedProductFromRepository.id,
      name: getCreatedProductFromRepository.name,
      price: getCreatedProductFromRepository.price
    })
  })

  it('should be able to find all products', async () => {
    const product1 = {
      id: v4(),
      name: 'Product 1',
      price: 10
    }

    const product2 = {
      id: v4(),
      name: 'Product 2',
      price: 30
    }

    const productRepository = new ProductRepository()

    const createProduct1 = new Product(
      product1.id,
      product1.name,
      product1.price
    )

    await productRepository.create(createProduct1)

    const createProduct2 = new Product(
      product2.id,
      product2.name,
      product2.price
    )

    await productRepository.create(createProduct2)

    const findProductsFromRepository = await productRepository.findAll()

    expect(findProductsFromRepository).toHaveLength(2)
    expect(findProductsFromRepository).toContainEqual(createProduct1)
    expect(findProductsFromRepository).toContainEqual(createProduct2)
  })
})
