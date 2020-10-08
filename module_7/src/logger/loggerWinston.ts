import winston from 'winston';

export const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' })
    ]
});
