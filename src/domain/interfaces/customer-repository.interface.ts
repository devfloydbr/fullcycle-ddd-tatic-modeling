import { Customer } from '../entities/costumer/entity/costumer.entity'
import { IRepositoryInterface } from './repository.interface'

export interface ICostumerRepositoryInterface
  extends IRepositoryInterface<Customer> {}
