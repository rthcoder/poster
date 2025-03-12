import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
export declare class BranchesController {
    private readonly branchesService;
    constructor(branchesService: BranchesService);
    create(createBranchDto: CreateBranchDto): Promise<{
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
    findAll(): Promise<import("../../interfaces").Response<{
        id: number;
        name: string;
        regionId: number | null;
        companyId: number;
        createdAt: Date;
        updatedAt: Date | null;
        deletedAt: Date | null;
    }[]>>;
    findOne(id: string): Promise<import("../../interfaces").Response<{
        id: number;
        name: string;
        regionId: number | null;
        companyId: number;
        createdAt: Date;
        updatedAt: Date | null;
        deletedAt: Date | null;
    }>>;
    update(id: string, updateBranchDto: UpdateBranchDto): Promise<{
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
    remove(id: string): Promise<void>;
}
