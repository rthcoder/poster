import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
export declare class RegionsService {
    create(createRegionDto: CreateRegionDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRegionDto: UpdateRegionDto): string;
    remove(id: number): string;
}
