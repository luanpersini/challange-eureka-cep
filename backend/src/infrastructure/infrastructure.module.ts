import { Module } from '@nestjs/common'
import { HttpClient } from './adapters/axios-adapter'

const httpClient = {
  provide: 'IhttpClient',
  useClass: HttpClient
}

@Module({
  imports: [],
  controllers: [],
  providers: [httpClient],
  exports: [httpClient]
})
export class InfrastructureModule {}
