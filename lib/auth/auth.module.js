"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const _modules_1 = require("../modules");
const auth_controller_1 = require("./auth.controller");
const prisma_module_1 = require("../prisma/prisma.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [_modules_1.UsersModule, prisma_module_1.PrismaModule],
        providers: [auth_service_1.AuthService, _modules_1.UsersService],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
