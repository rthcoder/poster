import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { PrismaService } from '@prisma'
import { equal } from 'assert'
import { HttpStatus, UserRoles } from '@enums'
import { formatResponse } from '@helpers'
import * as bcrypt from 'bcrypt'
import { saltOrRounds } from '@constants'

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
        createdAt: true,
      },
    })

    if (!company) {
      throw new NotFoundException()
    }
    return formatResponse(HttpStatus.OK, company)
  }

  async create(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, saltOrRounds)
    const newCompany = this.prisma.users.create({
      data: {
        roleId: UserRoles.COMPANY,
        password: hashedPassword,
        ...data,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    })
    return formatResponse(HttpStatus.OK, newCompany)
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`
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
      throw new NotFoundException()
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
        updatedAt: new Date(),
      },
    })
  }
}
