"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchesModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const branches_service_1 = require("./branches.service");
const branches_controller_1 = require("./branches.controller");
let BranchesModule = class BranchesModule {
};
exports.BranchesModule = BranchesModule;
exports.BranchesModule = BranchesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [branches_controller_1.BranchesController],
        providers: [branches_service_1.BranchesService],
    })
], BranchesModule);
