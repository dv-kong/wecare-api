"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    constructor(winston) {
        this.logger = winston.createLogger({
            format: winston.format.json(),
            transports: [
                //
                // - Write all logs with level `error` and below to `error.log`
                // - Write all logs with level `info` and below to `combined.log`
                //
                new winston.transports.File({ filename: 'src/logs/error.log', level: 'error' }),
                new winston.transports.File({ filename: 'src/logs/combined.log' }),
                new winston.transports.Console({
                    format: winston.format.combine(winston.format.colorize(), winston.format.simple())
                })
            ],
        });
        this.stream = {
            write: (msg) => this.logger.info(msg)
        };
    }
    log(status, err) {
        if (status < 500)
            this.logger.log('warn', err.stack);
        else {
            console.error(err);
            this.logger.log('error', err.stack);
        }
    }
}
exports.default = Logger;
// // const winston = require('winston');
// import winston from 'winston';
// const Logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   defaultMeta: { service: 'user-service' },
//   transports: [
//     //
//     // - Write all logs with level `error` and below to `error.log`
//     // - Write all logs with level `info` and below to `combined.log`
//     //
//     new winston.transports.File({ filename: 'error.log', level: 'error' }),
//     new winston.transports.File({ filename: 'combined.log' }),
//   ],
// });
// //
// // If we're not in production then log to the `console` with the format:
// // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// //
// if (process.env.NODE_ENV !== 'production') {
//   Logger.add(new winston.transports.Console({
//     format: winston.format.simple(),
//   }));
// }
// export default Logger;
