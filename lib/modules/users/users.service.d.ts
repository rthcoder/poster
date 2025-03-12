import { NoContentResponse, User } from '@interfaces';
import { PrismaService } from '@prisma';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(query: any): Promise<import("@interfaces").Response<User[]>>;
    remove(id: number): Promise<NoContentResponse>;
    validate(data: any): Promise<{
        id: number;
        login: string;
        password: string;
        role: number;
    }>;
}
