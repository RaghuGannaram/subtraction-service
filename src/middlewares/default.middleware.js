import { HttpError, HttpErrors } from "../utils/application-errors.js";

const defaultMiddleware = (req, res, next) => {
    const error = new HttpError(404, HttpErrors.NOT_FOUND, `cannot ${req.method} ${req.originalUrl}`);
    next(error);
};

export default defaultMiddleware;
