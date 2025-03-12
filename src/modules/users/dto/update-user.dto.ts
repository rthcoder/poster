import { UpdateUserRequest } from '@interfaces'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto implements UpdateUserRequest {
  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  login: string

  @IsOptional()
  @IsString()
  password: string

  @IsOptional()
  @IsNumber()
  companyId: number

  @IsOptional()
  @IsNumber()
  branchId: number

  @IsOptional()
  @IsNumber()
  role: number
}
