import { Order } from '../entity/order.entity'
import { IRepository } from '../../../@shared/repository/repository.interface'

export interface IOrderRepository extends IRepository<Order> {}
