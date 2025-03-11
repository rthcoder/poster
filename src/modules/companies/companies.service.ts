import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { PrismaService } from '@prisma'
import { HttpStatus, Pagination } from '@enums'
import { FilterService, formatResponse, paginationResponse } from '@helpers'
import {
  Company,
  CreateCompanyRequest,
  FindCompanyResponse,
  NoContentResponse,
  UpdateCompanyRequest,
} from '@interfaces'

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: any): Promise<FindCompanyResponse> {
    const { limit = Pagination.LIMIT, page = Pagination.PAGE, sort, filters } = query

    const parsedSort = sort ? JSON?.parse(sort) : {}

    const parsedFilters = filters ? JSON?.parse(filters) : []

    const companies = await FilterService?.applyFilters(
      'company',
      parsedFilters,
      parsedSort,
      Number(limit),
      Number(page),
      ['branch'],
    )

    const count: number = await FilterService.countRecords('company', parsedFilters)

    const result: Company[] = []

    companies.map((company: Company) => {
      result.push({
        id: company?.id,
        name: company.name,
        branches: company.branches,
        createdAt: company.createdAt,
      })
    })

    const pagination = paginationResponse(count, Pagination.LIMIT, Pagination.PAGE)
    return formatResponse<Company[]>(HttpStatus.OK, result, pagination)
  }

  async findOne(id: number): Promise<FindCompanyResponse> {
    const company: Company = await this.prisma.company.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
      select: {
        id: true,
        name: true,
        branches: true,
        createdAt: true,
      },
    })

    if (!company) {
      throw new NotFoundException('Компания с таким идентификатором не найдена!')
    }

    return formatResponse<Company>(HttpStatus.OK, company)
  }

  async create(data: CreateCompanyRequest) {
    const newComany = await this.prisma.company.create({
      data: {
        name: data.name,
      },
      select: {
        id: true,
        name: true,
        branches: true,
        createdAt: true,
      },
    })

    console.log(newComany)

    return formatResponse<Company>(HttpStatus.CREATED, newComany)
  }

  async update(id: number, data: UpdateCompanyRequest): Promise<FindCompanyResponse> {
    const company = await this.prisma.company.findUnique({
      where: {
        deletedAt: {
          equals: null,
        },
        id: id,
      },
    })

    if (!company) {
      throw new NotFoundException('Компания с таким идентификатором не найдена!')
    }

    const updatedCompany: Company = await this.prisma.company.update({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
      data: {
        name: data.name,
      },
      select: {
        id: true,
        name: true,
        branches: true,
        createdAt: true,
      },
    })

    return formatResponse<Company>(HttpStatus.OK, updatedCompany)
  }

  async remove(id: number): Promise<NoContentResponse> {
    const company = await this.prisma.company.findUnique({
      where: {
        id: id,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!company) {
      throw new NotFoundException('Компания с таким идентификатором не найдена!')
    }

    await this.prisma.company.delete({
      where: {
        id: id,
      },
    })

    return {
      status: HttpStatus.NO_CONTENT,
    }
  }
}
