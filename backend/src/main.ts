import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'
import { HttpExceptionFilter } from 'src/presentation/filters/httpException.filter'
import { AppModule } from './app.module'

//using a fixed value instead of .env to ease the correction process
const port = 3003

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true})
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )
  app.useGlobalFilters(new HttpExceptionFilter())
  app.use(helmet())

  const options = new DocumentBuilder()
    .setTitle('address-api')
    .setDescription('Address Search')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)

  await app.listen(port)
}

bootstrap().then(() => {
  console.log(`server running at port ${port}`)
})
