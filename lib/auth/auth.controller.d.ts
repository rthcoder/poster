import { AuthService } from './auth.service';
import { LoginDtoRequest } from './dto/login-dto';
import { LoginResponse } from '@interfaces';
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    login(body: LoginDtoRequest): Promise<LoginResponse>;
}
