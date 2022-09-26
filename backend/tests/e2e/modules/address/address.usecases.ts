import * as request from 'supertest'
import { server } from '../../../__resources__/config/test-server'

const endpoint = '/address/cep/'

export const getAddress = async (cep: string) => { 
  return await request(server).get(endpoint + cep)
}