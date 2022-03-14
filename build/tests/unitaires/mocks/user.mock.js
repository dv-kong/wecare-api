"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class User {
  constructor() {
    this.data = [{
      id: 1,
      user: "a"
    }, {
      id: 2,
      user: "V1nc3ntL€BgDu-quetre-vin-katorz"
    }];
    this.currentId = this.data.length;
  }

  findAll() {
    var _this = this;

    return _asyncToGenerator(function* () {
      return _this.data;
    })();
  }

  getAllUsers() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      return _this2.data;
    })();
  }

  findOne(query) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const data = _this3.data.filter(row => row.name === query.where.name);

      return data;
    })();
  }

  create({
    name
  }) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const id = _this4.currentId++;
      const newRow = {
        id,
        name
      };

      _this4.data.push(newRow);

      return newRow;
    })();
  }

}

var _default = new User();

exports.default = _default;