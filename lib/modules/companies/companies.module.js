"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompaniesModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const companies_service_1 = require("./companies.service");
const companies_controller_1 = require("./companies.controller");
const _prisma_1 = require("../../prisma");
let CompaniesModule = class CompaniesModule {
};
exports.CompaniesModule = CompaniesModule;
exports.CompaniesModule = CompaniesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [companies_controller_1.CompaniesController],
        providers: [companies_service_1.CompaniesService],
        imports: [_prisma_1.PrismaModule],
    })
], CompaniesModule);
