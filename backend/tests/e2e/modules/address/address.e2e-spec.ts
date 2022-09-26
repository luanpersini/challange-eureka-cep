import { AddressParams } from '@modules/address/domain/entities/address'
import { makeAddressData } from '@modules/address/__tests__/address.test-data'
import { errorMessages } from '@presentation/errors/error-messages'
import { app, initServer } from '@tests/__resources__/config/test-server'
import {
  getAddress
} from './address.usecases'

jest.setTimeout(30000)

let requestData: any
let address: AddressParams
let cep: string

describe('Address End-To-End Tests', () => {
  beforeEach(async () => {
    await initServer()
    address = makeAddressData()
    cep = address.cep
  })
  afterEach(async () => {
    await app.close()
  })

  describe('Business Rules', () => {
    describe('GET /cep', () => {
      test('should return **OK** with an Address on success', async () => {
        const { status, body } = await getAddress(cep)
        address.cep = '01001-000'
        expect(status).toBe(200)
        expect(body).toEqual(address)
      })

      test('should return **BadRequest** if an address with the given (cep) was not found.', async () => {
        cep = '22220999'
        const { status, body } = await getAddress(cep)

        expect(body.message).toBe(errorMessages.cepNotFound)
        expect(status).toBe(400)
      })
    }) // End GET /cep    
  })// End Business Rules

  describe('Dto Validation', () => {
    //Validate the Dto Properties    
    test('should return **BadRequest** if cep (length) is not 8', async () => {
      const { status, body } = await getAddress(cep+'21')

      expect(body.message).toBe(errorMessages.cepNotFound)
      expect(status).toBe(400)
    })     

    test('should return **BadRequest** if cep is not an number string', async () => {
      cep = 'lalalele'
      const { status, body } = await getAddress(cep)

      expect(body.message).toBe('cep must be a number string')
      expect(status).toBe(400)
    })  

    test('should return **NotFound** if cep is empty', async () => {
      cep = ''
      const { status, body } = await getAddress(cep)
      
      expect(status).toBe(404)
    }) 
  }) // End Dto validation

})
