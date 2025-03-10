import type { JwtModel } from '@interfaces';
export declare const verifyJwt: (token: string, secret: string) => JwtModel | null;
export declare const signJwt: (payload: JwtModel, secret: string, exp: number) => string;
