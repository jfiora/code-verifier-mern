import { BasicResponse } from '../types';
import { IUser } from '../../domain/interfaces/IUser.interface';

export interface IHelloController {
    getMessage(name?: string): Promise<BasicResponse>;
}

export interface IUserController {
    getUsers(id?: string): Promise<any>;
    deleteUserById(id?: string): Promise<any>;
    createUser(user: any): Promise<any>;
    updateUser(id: string, user: any): Promise<any>;
}

export interface IAuthController {
    registerUser(user: IUser): Promise<any>;
    loginUser(auth: any): Promise<any>;
}
