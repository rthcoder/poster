"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const tslib_1 = require("tslib");
const _enums_1 = require("../../enums");
const _helpers_1 = require("../../helpers");
const common_1 = require("@nestjs/common");
const _prisma_1 = require("../../prisma");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { limit = _enums_1.Pagination.LIMIT, page = _enums_1.Pagination.PAGE, sort, filters } = query;
        const parsedSort = sort ? JSON?.parse(sort) : {};
        const parsedFilters = filters ? JSON?.parse(filters) : [];
        parsedFilters.push((0, _helpers_1.addFilter)('roleId', _enums_1.UserRoles.SUPER_ADMIN, 'equal'));
        parsedFilters.push((0, _helpers_1.addFilter)('roleId', _enums_1.UserRoles.KASSA, 'equal'));
        parsedFilters.push((0, _helpers_1.addFilter)('roleId', _enums_1.UserRoles.MANAGER, 'equal'));
        const users = await _helpers_1.FilterService?.applyFilters('users', parsedFilters, parsedSort, Number(limit), Number(page), [
            'company',
            'branch',
        ]);
        const count = await _helpers_1.FilterService.countRecords('users', parsedFilters);
        const pagination = (0, _helpers_1.paginationResponse)(count, limit, page);
        return (0, _helpers_1.formatResponse)(_enums_1.HttpStatus.OK, users, pagination);
    }
    async remove(id) {
        const existingUser = await this.prisma.users.findUnique({
            where: {
                id: id,
                deletedAt: {
                    equals: null,
                },
            },
        });
        if (!existingUser) {
            throw new common_1.NotFoundException('Пользователь не найден!');
        }
        await this.prisma.users.update({
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
    async validate(data) {
        const user = await this.prisma.users.findFirst({
            where: {
                login: data.login,
                deletedAt: {
                    equals: null,
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('Пользователь не существует!');
        }
        return {
            id: user?.id,
            login: user?.login,
            password: user?.password,
            role: user.roleId,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [_prisma_1.PrismaService])
], UsersService);
