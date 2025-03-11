"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchesService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let BranchesService = class BranchesService {
    create(createBranchDto) {
        return 'This action adds a new branch';
    }
    findAll() {
        return `This action returns all branches`;
    }
    findOne(id) {
        return `This action returns a #${id} branch`;
    }
    update(id, updateBranchDto) {
        return `This action updates a #${id} branch`;
    }
    remove(id) {
        return `This action removes a #${id} branch`;
    }
};
exports.BranchesService = BranchesService;
exports.BranchesService = BranchesService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], BranchesService);
