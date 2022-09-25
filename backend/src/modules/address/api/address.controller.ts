import { Controller, Get, Inject, Param } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CepDto } from '../domain/dto/cep.dto'
import { Address } from '../domain/entities/address'
import { IAddressService } from '../domain/interfaces/address-service'

@ApiTags('address')
@Controller('address')
export class AddressController {
  constructor(
    @Inject('IAddressService')
    private readonly addressService: IAddressService
  ) {}

  @ApiOperation({ summary: 'Return the address of the given cep code.' })
  @Get('cep/:cep')
  async getAddressByCep(@Param() { cep }: CepDto): Promise<Address> {    
    return await this.addressService.searchByCep(cep.toString())
  }
}
