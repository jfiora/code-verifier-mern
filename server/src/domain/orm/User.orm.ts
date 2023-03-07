import { userEntity } from '../entities/User.entity';

import { LogSuccess, LogError } from '../../utils/logger';
import { IUser } from '../interfaces/IUser.interface';
import { UserResponse } from '../types/UsersResponse.type';
import { kataEntity } from '../entities/Kata.entity';
import { IKata } from '../interfaces/IKata.interface';
import mongoose from 'mongoose';

/**
 * Method to obtain all Users from Collection Users
 */
export const getAllUsers = async (
    page: number,
    limit: number
): Promise<UserResponse | undefined> => {
    try {
        let userModel = userEntity();

        let response: UserResponse = {
            users: [],
            totalPages: 1,
            currentPage: page,
        };
        await userModel
            .find({ isDeleted: false })
            .select('name email age')
            .limit(limit)
            .skip((page - 1) * limit)
            .exec()
            .then((users: IUser[]) => {
                response.users = users;
            });

        await userModel.countDocuments().then((total: number) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });

        return response;
    } catch (error) {
        LogError(`[ORM Error]: Getting All Users: ${error}`);
    }
};

export const getUserById = async (id: string): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        return await userModel.findById(id).select('name email age');
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

export const updateUser = async (id: string, user: any) => {
    try {
        let userModel = userEntity();
        return await userModel.findByIdAndUpdate(id, user);
    } catch (error) {
        LogError(`[ORM Error]: Couldn't update user ${id}: ${error}`);
    }
};

export const getKatasFromUser = async (
    page: number,
    limit: number,
    id: string
): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity();
        let katasModel = kataEntity();
        let katasFound: IKata[] = [];
        let response: any = {};

        await userModel
            .findById(id)
            .then(async (user: IUser) => {
                response.user = user.email;

                let objectIds: mongoose.Types.ObjectId[] = [];

                user.katas.forEach((kataId: string) => {
                    let objectId = new mongoose.Types.ObjectId(kataId);
                    objectIds.push(objectId);
                });

                await katasModel
                    .find({ _id: { $in: user.katas } })
                    .then((katas: IKata[]) => {
                        katasFound = katas;
                    });
            })
            .catch((error) => {
                LogError(`[ORM Error]: Getting User: ${error}`);
            });
        response.katas = katasFound;

        return response;
    } catch (error) {
        LogError(`[ORM Error]: Getting All Katas from User: ${error}`);
    }
};
