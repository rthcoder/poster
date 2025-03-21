import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateRegionDto } from './dto/create-region.dto'
import { UpdateRegionDto } from './dto/update-region.dto'
import { HttpStatus, Pagination, UserRoles } from '@enums'
import { addFilter, FilterService, formatResponse, paginationResponse } from '@helpers'
import { CreateRegionRequest, FindRegionResponse, NoContentResponse, Region, UpdateRegionRequest } from '@interfaces'
import { PrismaService } from '@prisma'

@Injectable()
export class RegionsService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(query: any): Promise<FindRegionResponse> {
    const { limit = Pagination.LIMIT, page = Pagination.PAGE, sort, filters } = query
    const parsedSort = sort ? JSON?.parse(sort) : {}
    const parsedFilters = filters ? JSON?.parse(filters) : []

    parsedFilters.push(addFilter('deletedAt', null, 'equals'))

    const regions: Region[] = await FilterService?.applyFilters(
      'region',
      parsedFilters,
      parsedSort,
      Number(limit),
      Number(page),
      ['branches'],
    )
    const count = await FilterService.countRecords('region', parsedFilters)

    const result: Region[] = []

    regions?.map((region) => {
      result.push({
        id: region?.id,
        name: region?.name,
        branches: region?.branches?.map((branch) => ({
          id: branch?.id,
          name: branch?.name,
          createdAt: branch?.createdAt,
        })),
        createdAt: region?.createdAt,
      })
    })

    const pagination = paginationResponse(count, limit, page)
    return formatResponse<Region[]>(HttpStatus.OK, result, pagination)
  }

  async findOne(id: number): Promise<FindRegionResponse> {
    const region = await this.prisma.region.findUnique({
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
        branches: {
          select: {
            id: true,
            name: true,
            createdAt: true,
          },
        },
      },
    })

    if (!region) {
      throw new NotFoundException('Регион с таким идентификатором не найден!')
    }

    return formatResponse<Region>(HttpStatus.OK, region)
  }

  async create(data: CreateRegionRequest): Promise<FindRegionResponse> {
    const newRegion = await this.prisma.region.create({
      data: {
        name: data.name,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    })

    return formatResponse<Region>(HttpStatus.CREATED, newRegion)
  }

  async update(id: number, data: UpdateRegionRequest): Promise<FindRegionResponse> {
    const region = await this.prisma.region.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!region) {
      throw new NotFoundException('Регион с таким идентификатором не найден!')
    }

    const updatedRegion = await this.prisma.region.update({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
      data: {
        name: data.name,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    })

    return formatResponse<Region>(HttpStatus.OK, updatedRegion)
  }

  async remove(id: number): Promise<NoContentResponse> {
    const region = await this.prisma.region.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!region) {
      throw new NotFoundException('Регион с таким идентификатором не найден!')
    }

    await this.prisma.region.update({
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
}
