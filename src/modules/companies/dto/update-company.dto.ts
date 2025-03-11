import { CreateCompanyRequest } from '@interfaces'
import { IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator'
export class UpdateCompanyDto implements CreateCompanyRequest {
  @IsOptional()
  @IsString({ message: 'должен иметь тип string!' })
  @Min(3, { message: 'Минимальная длина должна быть 3!' })
  @Max(15, { message: 'Максималная длина должна быть 15!' })
  name: string
}
