"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompaniesService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const _prisma_1 = require("../../prisma");
const _enums_1 = require("../../enums");
const _helpers_1 = require("../../helpers");
const bcrypt = tslib_1.__importStar(require("bcrypt"));
const _constants_1 = require("../../constants");
let CompaniesService = class CompaniesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const companies = await this.prisma.users.findMany({
            where: {
                deletedAt: {
                    equals: null,
                },
                roleId: _enums_1.UserRoles.COMPANY,
            },
            select: {
                id: true,
                name: true,
                createdAt: true,
            },
        });
        return (0, _helpers_1.formatResponse)(_enums_1.HttpStatus.OK, companies);
    }
    async findOne(id) {
        const company = await this.prisma.users.findUnique({
            where: {
                id: id,
                deletedAt: {
                    equals: null,
                },
                roleId: _enums_1.UserRoles.COMPANY,
            },
            select: {
                id: true,
                name: true,
                createdAt: true,
            },
        });
        if (!company) {
            throw new common_1.NotFoundException();
        }
        return (0, _helpers_1.formatResponse)(_enums_1.HttpStatus.OK, company);
    }
    async create(data) {
        const hashedPassword = await bcrypt.hash(data.password, _constants_1.saltOrRounds);
        const newCompany = this.prisma.users.create({
            data: {
                roleId: _enums_1.UserRoles.COMPANY,
                password: hashedPassword,
                ...data,
            },
            select: {
                id: true,
                name: true,
                createdAt: true,
            },
        });
        return (0, _helpers_1.formatResponse)(_enums_1.HttpStatus.OK, newCompany);
    }
    update(id, updateCompanyDto) {
        return `This action updates a #${id} company`;
    }
    async remove(id) {
        const company = await this.prisma.users.findUnique({
            where: {
                id: id,
                deletedAt: {
                    equals: null,
                },
                roleId: _enums_1.UserRoles.COMPANY,
            },
        });
        if (!company) {
            throw new common_1.NotFoundException();
        }
        await this.prisma.users.update({
            where: {
                id: id,
                roleId: _enums_1.UserRoles.COMPANY,
                deletedAt: {
                    equals: null,
                },
            },
            data: {
                updatedAt: new Date(),
            },
        });
    }
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [_prisma_1.PrismaService])
], CompaniesService);
