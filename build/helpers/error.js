"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _middlewares = require("../config/middlewares");

/**
 * @func ApiError Generate personalized error
 * @param statusCode error code
 * @param message error message
 */
class ApiError extends Error {
  // inherit from Error class
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }

}

var _default = ApiError;
exports.default = _default;