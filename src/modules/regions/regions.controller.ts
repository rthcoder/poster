import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { RegionsService } from './regions.service'
import { CreateRegionDto } from './dto/create-region.dto'
import { UpdateRegionDto } from './dto/update-region.dto'
import { ApiTags } from '@nestjs/swagger'
import { ApiVersion } from '@enums'

@ApiTags('Region Service')
@Controller({
  version: ApiVersion.version,
  path: 'regions',
})
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.regionsService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(+id)
  }

  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionsService.create(createRegionDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionsService.update(+id, updateRegionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionsService.remove(+id)
  }
}
