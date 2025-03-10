import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '@prisma'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async validate(data: any) {
    const user = await this.prisma.users.findFirst({
      where: {
        login: data.login,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!user) {
      throw new NotFoundException('Пользователь не существует!')
    }

    // if (user.status !== UserStatus.ACTIVE) {
    //   throw new UnauthorizedException('Пользователь имеет пассивный статус. Разрешено только активным пользователям!')
    // }

    return {
      id: user?.id,
      login: user?.login,
      password: user?.password,
      role: user.roleId,
    }
  }
}
