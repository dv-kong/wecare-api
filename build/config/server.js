"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _http = /*#__PURE__*/new WeakMap();

class Server {
  // private
  constructor(http) {
    _classPrivateFieldInitSpec(this, _http, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _http, http);
  }
  /** hover over the function to see the documentation
   * @func middlewares for each middleware, server will use the good one
   * @param middleware middleware function take the middleware in argument
   * 
  */


  middlewares(middlewares) {
    for (const key in middlewares) {
      _classPrivateFieldGet(this, _http).use(middlewares[key]);
    }
  }
  /**
   * @func routes server will use each route contained in the routes object
   * @param routes
   * @TODO param (routes)
   */


  routes(routes) {
    for (const path in routes) {
      _classPrivateFieldGet(this, _http).use(path, routes[path]);
    }
  }
  /** 
   * @func errorHandler make the server the error handler
   * @param errorHandler custom class inheriting from Error
   */


  errorHandler(errorHandler) {
    _classPrivateFieldGet(this, _http).use(errorHandler);
  }
  /**
   * @func start Start the server with the port in argument
   * @param port Value located in the .env file
   */


  start(port) {
    _classPrivateFieldGet(this, _http).listen(port, () => {
      console.log(`Server started on port: http://localhost:${port}`);
    });
  }

}

var _default = Server;
exports.default = _default;