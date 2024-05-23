import { LogLevel } from "../constants/index.js";
import { ErrorExposureDepth } from "../constants/index.js";

export function getCurrentEnv() {
    return process.env["NODE_ENV"] || "development";
}

export function getCurrentPort() {
    return Number(process.env["PORT"]) || 5002;
}

export function getAPIGatewayURL() {
    return process.env["API_GATEWAY_URL"] || "*";
}

export function getLogLevel() {
    return process.env["LOG_LEVEL"] || LogLevel.INFO;
}

export function getErrorExposureDepth() {
    return process.env["ERROR_EXPOSURE_DEPTH"] || ErrorExposureDepth.BUSINESS;
}
