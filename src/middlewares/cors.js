import cors from "cors";


const enableCors = async (req, res, next) => {

    const corsOptions = {
        origin: 'http://localhost:3001',
        credentials: true, //access-control-allow-credentials:true
        optionSuccessStatus: 200
    }
    await cors(corsOptions);
    next();
}

export default enableCors;