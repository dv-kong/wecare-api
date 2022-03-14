"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _router = _interopRequireDefault(require("./router"));

var _controller = _interopRequireDefault(require("./controller"));

var _model = _interopRequireDefault(require("./model"));

var _model2 = _interopRequireDefault(require("../Appointment/model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 
 */
const models = {
  User: _model.default,
  Appointment: _model2.default
}; // IoD for Unit Testing
// mock == User with mock data

const controller = new _controller.default(models);
const routes = (0, _router.default)(controller);
var _default = routes;
exports.default = _default;