"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompaniesController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const companies_service_1 = require("./companies.service");
const dto_1 = require("./dto");
let CompaniesController = class CompaniesController {
    companiesService;
    constructor(companiesService) {
        this.companiesService = companiesService;
    }
    findAll(query) {
        return this.companiesService.findAll(query);
    }
    findOne(id) {
        return this.companiesService.findOne(+id);
    }
    create(createCompanyDto) {
        return this.companiesService.create(createCompanyDto);
    }
    update(id, updateCompanyDto) {
        return this.companiesService.update(+id, updateCompanyDto);
    }
    remove(id) {
        return this.companiesService.remove(+id);
    }
};
exports.CompaniesController = CompaniesController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], CompaniesController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], CompaniesController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [dto_1.CreateCompanyDto]),
    tslib_1.__metadata("design:returntype", void 0)
], CompaniesController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, dto_1.UpdateCompanyDto]),
    tslib_1.__metadata("design:returntype", void 0)
], CompaniesController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], CompaniesController.prototype, "remove", null);
exports.CompaniesController = CompaniesController = tslib_1.__decorate([
    (0, common_1.Controller)('companies'),
    tslib_1.__metadata("design:paramtypes", [companies_service_1.CompaniesService])
], CompaniesController);
