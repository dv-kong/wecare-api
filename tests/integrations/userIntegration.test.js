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
const supertest_1 = __importDefault(require("supertest"));
const database_1 = __importDefault(require("../../src/config/database"));
const server_1 = __importDefault(require("../../src/config/server"));
const modules_1 = __importDefault(require("../../src/modules"));
const middlewares_1 = __importDefault(require("../../src/middlewares"));
// use a test instance of the app
let server = new server_1.default(modules_1.default, middlewares_1.default);
// prevents test performance issues
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.connect();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.close();
}));
describe("POST user", () => {
    it("Should return a 201 status code when user is created.", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(server.app).post("/users/register")
            .send({
            "id": "54",
            "role": "Engineer",
            "email": "sdasturley4@pcworld.com",
            "email_validated": false,
            "password": "Jw6Wmc",
            "last_name": "Sturley",
            "first_name": "Anallise",
            "gender": "Female",
            "address": "1308 Del Mar Center",
            "city": "Dongxi",
            "postal_code": "85002",
            "phone_number": "726-328-1669",
            "social_security_number": "04-928-9745",
            "banned": true,
            "access_token": "3be02966bc0b54a323483cbb38fc2a691340ebf4",
            "refresh_token": "3be02966bc0b54a323483cbb38fc2a691340ebf4"
        })
            .expect(201);
    }));
});
describe("GET filled /users", () => {
    it("Should return a 200 status code and a array of the existing users.", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(server.app).get("/users")
            .expect(200);
        expect(result.body.length).toBeGreaterThan(0);
    }));
});
