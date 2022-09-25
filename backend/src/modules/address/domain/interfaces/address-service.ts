import { Address } from '../entities/address'

export interface IAddressService { 
  searchByCep(cep: string): Promise<Address>
}
