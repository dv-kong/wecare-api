"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _router = _interopRequireDefault(require("./router"));

var _controller = _interopRequireDefault(require("./controller"));

var _model = _interopRequireDefault(require("./model"));

var _model2 = _interopRequireDefault(require("../User/model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import User from './../user/model';

/**
 * Dependancy injection
 */
const models = {
  Appointment: _model.default,
  User: _model2.default
};
const controller = new _controller.default(models);
const routes = (0, _router.default)(controller);
var _default = routes;
exports.default = _default;