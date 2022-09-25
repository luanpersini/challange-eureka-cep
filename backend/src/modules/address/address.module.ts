import { HttpClient } from '@infrastructure/adapters/axios-adapter'
import { InfrastructureModule } from '@infrastructure/infrastructure.module'
import { Module } from '@nestjs/common'
import { PresentationModule } from '@presentation/presentation.module'
import { AddressController } from './api/address.controller'
import { AddressRepository } from './infra/address.repository'
import { AddressService } from './services/address.service'

@Module({
  imports: [PresentationModule, InfrastructureModule],
  controllers: [AddressController],
  providers: [
    {
      provide: 'IHttpClient',
      useClass: HttpClient
    },
    {
      provide: 'IAddressRepository',
      useClass: AddressRepository
    },
    {
      provide: 'IAddressService',
      useClass: AddressService
    }
  ],
  exports: []
})
export class AddressModule {}
