"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const handleError = (err, req, res, next) => {
  const {
    message
  } = err;
  const statusCode = err.statusCode ? err.statusCode : 500;
  console.log(`MESSAGE : ${message} STATUS : ${statusCode}`);
  res.status(statusCode).json({
    statusCode,
    message
  });
};

var _default = handleError;
exports.default = _default;