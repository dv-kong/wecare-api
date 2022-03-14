"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const env = {
  db_name: process.env.DB_NAME,
  db_port: process.env.DB_PORT || 3050,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_dialect: process.env.DB_DRIVER,
  db_host: process.env.DB_HOST,
  port: process.env.SERVER_PORT,
  jwt_secret: process.env.JWT_SECRET
};
var _default = env;
exports.default = _default;