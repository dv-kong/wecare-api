"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _morgan = _interopRequireDefault(require("morgan"));

var _express = _interopRequireDefault(require("express"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _winston = _interopRequireDefault(require("winston"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @object Middlewares contains: 
 * - Cookie Parser: Parse Cookie header and populate req.cookies with an object keyed by the cookie names. 
 * - ApiLogger (morgan): Logs all requests to the console
 * - Json body parser: Parse the body request to JSON format
 * - Winston
 */
const middlewares = {
  // server.use(middleware)
  json: _express.default.json(),
  urlencoded: _express.default.urlencoded({
    extended: false
  }),
  cookie: (0, _cookieParser.default)(),
  cors: (0, _cors.default)({
    origin: 'http://localhost:3001',
    credentials: true,
    //access-control-allow-credentials:true
    optionSuccessStatus: 200
  }),
  apiLogger: (0, _morgan.default)('dev')
};
var _default = middlewares;
exports.default = _default;