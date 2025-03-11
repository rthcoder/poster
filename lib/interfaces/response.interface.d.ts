import { Pagination } from '@interfaces';
export declare class ApiResponse<T> {
    status: number;
    data?: T;
    constructor(status: number, message: string, data?: T);
}
export interface Response<T> {
    status: number;
    data: T;
    count?: any;
    pagination?: Pagination;
}
export interface DeleteRequestResponse {
    status: number;
}
export interface CountResponse {
    int: number;
    string: string;
    count: number;
}
