import { IUser } from '../../domain/interfaces/IUser.interface';
import { IAuth } from '../../domain/interfaces/IAuth.interface';
import { userEntity } from '../entities/User.entity';
import { LogError } from '../../utils/logger';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (user: IUser): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        return await userModel.create(user);
    } catch (error) {
        LogError(`[ORM Error]: Couldn't register user: ${error}`);
    }
};

export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        return await userModel.findOne(
            { email: auth.email },
            (err: any, user: IUser) => {
                if (err) {
                    LogError(`[ORM Error]: Couldn't search user: ${err}`);
                }
                if (!user) {
                    LogError(`[ORM Error]: Couldn't find user: ${err}`);
                }
                let validPassword = bcrypt.compareSync(
                    auth.password,
                    user.password
                );

                if (!validPassword) {
                    LogError(
                        `[ORM Error]: Couldn't validate user: ${auth.email}`
                    );
                }

                let token = jwt.sign({ email: user.email }, 'SECRET', {
                    expiresIn: 86400,
                });

                return token;
            }
        );
    } catch (error) {
        LogError(`[ORM Error]: Couldn't login user: ${error}`);
    }
};

export const logoutUser = async (): Promise<any | undefined> => {};
