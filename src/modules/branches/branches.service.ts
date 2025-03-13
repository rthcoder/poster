import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@prisma'
import { HttpStatus, Pagination, UserRoles } from '@enums'
import { FilterService, formatResponse, paginationResponse } from '@helpers'
import { Branch, CreateBranchRequest } from '@interfaces'

@Injectable()
export class BranchesService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(query: any) {
    const { limit = Pagination.LIMIT, page = Pagination.PAGE, sort, filters } = query
    const parsedSort = sort ? JSON?.parse(sort) : {}
    const parsedFilters = filters ? JSON?.parse(filters) : []

    const branches: Branch[] = await FilterService?.applyFilters(
      'branch',
      parsedFilters,
      parsedSort,
      Number(limit),
      Number(page),
      ['company', 'region'],
    )
    const count = await FilterService.countRecords('region', parsedFilters)

    const result: Branch[] = []

    branches?.map((branch) => {
      result?.push({
        id: branch?.id,
        name: branch?.name,
        createdAt: branch?.createdAt,
        company: {
          id: branch?.company?.id,
          name: branch?.company?.name,
          createdAt: branch?.company?.createdAt,
        },
        region: {
          id: branch?.region?.id,
          name: branch?.region?.name,
          createdAt: branch?.region?.createdAt,
        },
      })
    })
    const pagination = paginationResponse(count, limit, page)
    return formatResponse<Branch[]>(HttpStatus.OK, result, pagination)
  }

  async findOne(id: number) {
    const branch = await this.prisma.branch.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
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
      },
    })
    if (!branch) {
      throw new NotFoundException('Филиал с указанным идентификатором не найден!')
    }

    return formatResponse<Branch>(HttpStatus.OK, branch)
  }

  async create(data: CreateBranchRequest) {
    const newBranch = await this.prisma.branch.create({
      data: {
        name: data?.name,
        companyId: data?.companyId,
        regionId: data?.regionId,
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

    return formatResponse(HttpStatus.CREATED, newBranch)
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
