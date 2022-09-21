import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript'

import { OrderSequelizeModel } from './order.model'
import { ProductSequelizeModel } from './product.model'

@Table({
  tableName: 'order_items',
  timestamps: false
})
export class OrderItemSequelizeModel extends Model {
  @PrimaryKey
  @Column
  declare id: string

  @ForeignKey(() => ProductSequelizeModel)
  @Column({ allowNull: false })
  declare product_id: string

  @BelongsTo(() => ProductSequelizeModel)
  declare product: ProductSequelizeModel

  @ForeignKey(() => OrderSequelizeModel)
  @Column({ allowNull: false })
  declare order_id: string

  @BelongsTo(() => OrderSequelizeModel)
  declare order: OrderSequelizeModel

  @Column({
    allowNull: false
  })
  declare quantity: number

  @Column({
    allowNull: false
  })
  declare name: string

  @Column({
    allowNull: false
  })
  declare price: number
}
