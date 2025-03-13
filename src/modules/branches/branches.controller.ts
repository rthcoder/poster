import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { BranchesService } from './branches.service'
import { CreateBranchDto } from './dto/create-branch.dto'
import { UpdateBranchDto } from './dto/update-branch.dto'
import { ApiTags } from '@nestjs/swagger'
import { ApiVersion } from '@enums'

@ApiTags('Region Service')
@Controller({
  version: ApiVersion.version,
  path: 'regions',
})
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Get()
  findAll() {
    return this.branchesService.findAll()
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
