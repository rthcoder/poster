"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionsModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const regions_service_1 = require("./regions.service");
const regions_controller_1 = require("./regions.controller");
let RegionsModule = class RegionsModule {
};
exports.RegionsModule = RegionsModule;
exports.RegionsModule = RegionsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [regions_controller_1.RegionsController],
        providers: [regions_service_1.RegionsService],
    })
], RegionsModule);
