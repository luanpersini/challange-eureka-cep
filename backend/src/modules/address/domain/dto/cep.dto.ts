import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumberString, Length } from 'class-validator'

export class CepDto {
  @ApiProperty({
    required: true,
    example: "22220000",
    description: 'Address cep'  
  })
  @IsNumberString()
  @IsNotEmpty()
  @Length(8)
  cep: string
}