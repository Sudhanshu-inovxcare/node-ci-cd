const request = require("supertest")
const app = require("../src/app")
const { describe, test } = require("node:test")

describe("Health-Endpoint", () => {
    test('GET /health should return UP', async () => {
        const response = await request(app).get("/health");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            status:"UP"
        })
    })
})