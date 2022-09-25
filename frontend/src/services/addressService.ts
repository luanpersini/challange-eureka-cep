import axios, { AxiosResponse } from 'axios'

export const addressService = async (cep: string) => {
  let result: AxiosResponse
  try {
    result = await axios.get('http://localhost:3003/address/cep/' + cep)
  } catch (error: any) {
    result = error.response
  }

  return result
}
