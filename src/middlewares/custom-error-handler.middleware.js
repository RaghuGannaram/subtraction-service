import { getCurrentEnv, getErrorExposureDepth } from "../utils/env-info.js";
import logger from "../configs/logger.config.js";
import { errorExposureDepthCode } from "../constants/index.js";

const currentEnv = getCurrentEnv();
const errorExposureDepth = errorExposureDepthCode[getErrorExposureDepth()];

function customErrorHandler(error, req, res, next) {
    logger.error(`${req.method} ${req.originalUrl}: ${error.status} - ${error.message} - ${req.ip} \n%o`, error);

    const appError = formatError(error, 1);

    const { status, message, stack, ...rest } = appError;
    const response = {
        status: status ?? 500,
        message: error.message ?? "INTERNAL_SERVER_ERROR",
        ...rest,
    };

    if (currentEnv === "development" && stack) {
        response.stack = stack;
    }

    res.status(appError.status).json(response);
}

function formatError(error, depth) {
    const { cause, stack, ...rest } = error;

    let currentError;

    if (depth >= errorExposureDepth) {
        return { ...rest };
    }

    currentError = depth === 1 && stack ? { ...rest, stack: stack } : { ...rest };

    if (cause) {
        currentError.cause = cause instanceof Error ? formatError(cause, depth + 1) : cause;
    }

    return currentError;
}

export default customErrorHandler;
