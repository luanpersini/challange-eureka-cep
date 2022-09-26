import { AddressModel } from '@modules/address/infra/address.model'

export const clearAllDatabases = async () => {  
    await AddressModel.destroy({
      where: {},
      truncate: true,
      cascade: true  
  })
}

