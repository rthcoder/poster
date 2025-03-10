"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCodes = void 0;
var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes["UNAUTHORIZED"] = "UNAUTHORIZED";
    ErrorCodes["PERMISSION_DENIED"] = "PERMISSION_DENIED";
    ErrorCodes["RECORD_NOT_FOUND"] = "RECORD_NOT_FOUND";
    ErrorCodes["INVALID_INPUT"] = "INVALID_INPUT";
    ErrorCodes["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
    ErrorCodes["DATABASE_ERROR"] = "DATABASE_ERROR";
    ErrorCodes["ACCESS_TOKEN_NOT_VALID"] = "Access token not valid";
})(ErrorCodes || (exports.ErrorCodes = ErrorCodes = {}));
