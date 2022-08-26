import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app:Express = express();
const port: string | number = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('api working in port: ', port);
});

app.get('./', (req: Request, res: Response) => {
    console.log('first endpoint in port ', port);
})