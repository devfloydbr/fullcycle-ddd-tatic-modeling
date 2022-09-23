import { IRepository } from '../../@shared/repository/repository.interface'
import { Customer } from '../entity/costumer.entity'

export interface ICostumerRepository extends IRepository<Customer> {}
