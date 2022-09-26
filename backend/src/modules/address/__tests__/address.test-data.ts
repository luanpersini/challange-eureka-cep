export const makeAddressData = (params?: any) => ({
  cep: params?.cep || '01001000',
  logradouro: 'Praça da Sé',
  complemento: 'lado ímpar',
  bairro: 'Sé',
  localidade: 'São Paulo',
  uf: 'SP',
  ibge: '3550308',
  gia: '1004',
  ddd: '11',
  siafi: '7107'
})

export const makeAddressRepositoryMock = () => ({
  saveAddress: jest.fn(),
  getAddressByCep: jest.fn(() => Promise.resolve(makeAddressData()))
})

export const makeHttpClientMock = () => ({
  request: jest.fn(()=> Promise.resolve({data: makeAddressData(), status: 200}))
})

export const makeRequestOptions = (params?: any) => ({
  url: `https://viacep.com.br/ws/${params.cep}/json/`,
  method: 'get',
  headers: {
    'Content-Type': 'application/json'
  }
})