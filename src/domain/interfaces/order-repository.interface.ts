import { Order } from '../entities/order/entity/order.entity'
import { IRepository } from './repository.interface'

export interface IOrderRepository extends IRepository<Order> {}
