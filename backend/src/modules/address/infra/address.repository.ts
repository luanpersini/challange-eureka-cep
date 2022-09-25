import { Injectable } from '@nestjs/common'
import { Address, AddressParams } from '../domain/entities/address'
import { IAddressRepository } from '../domain/interfaces/address-repository'
import { AddressModel } from './address.model'

@Injectable()
export class AddressRepository implements IAddressRepository {
  public async saveAddress(address: AddressParams): Promise<void> {
    await AddressModel.create({ ...address })
  }

  public async getAddressByCep(cep: string): Promise<Address> {        
    const result = await AddressModel.findOne({ where: { cep } })   
    if (!result) {
      return null
    }
    return new Address(result)
  }
}
