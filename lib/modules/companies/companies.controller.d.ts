import { CompaniesService } from './companies.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';
export declare class CompaniesController {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
    findAll(query: any): Promise<import("../../interfaces").FindCompanyResponse>;
    findOne(id: string): Promise<import("../../interfaces").FindCompanyResponse>;
    create(createCompanyDto: CreateCompanyDto): Promise<import("../../interfaces").Response<import("../../interfaces").Company>>;
    update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<import("../../interfaces").FindCompanyResponse>;
    remove(id: string): Promise<import("../../interfaces").NoContentResponse>;
}
