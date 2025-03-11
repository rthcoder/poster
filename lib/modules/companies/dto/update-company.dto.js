"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCompanyDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class UpdateCompanyDto {
    name;
}
exports.UpdateCompanyDto = UpdateCompanyDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'должен иметь тип string!' }),
    (0, class_validator_1.Min)(3, { message: 'Минимальная длина должна быть 3!' }),
    (0, class_validator_1.Max)(15, { message: 'Максималная длина должна быть 15!' }),
    tslib_1.__metadata("design:type", String)
], UpdateCompanyDto.prototype, "name", void 0);
