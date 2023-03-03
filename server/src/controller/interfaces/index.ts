import { BasicResponse } from '../types';
import { IUser } from '../../domain/interfaces/IUser.interface';

export interface IUserController {
    getUsers(page: number, limit: number, id?: string): Promise<any>;
    deleteUserById(id?: string): Promise<any>;
    updateUser(id: string, user: any): Promise<any>;
}

export interface IAuthController {
    registerUser(user: IUser): Promise<any>;
    loginUser(auth: any): Promise<any>;
}
