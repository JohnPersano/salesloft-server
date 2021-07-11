import axios from "axios";
import { logger } from "../logger";


const SALESLOFT_API_KEY = process.env.SALESLOFT_API_KEY;

// Simple check for API environment variable, production would most likely arbitrate keys between environments
if (!SALESLOFT_API_KEY) {

    logger.warn("SalesLoft API key not found, please ensure the SALESLOFT_API_KEY environment variable is set.");

}

// All calls to SalesLoft will use bearer auth and only accept json
const defaultOptions = {
    headers: {
        "Authorization": `Bearer ${ SALESLOFT_API_KEY }`,
        "Accept": "application/json"
    },
};

export default axios.create(defaultOptions);
