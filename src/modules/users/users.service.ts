import { saltOrRounds } from '@constants'
import { HttpStatus, Pagination, UserRoles } from '@enums'
import { addFilter, FilterService, formatResponse, paginationResponse } from '@helpers'
import { CreateUserRequest, FindUserResponse, NoContentResponse, UpdateUserRequest, User } from '@interfaces'
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  Query,
  UnauthorizedException,
} from '@nestjs/common'
import { PrismaService } from '@prisma'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: any) {
    const { limit = Pagination.LIMIT, page = Pagination.PAGE, sort, filters } = query
    const parsedSort = sort ? JSON?.parse(sort) : {}
    const parsedFilters = filters ? JSON?.parse(filters) : []

    parsedFilters.push(addFilter('roleId', UserRoles.SUPER_ADMIN, 'equal'))
    parsedFilters.push(addFilter('roleId', UserRoles.KASSA, 'equal'))
    parsedFilters.push(addFilter('roleId', UserRoles.MANAGER, 'equal'))

    const users = await FilterService?.applyFilters('users', parsedFilters, parsedSort, Number(limit), Number(page), [
      'company',
      'branch',
    ])
    const count = await FilterService.countRecords('users', parsedFilters)

    const pagination = paginationResponse(count, limit, page)
    return formatResponse<User[]>(HttpStatus.OK, users, pagination)
  }

  // async findOne(id: number) {
  //   const user = await this.prisma.users.findUnique({
  //     where: {
  //       id: id,
  //       deletedAt: {
  //         equals: null,
  //       },
  //       roleId: {
  //         in: [UserRoles.KASSA, UserRoles.MANAGER, UserRoles.SUPER_ADMIN],
  //       },
  //     },
  //     select: {
  //       id: true,
  //       name: true,
  //       login: true,
  //       role: {
  //         select: {
  //           roleInt: true,
  //           name: true,
  //         },
  //       },
  //       createdAt: true,
  //       branch: {
  //         select: {
  //           id: true,
  //           name: true,
  //           createdAt: true,
  //         },
  //       },
  //       company: {
  //         select: {
  //           id: true,
  //           name: true,
  //           createdAt: true,
  //         },
  //       },
  //     },
  //   })

  //   if (!user) {
  //     throw new NotFoundException('Юзер с таким идентификатором не найдена!')
  //   }
  //   console.log(user)

  //   return formatResponse<User>(HttpStatus.OK, user)
  // }

  // async create(data: CreateUserRequest) {
  //   if (!Object.values(UserRoles).includes(data.role)) {
  //     throw new NotFoundException('Роль не найдена!')
  //   }

  //   const hashedPassword = await bcrypt.hash(data.password, saltOrRounds)
  //   const role = await this.prisma.userRoles.findUnique({
  //     where: {
  //       roleInt: data.role,
  //     },
  //   })

  //   const newUser = await this.prisma.users.create({
  //     data: {
  //       name: data.name,
  //       login: data.login,
  //       password: hashedPassword,
  //       branchId: data.branchId,
  //       companyId: data.companyId,
  //       roleId: role.id,
  //     },
  //     select: {
  //       id: true,
  //       name: true,
  //       login: true,
  //       role: {
  //         select: {
  //           roleInt: true,
  //           name: true,
  //         },
  //       },
  //       company: {
  //         select: {
  //           id: true,
  //           name: true,
  //           createdAt: true,
  //         },
  //       },
  //       branch: {
  //         select: {
  //           id: true,
  //           name: true,
  //           createdAt: true,
  //         },
  //       },
  //     },
  //   })

  //   return formatResponse(HttpStatus.OK, newUser)
  // }
  // async update(id: number, data: UpdateUserRequest) {
  //   const existingUser = await this.prisma.users.findUnique({
  //     where: {
  //       id: id,
  //       deletedAt: {
  //         equals: null,
  //       },
  //     },
  //   })

  //   if (!existingUser) {
  //     throw new NotFoundException('Пользователь не найден!')
  //   }

  //   if (data.role && !Object.values(UserRoles).includes(data.role)) {
  //     throw new NotFoundException('Роль не найдена!')
  //   }

  //   let hashedPassword = existingUser.password
  //   if (data.password) {
  //     hashedPassword = await bcrypt.hash(data.password, saltOrRounds)
  //   }

  //   let roleId = existingUser.roleId
  //   if (data.role) {
  //     const role = await this.prisma.userRoles.findUnique({
  //       where: { roleInt: data.role },
  //     })

  //     if (!role) {
  //       throw new NotFoundException('Роль не найдена!')
  //     }
  //     roleId = role.id
  //   }

  //   const updatedUser = await this.prisma.users.update({
  //     where: { id },
  //     data: {
  //       name: data.name ?? existingUser.name,
  //       login: data.login ?? existingUser.login,
  //       password: hashedPassword,
  //       branchId: data.branchId ?? existingUser.branchId,
  //       companyId: data.companyId ?? existingUser.companyId,
  //       roleId,
  //       updatedAt: new Date(),
  //     },
  //     select: {
  //       id: true,
  //       name: true,
  //       login: true,
  //       role: {
  //         select: {
  //           roleInt: true,
  //           name: true,
  //         },
  //       },
  //       company: {
  //         select: {
  //           id: true,
  //           name: true,
  //           createdAt: true,
  //         },
  //       },
  //       branch: {
  //         select: {
  //           id: true,
  //           name: true,
  //           createdAt: true,
  //         },
  //       },
  //     },
  //   })

  //   return formatResponse(HttpStatus.OK, updatedUser)
  // }

  async remove(id: number): Promise<NoContentResponse> {
    const existingUser = await this.prisma.users.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!existingUser) {
      throw new NotFoundException('Пользователь не найден!')
    }

    await this.prisma.users.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    return {
      status: HttpStatus.NO_CONTENT,
    }
  }

  async update(data: UpdateUserRequest, userId: number) {
    if (data.login.length > 15) {
      throw new BadRequestException('Логин должен быть короче 15 символов!')
    }

    if (data.login.length < 8) {
      throw new BadRequestException('Логин должен быть длиннее 8 символов!')
    }

    if (data.password.length > 12) {
      throw new BadRequestException('Пароль должен быть короче 12 символов!')
    }

    if (data.password.length < 6) {
      throw new BadRequestException('Пароль должен быть длиннее 6 символов!')
    }

    const userExists = await this.prisma.users.findFirst({
      where: {
        login: data.login,
      },
    })

    if (userExists) {
      throw new ConflictException('Этот логин уже используется!')
    }

    const hashedPassword = await bcrypt.hash(data.password, saltOrRounds)

    const updatedUser = await this.prisma.users.update({
      where: {
        roleId: {
          notIn: [UserRoles.COMPANY, UserRoles.BRANCH],
        },
        id: userId,
      },
      data: {
        login: data.login,
        password: hashedPassword,
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
      },
    })

    return formatResponse(HttpStatus.OK, updatedUser)
  }

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
