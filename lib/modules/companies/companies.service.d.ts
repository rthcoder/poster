import { PrismaService } from '@prisma';
import { Company, CreateCompanyRequest, FindCompanyResponse, NoContentResponse, UpdateCompanyRequest } from '@interfaces';
export declare class CompaniesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(query: any): Promise<FindCompanyResponse>;
    findOne(id: number): Promise<FindCompanyResponse>;
    create(data: CreateCompanyRequest): Promise<import("@interfaces").Response<Company>>;
    update(id: number, data: UpdateCompanyRequest): Promise<FindCompanyResponse>;
    remove(id: number): Promise<NoContentResponse>;
}
