import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiVersion } from '@enums'
import { AuthService } from './auth.service'
import { LoginDtoRequest } from './dto/login-dto'
import { LoginResponse } from '@interfaces'

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
}
