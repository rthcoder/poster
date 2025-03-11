import { Response, Pagination, CountResponse } from '@interfaces';
export declare function formatResponse<T>(status: number, data: T, pagination?: Pagination, count?: CountResponse[]): Response<T>;
