"use strict";

var _express = _interopRequireDefault(require("express"));

var _env = _interopRequireDefault(require("./config/env.js"));

var _server = _interopRequireDefault(require("./config/server.js"));

var _middlewares = _interopRequireDefault(require("./config/middlewares.js"));

var _modules = _interopRequireDefault(require("./modules"));

require("core-js/stable");

require("regenerator-runtime/runtime");

var _db = _interopRequireDefault(require("./config/db.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const http = (0, _express.default)();
const server = new _server.default(http);
server.middlewares(_middlewares.default);
server.routes(_modules.default);

_asyncToGenerator(function* () {
  try {
    yield _db.default.associateAll(_db.default.sequelize.models);
    yield _db.default.sequelize.sync({
      // force: true,
      alter: true // update db tables

    });
    yield server.start(_env.default.port);
    console.log(`Database started on port ${_env.default.db_port}.`);
  } catch (error) {
    console.error(error);
  }
})();