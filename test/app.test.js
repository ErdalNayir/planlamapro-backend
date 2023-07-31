const request = require("supertest");
const app = require("../index.js");

describe("Test Express.js API", () => {
  test("POST /user/login", async () => {
    const response = await request(app).post("/user/login");
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty([]);
  });
});
