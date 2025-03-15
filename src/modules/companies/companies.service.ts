import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { PrismaService } from '@prisma'
import { equal } from 'assert'
import { HttpStatus, UserRoles } from '@enums'
import { formatResponse } from '@helpers'
import * as bcrypt from 'bcrypt'
import { saltOrRounds } from '@constants'
import { CreateCompanyRequest, CreateUserRequest, UpdateCompanyRequest } from '@interfaces'

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const companies = await this.prisma.users.findMany({
      where: {
        deletedAt: {
          equals: null,
        },
        roleId: UserRoles.COMPANY,
      },
      select: {
        id: true,
        name: true,
        branches: {
          select: {
            id: true,
            name: true,
            createdAt: true,
          },
          where: {
            deletedAt: {
              equals: null,
            },
          },
        },
        createdAt: true,
      },
    })
    return formatResponse(HttpStatus.OK, companies)
  }

  async findOne(id: number) {
    const company = await this.prisma.users.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
        roleId: UserRoles.COMPANY,
      },
      select: {
        id: true,
        name: true,
        branches: {
          select: {
            id: true,
            name: true,
            createdAt: true,
          },
          where: {
            deletedAt: {
              equals: null,
            },
          },
        },
        createdAt: true,
      },
    })

    if (!company) {
      throw new NotFoundException('Компания с указанным идентификатором не найдена!')
    }
    return formatResponse(HttpStatus.OK, company)
  }

  async create(data: CreateCompanyRequest) {
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
    const newCompany = await this.prisma.users.create({
      data: {
        roleId: UserRoles.COMPANY,
        password: hashedPassword,
        login: data.login,
        name: data.name,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    })
    console.log(newCompany)

    return formatResponse(HttpStatus.OK, newCompany)
  }

  async update(id: number, data: UpdateCompanyRequest) {
    if (data.login && data.login.length > 15) {
      throw new BadRequestException('Логин должен быть короче 15 символов!')
    }

    if (data.login && data.login.length < 8) {
      throw new BadRequestException('Логин должен быть длиннее 8 символов!')
    }

    if (data.password && data.password.length > 12) {
      throw new BadRequestException('Пароль должен быть короче 12 символов!')
    }

    if (data.password && data.password.length < 6) {
      throw new BadRequestException('Пароль должен быть длиннее 6 символов!')
    }

    const existingUser = await this.prisma.users.findUnique({
      where: { id },
    })

    if (!existingUser) {
      throw new NotFoundException('Компания с указанным идентификатором не найдена!')
    }

    if (data.login) {
      const userExists = await this.prisma.users.findFirst({
        where: {
          login: data.login,
          id: { not: id },
        },
      })

      if (userExists) {
        throw new ConflictException('Этот логин уже используется!')
      }
    }

    let hashedPassword = undefined
    if (data.password) {
      hashedPassword = await bcrypt.hash(data.password, saltOrRounds)
    }

    const updatedCompany = await this.prisma.users.update({
      where: { id },
      data: {
        login: data.login || existingUser.login,
        password: hashedPassword || existingUser.password,
        name: data.name || existingUser.name,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        branches: {
          select: {
            id: true,
            name: true,
            createdAt: true,
          },
        },
      },
    })

    return formatResponse(HttpStatus.OK, updatedCompany)
  }

  async remove(id: number) {
    const company = await this.prisma.users.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
        roleId: UserRoles.COMPANY,
      },
    })

    if (!company) {
      throw new NotFoundException('Компания с указанным идентификатором не найдена!')
    }

    await this.prisma.users.update({
      where: {
        id: id,
        roleId: UserRoles.COMPANY,
        deletedAt: {
          equals: null,
        },
      },
      data: {
        deletedAt: new Date(),
      },
    })
    return {
      status: HttpStatus.NO_CONTENT,
    }
  }

  async addStaff(data: CreateUserRequest, companyId: number) {
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

    const branchExists = await this.prisma.branch.findUnique({
      where: {
        id: data?.branchId,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!branchExists) {
      throw new ConflictException('Филиал не существует!')
    }

    const newUser = await this.prisma.users.create({
      data: {
        name: data.name,
        login: data.login,
        password: hashedPassword,
        branchId: data.branchId,
        roleId: data.role,
        companyId: companyId,
      },
      select: {
        id: true,
        name: true,
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
            createdAt: true,
          },
        },
        role: {
          select: {
            name: true,
            roleId: true,
          },
        },
        createdAt: true,
      },
    })
    return formatResponse(HttpStatus.CREATED, newUser)
  }

  async getStaticStaff(companyId: number) {
    const staffs = await this.prisma.users.findMany({
      where: {
        roleId: {
          in: [UserRoles.SUPER_ADMIN, UserRoles.MANAGER, UserRoles.KASSA],
        },
        companyId: companyId,
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

    return formatResponse(HttpStatus.OK, staffs)
  }
}
