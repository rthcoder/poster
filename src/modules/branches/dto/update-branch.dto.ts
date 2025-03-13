import { UpdateBranchRequest } from '@interfaces'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateBranchDto implements UpdateBranchRequest {
  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsNumber()
  companyId: number

  @IsOptional()
  @IsNumber()
  regionId: number
}
