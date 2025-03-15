import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { ApiTags } from '@nestjs/swagger'
import { ApiVersion } from '@enums'
import { CreateUserDto } from 'modules/users/dto'
import { CustomRequest } from 'custom/request.custom'
import { CheckTokenGuard } from '@guards'

@ApiTags('Company Service')
@Controller({
  version: ApiVersion.version,
  path: 'company',
})
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}
  @Get()
  findAll() {
    return this.companiesService.findAll()
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

  @UseGuards(CheckTokenGuard)
  @Post('add-staff')
  addStaff(@Body() data: CreateUserDto, @Req() request: CustomRequest) {
    return this.companiesService.addStaff(data, request.user.companyId)
  }

  @UseGuards(CheckTokenGuard)
  @Post('static-staffs')
  getStaff(@Req() request: CustomRequest) {
    return this.companiesService.getStaticStaff(request.user.companyId)
  }
}
