"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const _prisma_1 = require("./prisma");
let App = class App {
};
exports.App = App;
exports.App = App = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [],
            }),
            auth_module_1.AuthModule,
            _prisma_1.PrismaModule,
        ],
        controllers: [],
        providers: [],
        exports: [],
    })
], App);
