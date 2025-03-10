import { LoginRequest, LoginResponse } from '@interfaces';
import { PrismaService } from 'prisma/prisma.service';
import { UsersService } from '@modules';
export declare class AuthService {
    private readonly usersService;
    private readonly prisma;
    constructor(usersService: UsersService, prisma: PrismaService);
    login(data: LoginRequest): Promise<LoginResponse>;
}
