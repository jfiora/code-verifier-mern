import { LogInfo } from '../utils/logger';
import express, { query, Request, Response } from 'express';
import { UserController } from '../controller/UsersController';

let usersRouter = express.Router();

usersRouter
    .route('/')
    .get(async (req: Request, res: Response) => {
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);

        const controller: UserController = new UserController();
        const response: any = await controller.getUsers(id);
        return res.send(response);
    })
    .delete(async (req: Request, res: Response) => {
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);

        const controller: UserController = new UserController();
        const response: any = await controller.deleteUserById(id);
        return res.send(response);
    })
    .post(async (req: Request, res: Response) => {
        let name: any = req?.query?.name;
        let email: any = req?.query?.email;
        let age: any = req?.query?.age;
        let user = {
            name: name,
            email: email,
            age: age,
        };

        const controller: UserController = new UserController();
        const response: any = await controller.createUser(user);
        return res.send(response);
    })
    .put(async (req: Request, res: Response) => {
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        let name: any = req?.query?.name;
        let email: any = req?.query?.email;
        let age: any = req?.query?.age;
        let user = {
            name: name,
            email: email,
            age: age,
        };

        const controller: UserController = new UserController();
        const response: any = await controller.updateUser(id, user);
        return res.send(response);
    });

export default usersRouter;
