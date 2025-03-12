import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateRegionDto } from './dto/create-region.dto'
import { UpdateRegionDto } from './dto/update-region.dto'
import { HttpStatus, Pagination, UserRoles } from '@enums'
import { addFilter, FilterService, formatResponse, paginationResponse } from '@helpers'
import { FindRegionResponse, NoContentResponse, Region, UpdateRegionRequest } from '@interfaces'
import { PrismaService } from '@prisma'

@Injectable()
export class RegionsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createRegionDto: CreateRegionDto) {
    return 'This action adds a new region'
  }

  async findAll(query: any): Promise<FindRegionResponse> {
    const { limit = Pagination.LIMIT, page = Pagination.PAGE, sort, filters } = query
    const parsedSort = sort ? JSON?.parse(sort) : {}
    const parsedFilters = filters ? JSON?.parse(filters) : []

    const regions = await FilterService?.applyFilters('region', parsedFilters, parsedSort, Number(limit), Number(page))
    const count = await FilterService.countRecords('region', parsedFilters)

    const pagination = paginationResponse(count, limit, page)
    return formatResponse<Region[]>(HttpStatus.OK, regions, pagination)
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
        branches: true,
      },
    })

    if (!region) {
      throw new NotFoundException('Регион с таким идентификатором не найден!')
    }

    return formatResponse<Region>(HttpStatus.OK, region)
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
        branches: true,
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
