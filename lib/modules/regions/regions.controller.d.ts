import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionRequest } from '@interfaces';
export declare class RegionsController {
    private readonly regionsService;
    constructor(regionsService: RegionsService);
    create(createRegionDto: CreateRegionDto): string;
    findAll(query: any): Promise<import("@interfaces").FindRegionResponse>;
    findOne(id: string): Promise<import("@interfaces").FindRegionResponse>;
    update(id: string, updateRegionDto: UpdateRegionRequest): Promise<import("@interfaces").FindRegionResponse>;
    remove(id: string): Promise<import("@interfaces").NoContentResponse>;
}
