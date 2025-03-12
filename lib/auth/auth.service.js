"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = tslib_1.__importStar(require("bcrypt"));
const _modules_1 = require("../modules");
const _helpers_1 = require("../helpers");
const _constants_1 = require("../constants");
let AuthService = class AuthService {
    usersService;
    prisma;
    constructor(usersService, prisma) {
        this.usersService = usersService;
        this.prisma = prisma;
    }
    async login(data) {
        const user = await this.usersService.validate({ login: data.login });
        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const accessToken = (0, _helpers_1.signJwt)({
            id: user?.id,
            login: user?.login,
            role: user.role,
        }, _constants_1.jwtConstants.accessSecret, 60 * 60 * 24 * 15);
        return {
            accessToken,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [_modules_1.UsersService,
        prisma_service_1.PrismaService])
], AuthService);
