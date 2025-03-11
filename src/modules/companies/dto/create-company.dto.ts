import { CreateCompanyRequest } from '@interfaces'
import { IsNotEmpty, IsString, Max, Min } from 'class-validator'
export class CreateCompanyDto implements CreateCompanyRequest {
  @IsNotEmpty({ message: 'имя не должно быть пустым!' })
  @IsString({ message: 'должен иметь тип string!' })
  @Min(3, { message: 'Минимальная длина должна быть 3!' })
  @Max(15, { message: 'Максималная длина должна быть 15!' })
  name: string
}
