import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import router from "../routes";

const server:Express = express();

server.use(
    '/api',
    router
);


server.use(helmet());
server.use(cors());

server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({limit: "50mb"}));


server.get('/', (req: Request, res: Response) => {
    res.redirect('/api');
});

export default server;