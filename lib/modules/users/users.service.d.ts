import { PrismaService } from '@prisma';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    validate(data: any): Promise<{
        id: number;
        login: string;
        password: string;
        role: number;
    }>;
}
