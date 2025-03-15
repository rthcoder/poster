import { CreateUserRequest } from '@interfaces'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateUserDto implements CreateUserRequest {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  login: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsNumber()
  branchId: number

  @IsNotEmpty()
  @IsNumber()
  role: number
}
