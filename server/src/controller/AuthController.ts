import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa';
import { IAuthController } from './interfaces';
import { LogSuccess, LogError } from '../utils/logger';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '../domain/interfaces/IAuth.interface';

import { registerUser, loginUser, logoutUser } from '../domain/orm/Auth.orm';
import { AuthResponse } from './types';
import { getUserById } from '../domain/orm/User.orm';

@Route('/api/users')
@Tags('AuthController')
export class AuthController implements IAuthController {
    @Post('/register')
    public async registerUser(user: IUser): Promise<any> {
        let response: any = '';
        if (user) {
            LogSuccess('[/api/auth/register] Register user');
            await registerUser(user).then(() => {
                LogSuccess(`[/api/auth/register] Registering User: ${user}`);
                response = {
                    message: `User registered successfully: ${user.name}`,
                };
            });
        } else {
            LogError('[/api/auth/register] Register needs a User');
            response = {
                message: 'Invalid User',
            };
        }
        return response;
    }
    @Post('/login')
    public async loginUser(auth: IAuth): Promise<any> {
        let response: AuthResponse | undefined;
        if (auth) {
            LogSuccess(`[/api/auth/login] Log in User: ${auth.email}`);
            let data = await loginUser(auth);
            response = {
                message: `Welcome, ${data.user.name}!`,
                token: data.token,
            };
        } else {
            LogError('[/api/auth/login] Login needs a proper auth');
            response = {
                message: 'Invalid Auth',
                token: 'INVALID',
            };
        }
        return response;
    }
    @Post('/logout')
    public async logoutUser(): Promise<any> {
        let response: any = '';
        return response;
    }
    @Get('/me')
    public async userData(@Query() id: string): Promise<any> {
        let response: any = {};
        if (id) {
            LogSuccess(`[/api/auth/me/:id] Get User data by ID: ${id}`);
            response = await getUserById(id);
        }
        return response;
    }
}
