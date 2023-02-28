import { userEntity } from '../entities/User.entity';

import { LogSuccess, LogError } from '../../utils/logger';
import { IUser } from '../interfaces/IUser.interface';

/**
 * Method to obtain all Users from Collection Users
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity();
        return await userModel.find();
    } catch (error) {
        LogError(`[ORM Error]: Getting All Users: ${error}`);
    }
};

export const getUserById = async (id: string): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        return await userModel.findById(id);
    } catch (error) {
        LogError(`[ORM Error]: Getting User by ID: ${error}`);
    }
};

export const deleteUserById = async (id: string): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        return await userModel.deleteOne({ _id: id });
    } catch (error) {
        LogError(`[ORM Error]: Deleting User by ID: ${error}`);
    }
};

export const createUser = async (user: any): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        return await userModel.create(user);
    } catch (error) {
        LogError(`[ORM Error]: Couldn't create user: ${error}`);
    }
};

export const updateUser = async (id: string, user: any) => {
    try {
        let userModel = userEntity();
        return await userModel.findByIdAndUpdate(id, user);
    } catch (error) {
        LogError(`[ORM Error]: Couldn't update user ${id}: ${error}`);
    }
};

export const registerUser = async (user: IUser): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        return await userModel.create(user);
    } catch (error) {
        LogError(`[ORM Error]: Couldn't create user: ${error}`);
    }
};
