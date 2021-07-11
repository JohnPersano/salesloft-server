import express, { Request, Response } from "express";

import { logger } from "./logger";
import people from "./routes/people";
import { loggingMiddleware } from "./middlewares/logging_middleware";

const app = express();

// Express middlewares
app.use(loggingMiddleware());

// Express routers
app.use("/people", people);

// Catch all GET route to return 404s
app.get("/*", (request: Request, response: Response) => response.sendStatus(404));

const port = process.env.PORT ?? 5000;
app.listen(port, () => logger.info(`Server is running on port ${ port }`));
