import { UpdateCompanyRequest } from '@interfaces'
import { IsOptional, IsString } from 'class-validator'

export class UpdateCompanyDto implements UpdateCompanyRequest {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  login?: string

  @IsOptional()
  @IsString()
  password?: string
}
