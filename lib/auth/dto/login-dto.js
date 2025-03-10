"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDtoRequest = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class LoginDtoRequest {
    login;
    password;
}
exports.LoginDtoRequest = LoginDtoRequest;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], LoginDtoRequest.prototype, "login", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], LoginDtoRequest.prototype, "password", void 0);
