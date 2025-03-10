"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const _enums_1 = require("../enums");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login-dto");
let AuthController = class AuthController {
    service;
    constructor(service) {
        this.service = service;
    }
    async login(body) {
        return await this.service.login(body);
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate([
    (0, common_1.Post)('login'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [login_dto_1.LoginDtoRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)({
        version: _enums_1.ApiVersion.version,
        path: 'auth',
    }),
    tslib_1.__metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
