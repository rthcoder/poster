import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiTags } from '@nestjs/swagger'
import { ApiVersion, UserRoles } from '@enums'
import { CreateUserDto, UpdateUserDto } from './dto'
import { CustomRequest } from 'custom/request.custom'
import { CheckTokenGuard } from '@guards'
import { Roles } from '@decorators'

@ApiTags('Users Service')
@Controller({
  version: ApiVersion.version,
  path: 'users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.MANAGER] })
  @Get()
  findAll(@Query() query: any) {
    const result = this.usersService.findAll(query)
    return result
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.MANAGER] })
  @Get()
  updateUser(@Body() UpdateUserDto: UpdateUserDto, @Req() request: CustomRequest) {
    const result = this.usersService.update(UpdateUserDto, request.user.id)
    return result
  }

  @UseGuards(CheckTokenGuard)
  @Roles({ role: [UserRoles.SUPER_ADMIN, UserRoles.MANAGER] })
  @Get()
  craeteCashier() {}

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
