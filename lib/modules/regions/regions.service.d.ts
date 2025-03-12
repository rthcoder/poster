import { CreateRegionDto } from './dto/create-region.dto';
import { FindRegionResponse, NoContentResponse, UpdateRegionRequest } from '@interfaces';
import { PrismaService } from '@prisma';
export declare class RegionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createRegionDto: CreateRegionDto): string;
    findAll(query: any): Promise<FindRegionResponse>;
    findOne(id: number): Promise<FindRegionResponse>;
    update(id: number, data: UpdateRegionRequest): Promise<FindRegionResponse>;
    remove(id: number): Promise<NoContentResponse>;
}
