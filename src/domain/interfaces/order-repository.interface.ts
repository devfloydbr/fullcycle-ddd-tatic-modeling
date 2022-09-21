import { Order } from '../entities/order/entity/order.entity'
import { IRepositoryInterface } from './repository.interface'

export interface IOrderRepositoryInterface
  extends IRepositoryInterface<Order> {}
