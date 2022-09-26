import { BadRequestException, ConsoleLogger } from '@nestjs/common'
import { errorMessages } from '@presentation/errors/error-messages'
import { formatCep } from 'src/utils/format-cep'
import { Address, AddressParams } from '../domain/entities/address'
import { IAddressRepository } from '../domain/interfaces/address-repository'
import { AddressService } from '../services/address.service'
import { makeAddressData, makeAddressRepositoryMock, makeHttpClientMock, makeRequestOptions } from './address.test-data'

jest.mock('uuid')

let sut: AddressService
let address: Address
let addressData: AddressParams
let addressRepositoryMock: IAddressRepository
let httpClientMock: any
const loggerMock = new ConsoleLogger()
let cep: string

const setupTest = () => {
  addressData = makeAddressData()
  address = new Address(addressData)
  cep = address.cep
  addressRepositoryMock = makeAddressRepositoryMock()
  httpClientMock = makeHttpClientMock()
  sut = new AddressService(addressRepositoryMock, loggerMock, httpClientMock)
}

describe(`Address Service`, () => {
  beforeEach(() => {
    setupTest()
  })

  describe(`searchByCep`, () => {
    const execSut = () => sut.searchByCep(cep)

    test('should call address addressRepository with correct params', async () => {
      await execSut()

      expect(addressRepositoryMock.getAddressByCep).toHaveBeenCalledWith(formatCep(cep))
    })

    test('should return an address from the Database if it was found', async () => {
      jest.spyOn(addressRepositoryMock, 'getAddressByCep').mockResolvedValueOnce(address)
      const result = await execSut()

      expect(result).toBe(address)
    })

    test('should call getAddressFromApi if cep was not found in the Database', async () => {
      jest.spyOn(addressRepositoryMock, 'getAddressByCep').mockResolvedValueOnce(undefined)
      jest.spyOn(sut as any, 'getAddressFromApi').mockResolvedValueOnce(addressData)

      await execSut()

      expect((sut as any).getAddressFromApi).toHaveBeenCalledWith(cep)
    })

    test('should call addressRepository.saveAddress when its found consulting the addressAPI', async () => {
      jest.spyOn(addressRepositoryMock, 'getAddressByCep').mockResolvedValueOnce(undefined)
      jest.spyOn(sut as any, 'getAddressFromApi').mockResolvedValueOnce(addressData)

      await execSut()

      expect(addressRepositoryMock.saveAddress).toHaveBeenCalledWith(address)
    })

    test('should return an address from the Api if it was found', async () => {
      jest.spyOn(addressRepositoryMock, 'getAddressByCep').mockResolvedValueOnce(undefined)
      jest.spyOn(sut as any, 'getAddressFromApi').mockResolvedValueOnce(addressData)

      const result = await execSut()

      expect(result).toEqual(address)
    })

    test('should throw Error if no Address with the given (cep) was found', async () => {
      jest.spyOn(addressRepositoryMock, 'getAddressByCep').mockResolvedValueOnce(undefined)
      jest.spyOn(sut as any, 'getAddressFromApi').mockResolvedValueOnce(undefined)

      await expect(execSut()).rejects.toThrowError(new BadRequestException(errorMessages.cepNotFound))
    })
  }) //End searchByCep

  describe(`getAddressFromApi`, () => {
    const execSut = () => (sut as any).getAddressFromApi(cep)

    test('should call HttpClient.request with correct params', async () => {
      await execSut()

      expect(httpClientMock.request).toHaveBeenCalledWith(makeRequestOptions({ cep }))
    })

    test('should return null if an error occurs when calling the external address API', async () => {
      jest.spyOn(httpClientMock, 'request').mockImplementationOnce(() => Promise.resolve({ data: { erro: true }, status: 200 }))

      const result = await execSut()

      expect(result).toBeNull()
    })

    test('should return an Address on success', async () => {
      const result = await execSut()

      expect(result).toEqual(addressData)
    })

  }) //End getAddressFromApi
})
