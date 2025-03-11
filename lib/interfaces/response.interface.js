"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    status;
    data;
    constructor(status, message, data) {
        this.status = status;
        this.data = data;
    }
}
exports.ApiResponse = ApiResponse;
