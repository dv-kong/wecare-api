// middlewares dépendencies
import express from 'express';
import { jwtService } from '../libs';
import cookieParser from 'cookie-parser';
import winston from 'winston';
import Logger from '../helpers/logger';
import morgan from 'morgan';
import csurf from 'csurf';
import cors from 'cors';
import helmet from "helmet";

// middlewares
import AuthMiddleware from './auth';

// initialize middlewares with dependencies injection
const auth = new AuthMiddleware(jwtService);
const logger = new Logger(winston);
const csrf = csurf({ cookie: true });
// const corsOptions = { origin: "https://localhost:3000", credentials: true };
const corsOptions = { origin: "vincentkong.net", credentials: true };

// export all custom middlewares
export { auth, logger, csrf };

//export default api middlewares
export default {
    urlencoded: express.urlencoded({ extended: false }),
    json: express.json(),
    cookieParser: cookieParser(),
    apiLogger: morgan('combined', { stream: logger.stream }),
    cors: cors(corsOptions),
    csrf,
    helmet: helmet()
}