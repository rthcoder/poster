import { PrismaClient } from '@prisma/client';
export declare class FilterService {
    static applyFilters(modelName: keyof Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>, filters: Array<{
        column: string;
        operator: string;
        value: any;
    }>, sort?: {
        column: string;
        value: 'asc' | 'desc';
    }, limit?: number, page?: number, includeRelations?: Array<string>): Promise<any>;
    static countRecords(modelName: keyof Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>, filters: Array<{
        column: string;
        operator: string;
        value: any;
    }>): Promise<number>;
}
