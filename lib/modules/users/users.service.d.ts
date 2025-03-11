import { PrismaService } from '@prisma';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: number;
        name: string | null;
        login: string;
        password: string;
        roleId: number;
        companyId: number | null;
        branchId: number | null;
        createdAt: Date;
        updatedAt: Date | null;
        deletedAt: Date | null;
    }[]>;
    validate(data: any): Promise<{
        id: number;
        login: string;
        password: string;
        role: number;
    }>;
}
