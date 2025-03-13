import { Branch, Pagination } from '@interfaces'

export interface Company {
  id: number
  name: string
  branches?: Branch[]
  createdAt: Date
}

export interface FindCompanyResponse {
  status: number
  data: Company[] | Company
  pagination?: Pagination
}

export interface CreateCompanyRequest {
  name: string
  login: string
  password: string
}

export interface UpdateCompanyRequest {
  name?: string
  login?: string
  password?: string
}
