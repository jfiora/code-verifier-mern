import express, { Request, Response } from 'express';
import helloRouter from './HelloRouter';
import usersRouter from './UserRouter';
import authRouter from './AuthRouter';

let server = express();
let rootRouter = express.Router();

rootRouter.get('/', (req: Request, res: Response) => {
    res.send('Hello');
});

server.use('/', rootRouter); // -> /api/
server.use('/hello', helloRouter); // -> /api/hello
server.use('/users', usersRouter); // -> /api/users
server.use('/auth', authRouter); // -> /api/auth/

export default server;
