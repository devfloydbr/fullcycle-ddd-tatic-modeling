import { Product } from '../entities/product/entity/product.entity'
import { IRepository } from './repository.interface'

export interface IProductRepository extends IRepository<Product> {}
