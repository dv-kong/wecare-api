import request from "supertest";
import database from "../../src/config/database";
import App from "../../src/config/server"
import routes from "../../src/modules"
import middlewares from "../../src/middlewares";

// use a test instance of the app
let server = new App(routes, middlewares);

// prevents test performance issues
beforeAll(async () => {
    await database.connect();
})

afterAll(async () => {
    await database.close();
})

describe("POST user", () => {

    it("Should return a 201 status code when user is created.", async () => {

        const result = await request(server.app).post("/users/register")
            .send(
                {
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
                  }
            )
            .expect(201)
    })

})

describe("GET filled /users", () => {

    it("Should return a 200 status code and a array of the existing users.", async () => {

        const result = await request(server.app).get("/users")
            .expect(200)

        expect(result.body.length).toBeGreaterThan(0)
    })

})