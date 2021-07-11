import { NextFunction, Request, Response } from "express";

import { logger } from "../logger";

/**
 * Logging middleware that logs out each request and response for the entire applciation.
 *
 * @returns {(request: e.Request, response: e.Response, next: e.NextFunction) => void}
 */
export function loggingMiddleware() {

    return (request: Request, response: Response, next: NextFunction) => {

        // Immediately log the incoming request method and path
        logger.info(`Started ${request.method} request on ${request.url}`);

        // When the response is sent, log the status
        response.on("finish", () => {
            logger.info(
                `Finished with status ${response.statusCode}`
            );
        })

        // Move on to the next middleware
        next();

    }

}
