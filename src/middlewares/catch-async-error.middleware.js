import { catchAsyncHttpError } from "../utils/application-errors.js";

export function catchAsyncError(routeHandler) {
    return function (req, res, next) {
        return Promise.resolve(catchAsyncHttpError(routeHandler)(req, res, next)).catch(next);
    };
}

export default catchAsyncError;
