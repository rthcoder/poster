import { UpdateUserRequest } from '@interfaces'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto implements UpdateUserRequest {
  @IsOptional()
  @IsString()
  login?: string

  @IsOptional()
  @IsString()
  password?: string
}
