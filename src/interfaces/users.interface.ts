import { Company, Branch, Pagination } from '@interfaces'

export interface User {
  id: number
  name: string
  login: string
  company: Company
  branch: Branch
  createdAt: Date
}

export interface FindUserResponse {
  status: number
  data: User[] | User
  pagination?: Pagination
}

export interface CreateUserRequest {
  name: string
  login: string
  password: string
  role: number
  // companyId: number
  branchId: number
}

export interface UpdateUserRequest {
  login?: string
  password?: string
}
