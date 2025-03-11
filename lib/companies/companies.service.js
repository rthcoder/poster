"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompaniesService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let CompaniesService = class CompaniesService {
    create(createCompanyDto) {
        return 'This action adds a new company';
    }
    findAll() {
        return `This action returns all companies`;
    }
    findOne(id) {
        return `This action returns a #${id} company`;
    }
    update(id, updateCompanyDto) {
        return `This action updates a #${id} company`;
    }
    remove(id) {
        return `This action removes a #${id} company`;
    }
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], CompaniesService);
