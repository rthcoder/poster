import { UpdateRegionRequest } from '@interfaces'
import { IsOptional, IsString } from 'class-validator'

export class UpdateRegionDto implements UpdateRegionRequest {
  @IsOptional()
  @IsString()
  name: string
}
