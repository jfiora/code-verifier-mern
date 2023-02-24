import { BasicResponse } from '@controller/types';
import express, { Request, Response } from 'express';
import { HelloController } from '../controller/HelloController';
import { LogInfo } from '../utils/logger';

let helloRouter = express.Router();

helloRouter.route('/').get(async (req: Request, res: Response) => {
    let name: any = req?.query?.name;
    LogInfo(`query param: ${name}`);
    const controller: HelloController = new HelloController();
    const response: BasicResponse = await controller.getMessage(name);
    return res.send(response);
});

export default helloRouter;
