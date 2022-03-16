"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("../../src/modules/User/service"));
const dto_1 = __importDefault(require("../../src/modules/User/dto"));
const userRepository_mock_1 = __importDefault(require("../mocks/userRepository.mock"));
//to do - mock repo
/**
 * supply mock to UserService
 */
const userService = new service_1.default(userRepository_mock_1.default);
describe('OUR FIRST TEST', () => {
    it('should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield userService.getAll();
        expect(users[0] instanceof dto_1.default).toBe(true);
    }));
});
// describe('Create a new user', () => {
//     it('should create a new user with the supplied data', async () => {
//         const newUser = await userService.addNew(); // supply new user input?
//         users.push(newUser);
//         expect(newUser instanceof UserDTO).toBe(true);
//     });
// });
