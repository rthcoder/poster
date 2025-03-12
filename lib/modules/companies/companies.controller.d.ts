import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompaniesController {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
    create(createCompanyDto: CreateCompanyDto): Promise<import("../../interfaces").Response<import("@prisma/client").Prisma.Prisma__UsersClient<{
        id: number;
        name: string;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>>>;
    findAll(): Promise<import("../../interfaces").Response<{
        id: number;
        name: string;
        createdAt: Date;
    }[]>>;
    findOne(id: string): Promise<import("../../interfaces").Response<{
        id: number;
        name: string;
        createdAt: Date;
    }>>;
    update(id: string, updateCompanyDto: UpdateCompanyDto): string;
    remove(id: string): Promise<void>;
}
