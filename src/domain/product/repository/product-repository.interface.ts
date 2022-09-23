import { IRepository } from '../../@shared/repository/repository.interface'
import { Product } from '../entity/product.entity'

export interface IProductRepository extends IRepository<Product> {}
