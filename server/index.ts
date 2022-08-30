import dotenv from "dotenv";
import server from "./src/server/index";
import { LogError, LogSuccess } from "./src/utils/logger";

dotenv.config();

const port: string | number = process.env.PORT || 8000;

server.listen(port, () => {
    LogSuccess(`[Server On: running in port ${port}]`);
});

server.on('error', (error: any) => {
    LogError(`[Server Error]: ${error}`);
});