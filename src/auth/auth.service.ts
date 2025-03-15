import { LoginRequest, LoginResponse } from '@interfaces'
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import { UsersService } from '@modules'
import { formatResponse, signJwt } from '@helpers'
import { jwtConstants } from '@constants'
import { HttpStatus, UserRoles } from '@enums'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,

    private readonly prisma: PrismaService,
  ) {}

  async login(data: LoginRequest): Promise<LoginResponse> {
    let companyId: number
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

    if (user.role === UserRoles.COMPANY) {
      companyId = user.id
    }

    const accessToken = signJwt(
      {
        id: user?.id,
        login: user?.login,
        role: user.role,
        companyId,
      },
      jwtConstants.accessSecret,
      60 * 60 * 24 * 15,
    )

    return {
      accessToken,
    }
  }

  async getMe(userId: number) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: userId,
        deletedAt: {
          equals: null,
        },
      },
      select: {
        id: true,
        name: true,
        role: {
          select: {
            name: true,
            roleId: true,
          },
        },
        login: true,
        branch: {
          select: {
            id: true,
            name: true,
            createdAt: true,
          },
        },
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    if (!user) {
      throw new NotFoundException('Пользователь с указанным идентификатором не найден!')
    }
    console.log(user)

    return formatResponse(HttpStatus.OK, user)
  }
}
