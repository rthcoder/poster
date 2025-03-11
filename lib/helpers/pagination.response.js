"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationResponse = paginationResponse;
function paginationResponse(totalCount, limit, page) {
    const totalPages = Math.ceil(totalCount / limit);
    return {
        totalCount,
        totalPages,
        currentPage: Number(page),
        limit: Number(limit),
    };
}
