import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
}
