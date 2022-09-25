import { AddressModel } from '@modules/address/infra/address.model'
import { Sequelize } from 'sequelize-typescript'

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize('sqlite::memory:')
      sequelize.addModels([AddressModel])
      await sequelize.sync()
      return sequelize
    }
  }
]
