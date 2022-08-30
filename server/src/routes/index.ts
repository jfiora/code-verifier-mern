import express, { Request, Response } from "express";
import helloRouter from "./HelloRouter";

let server = express();
let rootRouter = express.Router();

rootRouter.get('/', (req: Request, res: Response) => {
    res.send('Hello');
});

server.use('/', rootRouter);
server.use('/hello', helloRouter);

export default server;