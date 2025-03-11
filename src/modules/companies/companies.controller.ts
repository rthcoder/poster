import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CreateCompanyDto, UpdateCompanyDto } from './dto'

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.companiesService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id)
  }

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(+id, updateCompanyDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(+id)
  }
}
