"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJwt = exports.verifyJwt = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const verifyJwt = (token, secret) => {
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, secret);
        console.log('verifyJwt', decoded);
        if (!decoded) {
            return null;
        }
        return decoded.data;
    }
    catch (err) {
        if (err) {
            if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                throw new common_1.UnauthorizedException('JWT token has expired');
            }
            throw new common_1.UnauthorizedException('Invalid JWT token');
        }
    }
};
exports.verifyJwt = verifyJwt;
const signJwt = (payload, secret, exp) => (0, jsonwebtoken_1.sign)({ data: payload }, secret, { expiresIn: exp });
exports.signJwt = signJwt;
