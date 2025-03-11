import { LoginRequest, LoginResponse } from '@interfaces'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import { UsersService } from '@modules'
import { signJwt } from '@helpers'
import { jwtConstants } from '@constants'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,

    private readonly prisma: PrismaService,
  ) {}

  async login(data: LoginRequest): Promise<LoginResponse> {
    const user = await this.usersService.validate({ login: data.login })

    const isMatch = await bcrypt.compare(data.password, user.password)

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials')
    }

    // const userToken = await this.prisma.userToken.findUnique({
    //   where: {
    //     userId: user.id,
    //   },
    // })

    // if (user.role === UserRoles.OPERATOR && userToken?.refreshToken) {
    //   throw new BadRequestException('Активный сеанс уже существует!')
    // }

    const accessToken = signJwt(
      {
        id: user?.id,
        login: user?.login,
      },
      jwtConstants.accessSecret,
      60 * 60 * 24 * 15,
    )

    return {
      accessToken,
    }
  }
}
