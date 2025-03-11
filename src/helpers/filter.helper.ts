import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class FilterService {
  static async applyFilters(
    modelName: keyof Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>,
    filters: Array<{ column: string; operator: string; value: any }>,
    sort?: { column: string; value: 'asc' | 'desc' },
    limit?: number,
    page?: number,
    includeRelations: Array<string> = [],
  ): Promise<any> {
    const query: any = {
      where: {
        deletedAt: {
          equal: null,
        },
      },
      include: {},
    }

    const fieldMapping: Record<string, string> = {
      code: 'user.code',
    }

    const getNestedObject = (parts: string[], value: any) => {
      return parts.reduceRight((acc, part) => ({ [part]: acc }), value)
    }

    filters.forEach((filter) => {
      const mappedColumn = fieldMapping[filter.column] || filter.column

      const columnParts = mappedColumn.split('.')
      const isNested = columnParts.length > 1

      let valueCondition: any = {}

      switch (filter.operator) {
        case 'equals':
        case 'equal':
          valueCondition = { equals: filter.value }
          break
        case 'contains':
          valueCondition = { contains: filter.value, mode: 'insensitive' }
          break
        case 'between':
          if (typeof filter.value === 'string' && filter.value.includes('_')) {
            const [start, end] = filter.value.split('_')
            valueCondition = { gte: new Date(start), lte: new Date(end) }
          }
          break
        case 'gte':
          valueCondition = { gte: filter.value }
          break
        case 'lte':
          valueCondition = { lte: filter.value }
          break
        default:
          valueCondition = { equals: filter.value }
      }

      if (isNested) {
        Object.assign(query.where, getNestedObject(columnParts, valueCondition))
      } else {
        query.where[mappedColumn] = valueCondition
      }
    })

    if (sort && sort.column) {
      query.orderBy = { [sort.column]: sort.value }
    }

    if (limit && page) {
      query.take = limit
      query.skip = (page - 1) * limit
    }

    includeRelations.forEach((relation) => {
      const parts = relation.split('.')
      let nestedInclude: any = true
      for (let i = parts.length - 1; i >= 0; i--) {
        nestedInclude = { [parts[i]]: nestedInclude }
      }
      Object.assign(query.include, nestedInclude)
    })

    query.orderBy = sort && sort.column ? { [sort.column]: sort.value } : { id: 'desc' }

    const model: any = prisma[modelName as keyof PrismaClient]
    return model['findMany'](query)
  }

  static async countRecords(
    modelName: keyof Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>,
    filters: Array<{ column: string; operator: string; value: any }>,
  ): Promise<number> {
    const where: any = {}

    const fieldMapping: Record<string, string> = {
      code: 'user.code',
    }

    const getNestedObject = (parts: string[], value: any) => {
      return parts.reduceRight((acc, part) => ({ [part]: acc }), value)
    }

    filters.forEach((filter) => {
      const mappedColumn = fieldMapping[filter.column] || filter.column

      const columnParts = mappedColumn.split('.')
      const isNested = columnParts.length > 1

      let valueCondition: any = {}

      switch (filter.operator) {
        case 'equals':
        case 'equal': // 🔥 "equal" ham ishlashi uchun
          valueCondition = { equals: filter.value }
          break
        case 'contains':
          valueCondition = { contains: filter.value, mode: 'insensitive' }
          break
        case 'between':
          if (typeof filter.value === 'string' && filter.value.includes('_')) {
            const [start, end] = filter.value.split('_')
            valueCondition = { gte: new Date(start), lte: new Date(end) }
          }
          break
        case 'gte':
          valueCondition = { gte: filter.value }
          break
        case 'lte':
          valueCondition = { lte: filter.value }
          break
        default:
          valueCondition = { equals: filter.value }
      }

      if (isNested) {
        Object.assign(where, getNestedObject(columnParts, valueCondition))
      } else {
        where[mappedColumn] = valueCondition
      }
    })

    const model: any = prisma[modelName as keyof PrismaClient]
    return model['count']({ where })
  }
}
