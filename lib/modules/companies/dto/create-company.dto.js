"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCompanyDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateCompanyDto {
    name;
}
exports.CreateCompanyDto = CreateCompanyDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'имя не должно быть пустым!' }),
    (0, class_validator_1.IsString)({ message: 'должен иметь тип string!' }),
    (0, class_validator_1.Min)(3, { message: 'Минимальная длина должна быть 3!' }),
    (0, class_validator_1.Max)(15, { message: 'Максималная длина должна быть 15!' }),
    tslib_1.__metadata("design:type", String)
], CreateCompanyDto.prototype, "name", void 0);
