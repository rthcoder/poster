import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateBranchDto } from './dto/create-branch.dto'
import { UpdateBranchDto } from './dto/update-branch.dto'
import { PrismaService } from '@prisma'
import { HttpStatus, UserRoles } from '@enums'
import { formatResponse } from '@helpers'

@Injectable()
export class BranchesService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const branches = await this.prisma.branch.findMany({
      where: {
        deletedAt: {
          equals: null,
        },
      },
    })

    return formatResponse(HttpStatus.OK, branches)
  }

  async findOne(id: number) {
    const branch = await this.prisma.branch.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })
    if (!branch) {
      throw new NotFoundException('branch not found')
    }

    return formatResponse(HttpStatus.OK, branch)
  }

  async create(data: any) {
    const newBranch = await this.prisma.branch.create({
      data: {
        ...data,
      },
      select: {
        id: true,
        name: true,
        company: {
          select: {
            id: true,
            name: true,
            createdAt: true,
          },
        },
        region: {
          select: {
            id: true,
            name: true,
            createdAt: true,
          },
        },
        createdAt: true,
      },
    })

    return newBranch
  }

  async update(id: number, data: any) {
    const branch = await this.prisma.branch.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })
    if (!branch) {
      throw new NotFoundException('branch not found')
    }

    const updatedBranch = await this.prisma.branch.update({
      where: {
        id: id,
      },
      data: {
        updatedAt: new Date(),
        ...data,
      },
      select: {
        id: true,
        name: true,
        company: {
          select: {
            id: true,
            name: true,
            createdAt: true,
          },
        },
        region: {
          select: {
            id: true,
            name: true,
            createdAt: true,
          },
        },
        createdAt: true,
      },
    })

    return updatedBranch
  }

  async remove(id: number) {
    const branch = await this.prisma.branch.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })
    if (!branch) {
      throw new NotFoundException('branch not found')
    }

    await this.prisma.branch.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
}
