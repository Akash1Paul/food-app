const request = require("supertest");
const app = require("../app");

describe("Auth API", () => {

    test("POST /api/v1/auth/register should create user", async () => {

        const response = await request(app)
            .post("/api/v1/auth/register")
            .send({
                userName: "Test User",
                email: "unique-test@example.com",
                password: "123456",
                phone: "9999999999",
                address: "Test Address",
                answer: "Test Answer"
            });

        console.log("STATUS:", response.statusCode);
        console.log("BODY:", response.body);

        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
    });

});