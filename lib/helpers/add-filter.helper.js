"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFilter = addFilter;
function addFilter(column, value, operator) {
    return {
        column,
        value,
        operator,
    };
}
