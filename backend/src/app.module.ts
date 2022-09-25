import { DatabaseModule } from '@infrastructure/database/database.module'
import { InfrastructureModule } from '@infrastructure/infrastructure.module'
import { AddressModule } from '@modules/address/address.module'
import { Module } from '@nestjs/common'
import { PresentationModule } from '@presentation/presentation.module'

@Module({
  imports: [AddressModule, DatabaseModule, PresentationModule, InfrastructureModule],
  controllers: [],
  providers: []
})
export class AppModule {}
