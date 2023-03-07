import express, { Request, Response } from 'express';
import usersRouter from './UserRouter';
import authRouter from './AuthRouter';
import katasRouter from './KataRouter';

let server = express();
let rootRouter = express.Router();

rootRouter.get('/', (req: Request, res: Response) => {
    res.send('Api working :)');
});

server.use('/', rootRouter); // -> /api/
server.use('/users', usersRouter); // -> /api/users
server.use('/auth', authRouter); // -> /api/auth/
server.use('/katas', katasRouter); // -> /api/katas

export default server;
