import { Pagination } from '@interfaces'
export function paginationResponse(totalCount: number, limit: number, page: number): Pagination {
  const totalPages: number = Math.ceil(totalCount / limit)
  return {
    totalCount,
    totalPages,
    currentPage: Number(page),
    limit: Number(limit),
  }
}
