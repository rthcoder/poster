"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionsController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const regions_service_1 = require("./regions.service");
const create_region_dto_1 = require("./dto/create-region.dto");
let RegionsController = class RegionsController {
    regionsService;
    constructor(regionsService) {
        this.regionsService = regionsService;
    }
    create(createRegionDto) {
        return this.regionsService.create(createRegionDto);
    }
    findAll(query) {
        return this.regionsService.findAll(query);
    }
    findOne(id) {
        return this.regionsService.findOne(+id);
    }
    update(id, updateRegionDto) {
        return this.regionsService.update(+id, updateRegionDto);
    }
    remove(id) {
        return this.regionsService.remove(+id);
    }
};
exports.RegionsController = RegionsController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [create_region_dto_1.CreateRegionDto]),
    tslib_1.__metadata("design:returntype", void 0)
], RegionsController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RegionsController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], RegionsController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RegionsController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], RegionsController.prototype, "remove", null);
exports.RegionsController = RegionsController = tslib_1.__decorate([
    (0, common_1.Controller)('regions'),
    tslib_1.__metadata("design:paramtypes", [regions_service_1.RegionsService])
], RegionsController);
