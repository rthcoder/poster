import { Response, Pagination, CountResponse } from '@interfaces'

export function formatResponse<T>(
  status: number,
  data: T,
  pagination?: Pagination,
  count?: CountResponse[],
): Response<T> {
  return { status, data, pagination, count }
}
