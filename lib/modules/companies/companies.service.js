"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompaniesService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const _prisma_1 = require("../../prisma");
const _enums_1 = require("../../enums");
const _helpers_1 = require("../../helpers");
let CompaniesService = class CompaniesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { limit = _enums_1.Pagination.LIMIT, page = _enums_1.Pagination.PAGE, sort, filters } = query;
        const parsedSort = sort ? JSON?.parse(sort) : {};
        const parsedFilters = filters ? JSON?.parse(filters) : [];
        const companies = await _helpers_1.FilterService?.applyFilters('company', parsedFilters, parsedSort, Number(limit), Number(page), ['branch']);
        const count = await _helpers_1.FilterService.countRecords('company', parsedFilters);
        const result = [];
        companies.map((company) => {
            result.push({
                id: company?.id,
                name: company.name,
                branches: company.branches,
                createdAt: company.createdAt,
            });
        });
        const pagination = (0, _helpers_1.paginationResponse)(count, _enums_1.Pagination.LIMIT, _enums_1.Pagination.PAGE);
        return (0, _helpers_1.formatResponse)(_enums_1.HttpStatus.OK, result, pagination);
    }
    async findOne(id) {
        const company = await this.prisma.company.findUnique({
            where: {
                id: id,
                deletedAt: {
                    equals: null,
                },
            },
            select: {
                id: true,
                name: true,
                branches: true,
                createdAt: true,
            },
        });
        if (!company) {
            throw new common_1.NotFoundException('Компания с таким идентификатором не найдена!');
        }
        return (0, _helpers_1.formatResponse)(_enums_1.HttpStatus.OK, company);
    }
    async create(data) {
        const newComany = await this.prisma.company.create({
            data: {
                name: data.name,
            },
            select: {
                id: true,
                name: true,
                branches: true,
                createdAt: true,
            },
        });
        console.log(newComany);
        return (0, _helpers_1.formatResponse)(_enums_1.HttpStatus.CREATED, newComany);
    }
    async update(id, data) {
        const company = await this.prisma.company.findUnique({
            where: {
                deletedAt: {
                    equals: null,
                },
                id: id,
            },
        });
        if (!company) {
            throw new common_1.NotFoundException('Компания с таким идентификатором не найдена!');
        }
        const updatedCompany = await this.prisma.company.update({
            where: {
                id: id,
                deletedAt: {
                    equals: null,
                },
            },
            data: {
                name: data.name,
            },
            select: {
                id: true,
                name: true,
                branches: true,
                createdAt: true,
            },
        });
        return (0, _helpers_1.formatResponse)(_enums_1.HttpStatus.OK, updatedCompany);
    }
    async remove(id) {
        const company = await this.prisma.company.findUnique({
            where: {
                id: id,
                deletedAt: {
                    equals: null,
                },
            },
        });
        if (!company) {
            throw new common_1.NotFoundException('Компания с таким идентификатором не найдена!');
        }
        await this.prisma.company.delete({
            where: {
                id: id,
            },
        });
        return {
            status: _enums_1.HttpStatus.NO_CONTENT,
        };
    }
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [_prisma_1.PrismaService])
], CompaniesService);
