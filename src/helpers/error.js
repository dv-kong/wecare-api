import { logger } from "../config/middlewares";
/**
 * @func ApiError Generate personalized error
 * @param statusCode error code
 * @param message error message
 */
class ApiError extends Error { // inherit from Error class
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}
export default ApiError;
