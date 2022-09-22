import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript'
import { CustomerSequelizeModel } from './costumer.model'
import { OrderItemSequelizeModel } from './order-item.model'

@Table({
  tableName: 'orders',
  timestamps: false
})
export class OrderSequelizeModel extends Model {
  @PrimaryKey
  @Column
  declare id: string

  @ForeignKey(() => CustomerSequelizeModel)
  @Column
  declare customer_id: string

  @BelongsTo(() => CustomerSequelizeModel)
  declare customer: CustomerSequelizeModel

  @HasMany(() => OrderItemSequelizeModel)
  declare items: OrderItemSequelizeModel[]

  @Column({
    allowNull: false
  })
  declare total: number
}
