"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let RegionsService = class RegionsService {
    create(createRegionDto) {
        return 'This action adds a new region';
    }
    findAll() {
        return `This action returns all regions`;
    }
    findOne(id) {
        return `This action returns a #${id} region`;
    }
    update(id, updateRegionDto) {
        return `This action updates a #${id} region`;
    }
    remove(id) {
        return `This action removes a #${id} region`;
    }
};
exports.RegionsService = RegionsService;
exports.RegionsService = RegionsService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], RegionsService);
