import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import morganMiddleware from "./middlewares/morgan.middleware.js";
import customErrorHandler from "./middlewares/custom-error-handler.middleware.js";
import defaultMiddleware from "./middlewares/default.middleware.js";
import api_v1 from "./api/v1/index.js";
import { getAPIGatewayURL } from "./utils/env-info.js";
import logger from "./configs/logger.config.js";

const app = express();

const apiGatewayURL = getAPIGatewayURL();
const corsOptions = {
    origin: apiGatewayURL,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/health-check", (req, res) => {
    logger.info("Health check");
    res.status(200).json({ message: "OK" });
});

app.use("/api/v1", api_v1);

app.use(defaultMiddleware);
app.use(customErrorHandler);

export default app;
