/* eslint-disable @typescript-eslint/no-empty-function */

import { HttpClient } from '@infrastructure/adapters/axios-adapter'
import { ConsoleLogger } from '@nestjs/common'
import { Address, AddressParams } from '../domain/entities/address'
import { IAddressRepository } from '../domain/interfaces/address-repository'
import { AddressService } from '../services/address.service'
import { makeAddressData, makeAddressRepositoryMock } from './address.test-data'

jest.mock('uuid')

let sut: AddressService
let address: Address
let addressData: AddressParams
let addressRepositoryMock: IAddressRepository
let httpClientMock: HttpClient
const loggerMock = new ConsoleLogger()
let cep: string

const setupTest = () => {
  addressData = makeAddressData()
  address = new Address(addressData)
  cep = address.cep
  addressRepositoryMock = makeAddressRepositoryMock()
  sut = new AddressService(addressRepositoryMock, loggerMock, httpClientMock)
}

describe(`Address Service`, () => {
  beforeEach(() => {
    setupTest()
  })

  describe(`searchByCep`, () => {
    const execSut = () => sut.searchByCep(cep)
  }) //End searchByCep

  describe(`getAddressFromApi`, () => {
    const execSut = () => (sut as any).getAddressFromApi(cep)
  }) //End getAddressFromApi
})
