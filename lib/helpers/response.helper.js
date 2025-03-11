"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResponse = formatResponse;
function formatResponse(status, data, pagination, count) {
    return { status, data, pagination, count };
}
