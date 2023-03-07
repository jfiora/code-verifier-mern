import { BasicResponse } from '../types';
import { IUser } from '../../domain/interfaces/IUser.interface';
import { IKata } from 'src/domain/interfaces/IKata.interface';

export interface IUserController {
    getUsers(page: number, limit: number, id?: string): Promise<any>;
    getKatas(page: number, limit: number, id?: string): Promise<any>;
    deleteUserById(id?: string): Promise<any>;
    updateUser(id: string, user: any): Promise<any>;
}

export interface IAuthController {
    registerUser(user: IUser): Promise<any>;
    loginUser(auth: any): Promise<any>;
}

export interface IKataController {
    getKatas(page: number, limit: number, id?: string): Promise<any>;
    createKata(kata: IKata): Promise<any>;
    deleteKataById(id?: string): Promise<any>;
    updateKata(id: string, kata: IKata): Promise<any>;
}
