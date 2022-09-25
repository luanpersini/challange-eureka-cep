import { Address, AddressParams } from '../entities/address'

export interface IAddressRepository {
  saveAddress(address: AddressParams): Promise<void>
  getAddressByCep(cep: string): Promise<Address>  
}
