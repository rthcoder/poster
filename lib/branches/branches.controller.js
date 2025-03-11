"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchesController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const branches_service_1 = require("./branches.service");
const create_branch_dto_1 = require("./dto/create-branch.dto");
const update_branch_dto_1 = require("./dto/update-branch.dto");
let BranchesController = class BranchesController {
    branchesService;
    constructor(branchesService) {
        this.branchesService = branchesService;
    }
    create(createBranchDto) {
        return this.branchesService.create(createBranchDto);
    }
    findAll() {
        return this.branchesService.findAll();
    }
    findOne(id) {
        return this.branchesService.findOne(+id);
    }
    update(id, updateBranchDto) {
        return this.branchesService.update(+id, updateBranchDto);
    }
    remove(id) {
        return this.branchesService.remove(+id);
    }
};
exports.BranchesController = BranchesController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [create_branch_dto_1.CreateBranchDto]),
    tslib_1.__metadata("design:returntype", void 0)
], BranchesController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], BranchesController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], BranchesController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, update_branch_dto_1.UpdateBranchDto]),
    tslib_1.__metadata("design:returntype", void 0)
], BranchesController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], BranchesController.prototype, "remove", null);
exports.BranchesController = BranchesController = tslib_1.__decorate([
    (0, common_1.Controller)('branches'),
    tslib_1.__metadata("design:paramtypes", [branches_service_1.BranchesService])
], BranchesController);
