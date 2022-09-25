import { IHttpClient } from '@infrastructure/adapters/axios-adapter'
import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { ConsoleLogger } from '@nestjs/common/services'
import { errorMessages } from '@presentation/errors/error-messages'
import { formatCep } from 'src/utils/format-cep'
import { Address, AddressParams } from '../domain/entities/address'
import { IAddressRepository } from '../domain/interfaces/address-repository'
import { IAddressService } from '../domain/interfaces/address-service'

@Injectable()
export class AddressService implements IAddressService {
  constructor(
    @Inject('IAddressRepository')
    private readonly addressRepository: IAddressRepository,
    @Inject('ConsoleLogger')
    private readonly logger: ConsoleLogger,
    @Inject('IHttpClient')
    private readonly httpClient: IHttpClient
  ) {}

  public async searchByCep(cep: string): Promise<Address> {
    this.logger.log(`Search by CEP: Starting process to return Address with [Cep: ${cep}].`)

    const cepFromDb = await this.addressRepository.getAddressByCep(formatCep(cep))

    if (cepFromDb) {
      this.logger.log(`Search by CEP: Address with [Cep: ${cep}] was found in the database.`)
      return cepFromDb
    }

    let cepFromApi = await this.getAddressFromApi(cep)
    if (cepFromApi) {
      this.logger.log(`Search by CEP: Address with [Cep: ${cep}] was found in the API.`)
      cepFromApi = new Address(cepFromApi)
      await this.addressRepository.saveAddress(cepFromApi)
      return cepFromApi
    }

    throw new BadRequestException(errorMessages.cepNotFound)
  }

  private async getAddressFromApi(cep: string): Promise<AddressParams> {
    const options = {
      url: `https://viacep.com.br/ws/${cep}/json/`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const result = await this.httpClient.request(options)      
      if (result.data.erro || result.status === 400) {
        return null
      }

      return result.data
    } catch (error) {
      //Todo - implement a log service/error monitor to track and notify failures
      this.logger.error(`Search by CEP: Error when trying to reach the addressApi with [Cep: ${cep}].`)
    }
  }
}
