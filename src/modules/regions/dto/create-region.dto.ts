import { CreateRegionRequest } from '@interfaces'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateRegionDto implements CreateRegionRequest {
  @IsNotEmpty()
  @IsString()
  name: string
}
