export const DataErrors = {
    UNKNOWN_DATA_ERROR: "UNKNOWN_DATA_ERROR",
};

export const BusinessErrors = {
    VALIDATION_FAILURE: "VALIDATION_FAILURE",
    OTHER_DATA_ERROR: "OTHER_DATA_ERROR",
    UNKNOWN_BUSINESS_ERROR: "UNKNOWN_BUSINESS_ERROR",
};

export const HttpErrors = {
    BAD_REQUEST: "BAD_REQUEST",
    UNAUTHORIZED: "UNAUTHORIZED",
    FORBIDDEN: "FORBIDDEN",
    NOT_FOUND: "NOT_FOUND",
    METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED",
    REQUEST_TIMEOUT: "REQUEST_TIMEOUT",
    CONFLICT: "CONFLICT",
    TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
    NOT_IMPLEMENTED: "NOT_IMPLEMENTED",
    BAD_GATEWAY: "BAD_GATEWAY",
    SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
    GATEWAY_TIMEOUT: "GATEWAY_TIMEOUT",
};

export const HttpErrorCode = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
};

export const BusinessErrorMap = {
    [DataErrors.UNKNOWN_DATA_ERROR]: BusinessErrors.OTHER_DATA_ERROR,
};

export const HttpErrorMap = {
    [BusinessErrors.VALIDATION_FAILURE]: HttpErrors.BAD_REQUEST,
    [BusinessErrors.OTHER_DATA_ERROR]: HttpErrors.INTERNAL_SERVER_ERROR,
    [BusinessErrors.UNKNOWN_BUSINESS_ERROR]: HttpErrors.INTERNAL_SERVER_ERROR,
};

export class DataError extends Error {
    type;
    cause;

    constructor(type, cause) {
        super(type);
        this.name = this.constructor.name;
        this.type = type;
        this.cause = cause;
    }
}

export class BusinessError extends Error {
    type;
    cause;

    constructor(type, cause) {
        super(type);
        this.name = this.constructor.name;
        this.type = type;
        this.cause = cause;
    }
}

export class HttpError extends Error {
    status;
    type;
    cause;

    constructor(statusCode, type, cause) {
        super(type);
        this.name = this.constructor.name;
        this.status = statusCode;
        this.type = type;
        this.cause = cause;
    }
}

export function throwDataError(error) {
    if (error instanceof DataError) {
        throw error;
    } else {
        throw new DataError(DataErrors.UNKNOWN_DATA_ERROR, error);
    }
}

export function throwBusinessError(error) {
    if (error instanceof BusinessError) {
        throw error;
    } else if (error instanceof DataError) {
        throw new BusinessError(BusinessErrorMap[error.type] ?? BusinessErrors.OTHER_DATA_ERROR, error);
    } else {
        throw new BusinessError(BusinessErrors.UNKNOWN_BUSINESS_ERROR, error);
    }
}

export function throwHttpError(error) {
    if (error instanceof HttpError) {
        throw error;
    } else if (error instanceof BusinessError) {
        throw new HttpError(HttpErrorCode[HttpErrorMap[error.type]], HttpErrorMap[error.type], error);
    } else if (error instanceof DataError) {
        throw new HttpError(
            HttpErrorCode[HttpErrorMap[BusinessErrorMap[error.type]]],
            HttpErrorMap[BusinessErrorMap[error.type]],
            error
        );
    } else {
        throw new HttpError(500, HttpErrors.INTERNAL_SERVER_ERROR, error);
    }
}

export const catchAsyncDataError = function (fn) {
    return async (...args) => {
        try {
            return await fn(...args);
        } catch (error) {
            throwDataError(error);
        }
    };
};

export const catchAsyncBusinessError = function (fn) {
    return async (...args) => {
        try {
            return await fn(...args);
        } catch (error) {
            throwBusinessError(error);
        }
    };
};

export const catchAsyncHttpError = function (fn) {
    return async (...args) => {
        try {
            return await fn(...args);
        } catch (error) {
            throwHttpError(error);
        }
    };
};
