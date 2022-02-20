import cors from "cors";
import { Response, Request, NextFunction } from "express";



const enableCors = async (req: Response, res:Request, next:NextFunction) => {

    const corsOptions = {
        origin: 'http://localhost:3001',
        credentials: true, //access-control-allow-credentials:true
        optionSuccessStatus: 200
    }
    await cors(corsOptions);
    next();
}

export default enableCors;