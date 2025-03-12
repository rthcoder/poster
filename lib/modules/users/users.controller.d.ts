import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(query: any): Promise<import("../../interfaces").Response<import("../../interfaces").User[]>>;
    remove(id: string): Promise<import("../../interfaces").NoContentResponse>;
}
