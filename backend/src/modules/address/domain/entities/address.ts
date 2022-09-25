
export type AddressParams = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

export class Address {

  readonly cep: string
  readonly logradouro: string
  readonly complemento: string
  readonly bairro: string
  readonly localidade: string
  readonly uf: string
  readonly ibge: string
  readonly gia: string
  readonly ddd: string
  readonly siafi: string

  constructor(address: AddressParams) {
    this.cep = address.cep
    this.logradouro = address.logradouro
    this.complemento = address.complemento
    this.bairro = address.bairro
    this.localidade = address.localidade
    this.uf = address.uf
    this.ibge = address.ibge
    this.gia = address.gia
    this.ddd = address.ddd
    this.siafi = address.siafi
  }    
}