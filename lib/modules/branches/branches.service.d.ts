import { PrismaService } from '@prisma';
export declare class BranchesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<import("../../interfaces").Response<{
        id: number;
        name: string;
        regionId: number | null;
        companyId: number;
        createdAt: Date;
        updatedAt: Date | null;
        deletedAt: Date | null;
    }[]>>;
    findOne(id: number): Promise<import("../../interfaces").Response<{
        id: number;
        name: string;
        regionId: number | null;
        companyId: number;
        createdAt: Date;
        updatedAt: Date | null;
        deletedAt: Date | null;
    }>>;
    create(data: any): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        region: {
            id: number;
            name: string;
            createdAt: Date;
        };
        company: {
            id: number;
            name: string;
            createdAt: Date;
        };
    }>;
    update(id: number, data: any): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        region: {
            id: number;
            name: string;
            createdAt: Date;
        };
        company: {
            id: number;
            name: string;
            createdAt: Date;
        };
    }>;
    remove(id: number): Promise<void>;
}
