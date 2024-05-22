import { catchAsyncBusinessError, BusinessError, BusinessErrors } from "../utils/application-errors.js";
import logger from "../configs/logger.config.js";

const subtraction = catchAsyncBusinessError(async (number1, number2) => {
    logger.info(`subtractionBusinessService.subtraction called with number1=${number1} and number2=${number2}`);

    if (isNaN(number1) || isNaN(number2)) {
        throw new BusinessError(BusinessErrors.VALIDATION_FAILURE, "number1 and number2 must be numbers");
    }

    return number1 - number2;
});

export default {
    subtraction,
};
