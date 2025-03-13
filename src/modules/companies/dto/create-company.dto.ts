import { CreateCompanyRequest } from '@interfaces'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCompanyDto implements CreateCompanyRequest {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  login: string

  @IsNotEmpty()
  @IsString()
  password: string
}
