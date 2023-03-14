import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import router from '../routes';
import SwaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';

const server: Express = express();
server.use(cors());
dotenv.config();

// Swagger
server.use(
    '/docs',
    SwaggerUi.serve,
    SwaggerUi.setup(undefined, {
        swaggerOptions: {
            url: '/swagger.json',
            explorer: true,
        },
    })
);

server.use('/api', router);

server.use(express.static('public'));

const mongodbConnection: string = process.env.MONGO_DB || '';
mongoose.connect('mongodb://127.0.0.1:27017/codeverification');

server.use(helmet());
server.use(cors());

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));

server.get('/', (req: Request, res: Response) => {
    res.redirect('/api');
});

export default server;
