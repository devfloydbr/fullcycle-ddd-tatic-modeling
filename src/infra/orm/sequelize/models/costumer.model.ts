import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { OrderSequelizeModel } from './order.model'

@Table({
  tableName: 'costumers',
  timestamps: false
})
export class CustomerSequelizeModel extends Model {
  @PrimaryKey
  @Column
  declare id: string

  @Column({
    allowNull: false
  })
  declare name: string

  @Column({
    allowNull: false
  })
  declare active: boolean

  @Column({
    allowNull: false
  })
  declare rewardPoints: number

  @Column({
    allowNull: false
  })
  declare street: string

  @Column({
    allowNull: false
  })
  declare number: number

  @Column({
    allowNull: false
  })
  declare city: string

  @Column({
    allowNull: false
  })
  declare zip: string
}
