"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refreshAccessToken = exports.isAuth = exports.isAdmin = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _decode = _interopRequireDefault(require("jsonwebtoken/decode"));

var _env = _interopRequireDefault(require("../config/env"));

var _model = _interopRequireDefault(require("../modules/User/model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const isAuth = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    // get token, token ok ? 200
    // token invalid ? 40*
    // token expired ? -> use refresh token
    // refresh token invalid ? 40*
    // refresh token expired ? -> send "please log in"
    // refresh token valid ? -> gen new access token
    try {
      let access_token = req.headers.authorization.split(" ")[1];
      console.log(req.headers); // id, role, iat, exp

      const refresh_token = req.cookies["refresh_token"]; // TODO
      // id, role, iat, exp

      if (!refresh_token) return res.status(401).json("Session expired, please log in.");
      const tokenValid = yield _jsonwebtoken.default.verify(refresh_token, _env.default.jwt_secret);
      console.log(`tokenValid`, tokenValid);
      let user = yield _model.default.findOne({
        where: {
          access_token,
          refresh_token
        }
      }); // Get only once

      if (!user) return res.status(401).json("Session expired.");
      yield _jsonwebtoken.default.verify(access_token, _env.default.jwt_secret); //TODO

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json(error.message);
    }
  });

  return function isAuth(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.isAuth = isAuth;

const refreshAccessToken = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    try {
      const refresh_token = req.cookies["refresh_token"]; // TODO
      // let refresh_token = req.body.refresh_token;

      if (!refresh_token) return res.status(404).json("Invalid refresh token");
    } catch (error) {
      return res.status(401).json(error.message);
    }
  });

  return function refreshAccessToken(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}(); // generate access token from valid refresh token


exports.refreshAccessToken = refreshAccessToken;

const generateAccessToken = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res, next) {});

  return function generateAccessToken(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

const isAdmin = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res, next) {
    try {
      let access_token = req.headers.authorization.split(" ")[1];
      let decoded_token = (0, _decode.default)(access_token);
      if (!access_token) return res.status(401).json("Invalid access token");
      if (decoded_token.role !== "admin") return res.status(401).json("Invalid rights");
      next();
    } catch (error) {
      return res.status(401).json(error.message);
    }
  });

  return function isAdmin(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.isAdmin = isAdmin;