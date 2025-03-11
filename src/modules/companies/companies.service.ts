import { Injectable } from '@nestjs/common'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { PrismaService } from '@prisma'
import { HttpStatus } from '@enums'

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const companies = await this.prisma.company.findMany({
      where: {
        deletedAt: {
          equals: null,
        },
      },
      include: {
        branches: true,
      },
    })

    const result: any[] = []

    companies.map((company) => {
      result.push({
        id: company?.id,
        name: company.name,
        branch: company.branches,
        createdAt: company.createdAt,
      })
    })

    return {
      status: HttpStatus.OK,
      data: result,
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} company`
  }

  create(createCompanyDto: CreateCompanyDto) {
    return 'This action adds a new company'
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`
  }

  remove(id: number) {
    return `This action removes a #${id} company`
  }
}
