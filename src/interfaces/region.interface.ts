import { Branch, Pagination } from '@interfaces'

export interface Region {
  id: number
  name: string
  branches: Branch[]
  createdAt: Date
}

export interface CreateRegionRequest {
  name: string
}

export interface UpdateRegionRequest {
  name: string
}

export interface FindRegionResponse {
  status: number
  data: Region[] | Region
  pagination?: Pagination
}
