import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { BranchesService } from './branches.service'
import { CreateBranchDto } from './dto/create-branch.dto'
import { UpdateBranchDto } from './dto/update-branch.dto'
import { ApiTags } from '@nestjs/swagger'
import { ApiVersion } from '@enums'

@ApiTags('Branch Service')
@Controller({
  version: ApiVersion.version,
  path: 'branches',
})
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.branchesService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchesService.findOne(+id)
  }

  @Post()
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchesService.create(createBranchDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchesService.update(+id, updateBranchDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchesService.remove(+id)
  }
}
