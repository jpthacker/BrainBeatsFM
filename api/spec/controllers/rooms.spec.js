const app = require("../../app");
const request = require("supertest");
const Room = require("../../models/room");
require("../mongodb_helper");

describe("/rooms", () => {
  beforeEach(async () => {
    await Room.deleteMany({}).exec();
  });

  describe("GET, when correct id is provided", () => {
    test("the response code is 201", async () => {
      // let response = await request(app).post("/users").send({
      //   name: "John Doe",
      //   email: "someemail@anything.com",
      //   password: "Swordfish",
      // });
      // expect(response.statusCode).toBe(201);
    });

    test("the corresponding room data is returned", async () => {
      // let response = await request(app).post("/users").send({
      //   name: "John Doe",
      //   email: "someemail@anything.com",
      //   password: "Swordfish",
      // });
      // expect(response.statusCode).toBe(201);
    });
  });
});
