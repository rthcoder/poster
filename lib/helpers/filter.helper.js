"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class FilterService {
    static async applyFilters(modelName, filters, sort, limit, page, includeRelations = []) {
        const query = {
            where: {
                deletedAt: {
                    equals: null,
                },
            },
            include: {},
        };
        const fieldMapping = {
            code: 'user.code',
        };
        const getNestedObject = (parts, value) => {
            return parts.reduceRight((acc, part) => ({ [part]: acc }), value);
        };
        filters.forEach((filter) => {
            const mappedColumn = fieldMapping[filter.column] || filter.column;
            const columnParts = mappedColumn.split('.');
            const isNested = columnParts.length > 1;
            let valueCondition = {};
            switch (filter.operator) {
                case 'equals':
                case 'equal':
                    valueCondition = { equals: filter.value };
                    break;
                case 'contains':
                    valueCondition = { contains: filter.value, mode: 'insensitive' };
                    break;
                case 'between':
                    if (typeof filter.value === 'string' && filter.value.includes('_')) {
                        const [start, end] = filter.value.split('_');
                        valueCondition = { gte: new Date(start), lte: new Date(end) };
                    }
                    break;
                case 'gte':
                    valueCondition = { gte: filter.value };
                    break;
                case 'lte':
                    valueCondition = { lte: filter.value };
                    break;
                default:
                    valueCondition = { equals: filter.value };
            }
            if (isNested) {
                Object.assign(query.where, getNestedObject(columnParts, valueCondition));
            }
            else {
                query.where[mappedColumn] = valueCondition;
            }
        });
        if (sort && sort.column) {
            query.orderBy = { [sort.column]: sort.value };
        }
        if (limit && page) {
            query.take = limit;
            query.skip = (page - 1) * limit;
        }
        includeRelations.forEach((relation) => {
            const parts = relation.split('.');
            let nestedInclude = true;
            for (let i = parts.length - 1; i >= 0; i--) {
                nestedInclude = { [parts[i]]: nestedInclude };
            }
            Object.assign(query.include, nestedInclude);
        });
        query.orderBy = sort && sort.column ? { [sort.column]: sort.value } : { id: 'desc' };
        const model = prisma[modelName];
        return model['findMany'](query);
    }
    static async countRecords(modelName, filters) {
        const where = {
            deletedAt: {
                equals: null,
            },
        };
        const fieldMapping = {
            code: 'user.code',
        };
        const getNestedObject = (parts, value) => {
            return parts.reduceRight((acc, part) => ({ [part]: acc }), value);
        };
        filters.forEach((filter) => {
            const mappedColumn = fieldMapping[filter.column] || filter.column;
            const columnParts = mappedColumn.split('.');
            const isNested = columnParts.length > 1;
            let valueCondition = {};
            switch (filter.operator) {
                case 'equals':
                case 'equal':
                    valueCondition = { equals: filter.value };
                    break;
                case 'contains':
                    valueCondition = { contains: filter.value, mode: 'insensitive' };
                    break;
                case 'between':
                    if (typeof filter.value === 'string' && filter.value.includes('_')) {
                        const [start, end] = filter.value.split('_');
                        valueCondition = { gte: new Date(start), lte: new Date(end) };
                    }
                    break;
                case 'gte':
                    valueCondition = { gte: filter.value };
                    break;
                case 'lte':
                    valueCondition = { lte: filter.value };
                    break;
                default:
                    valueCondition = { equals: filter.value };
            }
            if (isNested) {
                Object.assign(where, getNestedObject(columnParts, valueCondition));
            }
            else {
                where[mappedColumn] = valueCondition;
            }
        });
        const model = prisma[modelName];
        return model['count']({ where });
    }
}
exports.FilterService = FilterService;
