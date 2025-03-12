import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from '@prisma';
export declare class CompaniesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<import("../../interfaces").Response<{
        id: number;
        name: string;
        createdAt: Date;
    }[]>>;
    findOne(id: number): Promise<import("../../interfaces").Response<{
        id: number;
        name: string;
        createdAt: Date;
    }>>;
    create(data: any): Promise<import("../../interfaces").Response<import("@prisma/client").Prisma.Prisma__UsersClient<{
        id: number;
        name: string;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>>>;
    update(id: number, updateCompanyDto: UpdateCompanyDto): string;
    remove(id: number): Promise<void>;
}
