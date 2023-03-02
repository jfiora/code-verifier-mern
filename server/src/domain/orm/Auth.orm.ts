import { IUser } from '../../domain/interfaces/IUser.interface';
import { IAuth } from '../../domain/interfaces/IAuth.interface';
import { userEntity } from '../entities/User.entity';
import { LogError } from '../../utils/logger';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();
const secretKey = process.env.SECRET_KEY || '';

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

        let userFound: IUser | undefined = undefined;
        let token = undefined;
        await userModel
            .findOne({ email: auth.email })
            .then((user: IUser) => {
                userFound = user;
            })
            .catch((err) => {
                LogError(`[ORM Error]: Couldn't find user: ${err}`);
                throw new Error(`[ORM Error]: Couldn't find user: ${err}`);
            });

        let validPassword = bcrypt.compareSync(
            auth.password,
            userFound!.password
        );
        if (!validPassword) {
            LogError(`[ORM Error]: Invalid password`);
            throw new Error(`[ORM Error]: Invalid password`);
        }
        token = jwt.sign({ email: userFound!.email }, secretKey, {
            expiresIn: 84600,
        });
        return {
            user: userFound,
            token,
        };
    } catch (error) {
        LogError(`[ORM Error]: Couldn't login user: ${error}`);
    }
};

export const logoutUser = async (): Promise<any | undefined> => {};
