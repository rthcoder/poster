"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRegionDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class UpdateRegionDto {
    name;
}
exports.UpdateRegionDto = UpdateRegionDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateRegionDto.prototype, "name", void 0);
