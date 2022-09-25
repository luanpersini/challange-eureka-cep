export const makeAddressData = (params?: any) => ({
  cep: params?.cep || '01001-000',
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
  request: jest.fn()
})
