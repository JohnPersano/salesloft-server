import express, { Request, Response } from "express";

import { logger } from "../logger";
import salesloft from "../clients/salesloft";


const router = express.Router()

/**
 * GET people from SalesLoft and forward the response back to the client.
 */
router.get('/', async (request: Request, response: Response) => {

    try {

        const { data: responseData } = await salesloft.get("https://api.salesloft.com/v2/people.json");

        const people = responseData.data;

        // Perform a rudimentary check for data integrity/format before sending it back to the client
        if (people && Array.isArray(people)) {

            logger.info(`SalesLoft API returned ${people.length} people`);

            return response.send(responseData.data);

        }

        logger.warn(`API returned unexpected data type '${typeof people}' (expected array)`);

        // Lazy fallback response for unexpected output, need to discuss with team whose responsibility API stability is
        return response.sendStatus(500);

    } catch (error) {

        const apiResponse = error?.response;

        // May want to respond differently to the client depending on the type of error
        if (apiResponse) {

            logger.error(`SalesLoft API returned ${apiResponse.status}`);

        } else {

            logger.error(`${error.message}`);

        }

    }

    // May want to be more intelligent about error handling here
    return response.sendStatus(500);

})

export default router;
