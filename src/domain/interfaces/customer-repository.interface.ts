import { Customer } from '../entities/costumer/entity/costumer.entity'
import { IRepository } from './repository.interface'

export interface ICostumerRepository extends IRepository<Customer> {}
