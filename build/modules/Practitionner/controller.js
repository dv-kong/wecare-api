"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _model = _interopRequireDefault(require("./model"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _env = _interopRequireDefault(require("../../config/env"));

var _error = _interopRequireDefault(require("../../helpers/error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _models = /*#__PURE__*/new WeakMap();

class UserController {
  constructor(models) {
    var _this = this;

    _classPrivateFieldInitSpec(this, _models, {
      writable: true,
      value: void 0
    });

    _defineProperty(this, "signUp", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (req, res, next) {
        const {
          email,
          password,
          first_name,
          last_name
        } = req.body;

        try {
          const user = yield _model.default.findOne({
            attributes: ["email"],
            where: {
              email: email
            }
          });

          if (user) {
            throw new _error.default(403, "Email already exists!");
          }

          const salt = yield _bcrypt.default.genSalt(10); // param = saltRounds

          const hashedPassword = yield _bcrypt.default.hash(password, salt);
          yield _model.default.create({
            email,
            password: hashedPassword,
            first_name,
            last_name,
            role: "user"
          });
          return res.status(200).json({
            message: "Successfully created an account."
          });
        } catch (error) {
          next(error);
        }
      });

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(this, "login", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(function* (req, res, next) {
        const {
          email,
          password
        } = req.body;

        try {
          const user = yield _model.default.findOne({
            attributes: ["email", "password", "id", "role"],
            where: {
              email: email
            }
          }); // Compares the password in the request (req) with the password stored in the database.

          const correct = yield _bcrypt.default.compare(password, user.password);

          if (!correct) {
            throw new _error.default(400, "Incorrect credentials.");
          }
          /**
           * @object "user" contains User datas
           * @property access_token contains jwt token
           * @property refresh_token define time to refresh an access_token
           */
          // Store the tokens in the user object


          user.access_token = _jsonwebtoken.default.sign({
            id: user.id,
            role: user.role
          }, _env.default.jwt_secret, {
            expiresIn: "5m" // TODO: change to 15m

          });
          user.refresh_token = _jsonwebtoken.default.sign({
            id: user.id
          }, _env.default.jwt_secret, {
            expiresIn: "30d"
          }); // Save the user properties to the database

          yield user.save(); // Store refresh token and his properties in cookie with "refresh_token" key
          // The HttpOnly flag is an additional flag included in a Set-Cookie HTTP response header. It is used to prevent a Cross-Site Scripting exploit from gaining access to the session cookie and hijacking the victim's session.

          res.cookie("refresh_token", user.refresh_token, {
            expiresIn: "30d",
            httpOnly: true
          });
          res.status(200).json({
            token: user.access_token
          });
        } catch (error) {
          next(error);
        }
      });

      return function (_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(this, "addUsers", /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(function* (req, res, next) {});

      return function (_x7, _x8, _x9) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(this, "updateUser", /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(function* (req, res, next) {
        console.log("TODO: Update user");
      });

      return function (_x10, _x11, _x12) {
        return _ref4.apply(this, arguments);
      };
    }());

    _defineProperty(this, "getUsers", /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator(function* (req, res, next) {
        try {
          const docs = yield _classPrivateFieldGet(_this, _models);
          yield res.status(200).json({
            message: "GET ALL USERS FROM DB"
          });
        } catch (err) {
          next(err);
        }
      });

      return function (_x13, _x14, _x15) {
        return _ref5.apply(this, arguments);
      };
    }());

    _defineProperty(this, "deleteUser", /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator(function* (req, res, next) {
        //TODO
        const {
          id
        } = req.body;

        try {
          const userDeleted = yield _model.default.destroy({
            where: {
              id: id
            }
          }); // console.log(userDeleted);
          // if(!userDeleted) {
          // }

          return res.status(200).json({
            message: `Successfully deleted user with ID: ${id}}`
          });
        } catch (error) {
          next(error);
        }
      });

      return function (_x16, _x17, _x18) {
        return _ref6.apply(this, arguments);
      };
    }());

    _classPrivateFieldSet(this, _models, models);
  }
  /**
   * @login takes a request, a response and a next function
   * @param
   */


}

var _default = UserController;
exports.default = _default;