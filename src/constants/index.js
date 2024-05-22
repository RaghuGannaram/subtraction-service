export const LogLevel = {
    ERROR: "error",
    WARN: "warn",
    INFO: "info",
    HTTP: "http",
    VERBOSE: "verbose",
    DEBUG: "debug",
    SILLY: "silly",
};

export const colorCode = {
    [LogLevel.ERROR]: "red",
    [LogLevel.WARN]: "yellow",
    [LogLevel.INFO]: "green",
    [LogLevel.HTTP]: "magenta",
    [LogLevel.VERBOSE]: "cyan",
    [LogLevel.DEBUG]: "blue",
    [LogLevel.SILLY]: "pink",
};

export const ErrorExposureDepth = {
    HTTP: "HTTP",
    BUSINESS: "BUSINESS",
    DATA: "DATA",
    COMPLETE: "COMPLETE",
};

export const errorExposureDepthCode = {
    [ErrorExposureDepth.HTTP]: 1,
    [ErrorExposureDepth.BUSINESS]: 2,
    [ErrorExposureDepth.DATA]: 3,
    [ErrorExposureDepth.COMPLETE]: Number.MAX_SAFE_INTEGER,
};
