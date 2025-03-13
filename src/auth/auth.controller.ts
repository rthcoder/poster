import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiVersion } from '@enums'
import { AuthService } from './auth.service'
import { LoginDtoRequest } from './dto/login-dto'
import { LoginResponse } from '@interfaces'
import { CustomRequest } from 'custom/request.custom'
import { CheckTokenGuard } from '@guards'

@ApiTags('Auth')
@Controller({
  version: ApiVersion.version,
  path: 'auth',
})
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDtoRequest): Promise<LoginResponse> {
    return await this.service.login(body)
  }

  @UseGuards(CheckTokenGuard)
  @Get('get-me')
  async getMe(@Req() request: CustomRequest) {
    console.log(request)

    return await this.service.getMe(request.user.id)
  }
}
