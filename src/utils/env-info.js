import { LogLevel } from "../constants/index.js";

export function getAPIGatewayURL() {
    const apiGatewayDevURL = process.env["API_GATEWAY_DEV_URL"];
    const apiGatewayProdURL = process.env["API_GATEWAY_PROD_URL"];

    return process.env["NODE_ENV"] === "production" ? apiGatewayProdURL : apiGatewayDevURL;
}

export function getCurrentEnv() {
    return process.env["NODE_ENV"] || "development";
}

export function getCurrentPort() {
    return Number(process.env["PORT"]) || 5002;
}

export function getLogLevel() {
    return process.env["LOG_LEVEL"] || LogLevel.INFO;
}

export function getErrorExposureDepth() {
    return process.env["ERROR_EXPOSURE_DEPTH"] || "BUSINESS";
}
