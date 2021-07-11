import { createLogger, format, transports } from "winston";

// Standard log format for the app
const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ level, message, timestamp }) => {
        return `${timestamp} ${level}: ${message}`;
    })
);

export const logger = createLogger({
    level: 'info',
    format:  logFormat,
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }),
        new transports.Console({ format: format.combine(format.colorize(), logFormat)})
    ]
});
