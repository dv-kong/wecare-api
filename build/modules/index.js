"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("./User/"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = {
  // base route ex: http://localhost:3000/users/...
  "/users": _User.default // "/doctors": UserRouter,
  //   "*": 404Router,

};
var _default = routes;
exports.default = _default;