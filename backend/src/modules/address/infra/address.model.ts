import { DataTypes } from 'sequelize'
import { AllowNull, Column, Length, Model, Table } from 'sequelize-typescript'


@Table({
  tableName: 'Address',
  freezeTableName: true
})
export class AddressModel extends Model {

  @Length({ min: 9, max: 9 })
  @Column({
    primaryKey: true,   
    autoIncrement: false,
    unique: true
  })
  cep: string

  @Length({ min: 2, max: 150 })
  @AllowNull(false)
  @Column
  logradouro: string
  
  @Column({
    type: DataTypes.TEXT,
    allowNull: false
  })
  complemento: string

  @Column({
    type: DataTypes.TEXT,
    allowNull: false
  })
  bairro: string

  @Column({
    type: DataTypes.TEXT,
    allowNull: false
  })
  localidade: string

  @Column({
    type: DataTypes.TEXT,
    allowNull: false
  })
  uf: string

  @Column({
    type: DataTypes.TEXT,
    allowNull: false
  })
  ibge: string

  @Column({
    type: DataTypes.TEXT,
    allowNull: false
  })
  gia: string

  @Column({
    type: DataTypes.TEXT,
    allowNull: false
  })
  ddd: string

  @Column({
    type: DataTypes.TEXT,
    allowNull: false
  })
  siafi: string
}