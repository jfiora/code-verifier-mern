import express, { Request, Response } from 'express';
import usersRouter from './UserRouter';
import authRouter from './AuthRouter';

let server = express();
let rootRouter = express.Router();

rootRouter.get('/', (req: Request, res: Response) => {
    res.send('Api working :)');
});

server.use('/', rootRouter); // -> /api/
server.use('/users', usersRouter); // -> /api/users
server.use('/auth', authRouter); // -> /api/auth/

export default server;
