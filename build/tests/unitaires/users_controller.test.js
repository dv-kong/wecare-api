"use strict";

require("regenerator-runtime");

var _users_controller = _interopRequireDefault(require("../../users_controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// const controller = users_controller(User);
const controller = _users_controller.default;
describe("TEST USERS", () => {
  describe("create a user", () => {
    it("should create a user and return a user object", /*#__PURE__*/_asyncToGenerator(function* () {
      const user = yield controller.create({
        name: "Naruto"
      });
      console.log(`created user`, user);
      expect(user.name).toBe("Naruto");
      const user2 = yield controller.create({
        name: "Naru"
      });
      console.log(`created user`, user);
      expect(user2.name).toBe("Naru");
    }));
  });
});
describe("return all users", () => {
  it("should return a array of users", /*#__PURE__*/_asyncToGenerator(function* () {
    // console.log(controller);
    const users = yield controller.getAllUsers(); // expect(users[0].id).toBe(1);
    // expect(users[0].name).toBe('a');

    expect(users[0].id).toBe(1);
    expect(users[0].name).toBe("a");
    console.log(`userList`, users);
  }));
}); //    describe('return a user by id', () => {
//     it('should return a specific user by id', async () => {
//       const users = await controller.getUserById(1);
//      expect(users[0].id).toBe(1);
//     });
// });
// });
// test('Get all users', () => {
// const users = controller.getAllUsers();
// console.log(users);
// expect(users.length).toBe(2),
// expect(users[0].name).toBe("a")
// })
// describe("User controller tests:", () => {
//   describe("getAll Users:", () => {
//     it("Should return a array of users", async () => {
//       const users = await controller.getAllUsers();
//       expect(users.length).toBe(2);
//       expect(users[0].name).toBe("a");
//     });
//   });
// });