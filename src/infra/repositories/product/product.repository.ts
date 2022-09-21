import { Product } from '../../../domain/entities/product/entity/product.entity'
import { IProductRepositoryInterface } from '../../../domain/interfaces/product-repository.interface'
import { ProductSequelizeModel } from '../../orm/sequelize/models/product.model'

export class ProductRepository implements IProductRepositoryInterface {
  async create(entity: Product) {
    await ProductSequelizeModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price
    })
  }

  async update(entity: Product) {
    await ProductSequelizeModel.update(
      {
        name: entity.name,
        price: entity.price
      },
      {
        where: {
          id: entity.id
        }
      }
    )
  }

  async find(id: string) {
    const product = await ProductSequelizeModel.findOne({
      where: {
        id
      }
    })

    return new Product(product.id, product.name, product.price)
  }

  async findAll() {
    const products = await ProductSequelizeModel.findAll()

    return products.map(
      product => new Product(product.id, product.name, product.price)
    )
  }
}
