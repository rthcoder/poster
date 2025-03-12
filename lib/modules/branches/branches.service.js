"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchesService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const _prisma_1 = require("../../prisma");
const _enums_1 = require("../../enums");
const _helpers_1 = require("../../helpers");
let BranchesService = class BranchesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const branches = await this.prisma.branch.findMany({
            where: {
                deletedAt: {
                    equals: null,
                },
            },
        });
        return (0, _helpers_1.formatResponse)(_enums_1.HttpStatus.OK, branches);
    }
    async findOne(id) {
        const branch = await this.prisma.branch.findUnique({
            where: {
                id: id,
                deletedAt: {
                    equals: null,
                },
            },
        });
        if (!branch) {
            throw new common_1.NotFoundException('branch not found');
        }
        return (0, _helpers_1.formatResponse)(_enums_1.HttpStatus.OK, branch);
    }
    async create(data) {
        const newBranch = await this.prisma.branch.create({
            data: {
                ...data,
            },
            select: {
                id: true,
                name: true,
                company: {
                    select: {
                        id: true,
                        name: true,
                        createdAt: true,
                    },
                },
                region: {
                    select: {
                        id: true,
                        name: true,
                        createdAt: true,
                    },
                },
                createdAt: true,
            },
        });
        return newBranch;
    }
    async update(id, data) {
        const branch = await this.prisma.branch.findUnique({
            where: {
                id: id,
                deletedAt: {
                    equals: null,
                },
            },
        });
        if (!branch) {
            throw new common_1.NotFoundException('branch not found');
        }
        const updatedBranch = await this.prisma.branch.update({
            where: {
                id: id,
            },
            data: {
                updatedAt: new Date(),
                ...data,
            },
            select: {
                id: true,
                name: true,
                company: {
                    select: {
                        id: true,
                        name: true,
                        createdAt: true,
                    },
                },
                region: {
                    select: {
                        id: true,
                        name: true,
                        createdAt: true,
                    },
                },
                createdAt: true,
            },
        });
        return updatedBranch;
    }
    async remove(id) {
        const branch = await this.prisma.branch.findUnique({
            where: {
                id: id,
                deletedAt: {
                    equals: null,
                },
            },
        });
        if (!branch) {
            throw new common_1.NotFoundException('branch not found');
        }
        await this.prisma.branch.update({
            where: {
                id: id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }
};
exports.BranchesService = BranchesService;
exports.BranchesService = BranchesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [_prisma_1.PrismaService])
], BranchesService);
