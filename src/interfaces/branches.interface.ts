import { Company, Region } from '@interfaces'
export interface Branch {
  id: number
  name: string
  company?: Company
  region?: Region
  createdAt: Date
}

export interface CreateBranchRequest {
  name: string
  regionId: number
  companyId: number
}

export interface UpdateBranchRequest {
  name: string
  regionId: number
  companyId: number
}
