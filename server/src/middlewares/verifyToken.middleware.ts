import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRET_KEY || '';

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let token: any = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({
            authentication: 'Missing JWT',
            message: 'Not authorized.',
        });
    }

    jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err) {
            return res.status(500).send({
                authentication: 'Invalid JWT',
                message: 'Not authorized',
            });
        }

        next();
    });
};
