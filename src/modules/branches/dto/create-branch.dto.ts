import { CreateBranchRequest } from '@interfaces'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateBranchDto implements CreateBranchRequest {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsNumber()
  companyId: number

  @IsNotEmpty()
  @IsNumber()
  regionId: number
}
