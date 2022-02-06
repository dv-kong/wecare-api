import "regenerator-runtime";
// import User from "./mocks/user.mock";
import users_controller from "../../users_controller";

// const controller = users_controller(User);

const controller = users_controller;

describe("TEST USERS", () => {
  describe("create a user", () => {
    it("should create a user and return a user object", async () => {
      const user = await controller.create({ name: "Naruto" });
      console.log(`created user`,user);
      expect(user.name).toBe("Naruto");
      const user2 = await controller.create({ name: "Naru" });
      console.log(`created user`,user);
      expect(user2.name).toBe("Naru");
    });
  });
});

describe("return all users", () => {
  it("should return a array of users", async () => {
    // console.log(controller);
    const users = await controller.getAllUsers();
    // expect(users[0].id).toBe(1);
    // expect(users[0].name).toBe('a');

    expect(users[0].id).toBe(1);
    expect(users[0].name).toBe("a");
    console.log(`userList`, users);
  });
});

//    describe('return a user by id', () => {
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
