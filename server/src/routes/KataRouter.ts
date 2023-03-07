import { LogInfo } from '../utils/logger';
import express, { query, Request, Response } from 'express';
import { KatasController } from '../controller/KatasController';
import { IKata, KataLevel } from '../domain/interfaces/IKata.interface';
import bodyParser = require('body-parser');
import { verifyToken } from '../middlewares/verifyToken.middleware';

let jsonParser = bodyParser.json();
let katasRouter = express.Router();

katasRouter
    .route('/')
    .get(verifyToken, async (req: Request, res: Response) => {
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        let page: any = req?.query?.page || 1;
        let limit: any = req?.query?.limit || 10;

        const controller: KatasController = new KatasController();
        const response: any = await controller.getKatas(page, limit, id);
        return res.status(200).send(response);
    })
    .delete(verifyToken, async (req: Request, res: Response) => {
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);

        const controller: KatasController = new KatasController();
        const response: any = await controller.deleteKataById(id);
        return res.status(204).send(response);
    })
    .put(jsonParser, verifyToken, async (req: Request, res: Response) => {
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        let name: string = req?.body?.name || '';
        let description: string = req?.body?.description || '';
        let level: KataLevel = req?.body?.level || KataLevel.BASIC;
        let attempts: number = req?.body?.attempts || 0;
        let stars: number = req?.body?.stars || 0;
        let creator: string = req?.body?.creator;
        let solution: string = req?.body?.solution || '';
        let participants: string[] = req?.body?.participants || [];

        if (!creator) {
            return res.status(400).send({
                message: '[ERROR Updating Kata] Creator is required',
            });
        }

        let kata: IKata = {
            name,
            description,
            level,
            attempts,
            stars,
            creator,
            solution,
            participants,
        };

        const controller: KatasController = new KatasController();
        const response: any = await controller.updateKata(id, kata);
        return res.status(204).send(response);
    })
    .post(jsonParser, verifyToken, async (req: Request, res: Response) => {
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        let name: string = req?.body?.name || '';
        let description: string = req?.body?.description || '';
        let level: KataLevel = req?.body?.level || KataLevel.BASIC;
        let attempts: number = req?.body?.attempts || 0;
        let stars: number = req?.body?.stars || 0;
        let creator: string = req?.body?.creator;
        let solution: string = req?.body?.solution || '';
        let participants: string[] = req?.body?.participants || [];

        if (!creator) {
            return res.status(400).send({
                message: '[ERROR Updating Kata] Creator is required',
            });
        }

        let kata: IKata = {
            name,
            description,
            level,
            attempts,
            stars,
            creator,
            solution,
            participants,
        };

        const controller: KatasController = new KatasController();
        const response: any = await controller.createKata(kata);
        return res.status(201).send(response);
    });

export default katasRouter;
