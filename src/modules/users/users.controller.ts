import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiTags } from '@nestjs/swagger'
import { ApiVersion } from '@enums'
import { CreateUserDto, UpdateUserDto } from './dto'

@ApiTags('Users Service')
@Controller({
  version: ApiVersion.version,
  path: 'users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() query: any) {
    const result = this.usersService.findAll(query)
    return result
  }

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   const result = this.usersService.findOne(+id)
  //   return result
  // }

  // @Post()
  // create(@Body() createUserDTO: CreateUserDto) {
  //   const result = this.usersService.create(createUserDTO)
  //   return result
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, updateUserDto: UpdateUserDto) {
  //   const result = this.usersService.update(+id, updateUserDto)
  //   return result
  // }

  @Delete(':id')
  remove(@Param(':id') id: string) {
    const result = this.usersService.remove(+id)
    return result
  }
}
