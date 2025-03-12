"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRegionDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateRegionDto {
    name;
}
exports.CreateRegionDto = CreateRegionDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateRegionDto.prototype, "name", void 0);
