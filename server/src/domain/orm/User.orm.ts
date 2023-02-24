import { userEntity } from '@domain/entities/User.entity';

import { LogSuccess, LogError } from '@utils/logger';

/**
 * Method to obtain all Users from Collection Users
 */
export const GetAllUsers = async (): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity();
        return await userModel.find({
            isDelete: false,
        });
    } catch (error) {
        LogError(`[ORM Error]: Getting All Users: ${error}`);
    }
};
