import { LogInfo } from '../utils/logger';
import express, { query, Request, Response } from 'express';
import { UserController } from '../controller/UsersController';
import { AuthController } from '../controller/AuthController';
import { IUser } from '../domain/interfaces/IUser.interface';
import bcrypt from 'bcrypt';
import { IAuth } from '../domain/interfaces/IAuth.interface';

let authRouter = express.Router();

authRouter.route('/auth/register').post(async (req: Request, res: Response) => {
    let { name, email, age, password } = req.body;
    let hashedPassword: string = '';
    if (name && email && age && password) {
        hashedPassword = bcrypt.hashSync(password, 10);
        let newUser: IUser = {
            name: name,
            email: email,
            age: age,
            password: hashedPassword,
        };
        const controller: AuthController = new AuthController();
        const response: any = await controller.registerUser(newUser);

        return res.status(200).send(response);
    }
});

authRouter.route('/auth/login').post(async (req: Request, res: Response) => {
    let { email, password } = req.body;
    if (email && password) {
        let authentication: IAuth = {
            email: email,
            password: password,
        };
        const controller: AuthController = new AuthController();
        const response: any = await controller.loginUser(authentication);

        return res.status(200).send(response);
    }
});

export default authRouter;
