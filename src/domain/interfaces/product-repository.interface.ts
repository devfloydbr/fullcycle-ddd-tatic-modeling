import { Product } from '../entities/product/entity/product.entity'
import { IRepositoryInterface } from './repository.interface'

export interface IProductRepositoryInterface
  extends IRepositoryInterface<Product> {}
