"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const enableCors = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    const corsOptions = {
      origin: 'http://localhost:3001',
      credentials: true,
      //access-control-allow-credentials:true
      optionSuccessStatus: 200
    };
    yield (0, _cors.default)(corsOptions);
    next();
  });

  return function enableCors(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = enableCors;
exports.default = _default;