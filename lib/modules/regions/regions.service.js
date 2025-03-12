"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const _enums_1 = require("../../enums");
const _helpers_1 = require("../../helpers");
const _prisma_1 = require("../../prisma");
let RegionsService = class RegionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createRegionDto) {
        return 'This action adds a new region';
    }
    async findAll(query) {
        const { limit = _enums_1.Pagination.LIMIT, page = _enums_1.Pagination.PAGE, sort, filters } = query;
        const parsedSort = sort ? JSON?.parse(sort) : {};
        const parsedFilters = filters ? JSON?.parse(filters) : [];
        const regions = await _helpers_1.FilterService?.applyFilters('region', parsedFilters, parsedSort, Number(limit), Number(page));
        const count = await _helpers_1.FilterService.countRecords('region', parsedFilters);
        const pagination = (0, _helpers_1.paginationResponse)(count, limit, page);
        return (0, _helpers_1.formatResponse)(_enums_1.HttpStatus.OK, regions, pagination);
    }
    async findOne(id) {
        const region = await this.prisma.region.findUnique({
            where: {
                id: id,
                deletedAt: {
                    equals: null,
                },
            },
            select: {
                id: true,
                name: true,
                createdAt: true,
                branches: true,
            },
        });
        if (!region) {
            throw new common_1.NotFoundException('Регион с таким идентификатором не найден!');
        }
        return (0, _helpers_1.formatResponse)(_enums_1.HttpStatus.OK, region);
    }
    async update(id, data) {
        const region = await this.prisma.region.findUnique({
            where: {
                id: id,
                deletedAt: {
                    equals: null,
                },
            },
        });
        if (!region) {
            throw new common_1.NotFoundException('Регион с таким идентификатором не найден!');
        }
        const updatedRegion = await this.prisma.region.update({
            where: {
                id: id,
                deletedAt: {
                    equals: null,
                },
            },
            data: {
                name: data.name,
                updatedAt: new Date(),
            },
            select: {
                id: true,
                name: true,
                branches: true,
                createdAt: true,
            },
        });
        return (0, _helpers_1.formatResponse)(_enums_1.HttpStatus.OK, updatedRegion);
    }
    async remove(id) {
        const region = await this.prisma.region.findUnique({
            where: {
                id: id,
                deletedAt: {
                    equals: null,
                },
            },
        });
        if (!region) {
            throw new common_1.NotFoundException('Регион с таким идентификатором не найден!');
        }
        await this.prisma.region.update({
            where: {
                id: id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
        return {
            status: _enums_1.HttpStatus.NO_CONTENT,
        };
    }
};
exports.RegionsService = RegionsService;
exports.RegionsService = RegionsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [_prisma_1.PrismaService])
], RegionsService);
