import { LogInfo } from '../utils/logger';
import express, { query, Request, Response } from 'express';
import { UserController } from '../controller/UsersController';
import { IUser } from '../domain/interfaces/IUser.interface';
import bodyParser = require('body-parser');
import { verifyToken } from '../middlewares/verifyToken.middleware';

let jsonParser = bodyParser.json();
let usersRouter = express.Router();

usersRouter
    .route('/')
    .get(verifyToken, async (req: Request, res: Response) => {
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        let page: any = req?.query?.page || 1;
        let limit: any = req?.query?.limit || 10;

        const controller: UserController = new UserController();
        const response: any = await controller.getUsers(page, limit, id);
        return res.status(200).send(response);
    })
    .delete(verifyToken, async (req: Request, res: Response) => {
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);

        const controller: UserController = new UserController();
        const response: any = await controller.deleteUserById(id);
        return res.status(204).send(response);
    })
    .put(jsonParser, verifyToken, async (req: Request, res: Response) => {
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        let name: any = req?.body?.name;
        let email: any = req?.body?.email;
        let age: any = req?.body?.age;
        let user = {
            name: name,
            email: email,
            age: age,
        };

        const controller: UserController = new UserController();
        const response: any = await controller.updateUser(id, user);
        return res.status(204).send(response);
    });

usersRouter
    .route('/katas')
    .get(verifyToken, async (req: Request, res: Response) => {
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        let page: any = req?.query?.page || 1;
        let limit: any = req?.query?.limit || 10;

        const controller: UserController = new UserController();
        const response: any = await controller.getKatas(page, limit, id);
        return res.status(200).send(response);
    });

export default usersRouter;
