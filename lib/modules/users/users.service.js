"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const _prisma_1 = require("../../prisma");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const users = await this.prisma.users.findMany();
        return users;
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
