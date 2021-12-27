import morgan from 'morgan'; 
import express from 'express';
import cookieParser from 'cookie-parser';
import winston from 'winston';
import cors from 'cors';



/**
 * @object Middlewares contains: 
 * - Cookie Parser: Parse Cookie header and populate req.cookies with an object keyed by the cookie names. 
 * - ApiLogger (morgan): Logs all requests to the console
 * - Json body parser: Parse the body request to JSON format
 * - Winston
 */
const middlewares = { // server.use(middleware)
     json: express.json(),
     urlencoded: express.urlencoded({extended: false}),
     cookie: cookieParser(),
     cors: cors({
          origin: 'http://localhost:3001',
          credentials: true, //access-control-allow-credentials:true
          optionSuccessStatus: 200
        }),
     apiLogger: morgan('dev')
}

export default middlewares;