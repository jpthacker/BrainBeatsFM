const app = require("../../app");
const request = require("supertest");
const User = require("../../models/user");
require("../mongodb_helper");

describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({}).exec();
  });

  describe("POST, when name, email and password are provided", () => {
    test("the response code is 201", async () => {
      let response = await request(app).post("/users").send({
        name: "John Doe",
        email: "someemail@anything.com",
        password: "Swordfish",
      });
      expect(response.statusCode).toBe(201);
    });

    test("a new user is created", async () => {
      await request(app).post("/users").send({
        name: "John Doe",
        email: "someemail@anything.com",
        password: "Swordfish",
      });
      let users = await User.find().exec();
      let newUser = users[users.length - 1];
      expect(newUser.email).toEqual("someemail@anything.com");
    });
  });

  describe("POST, when name is missing", () => {
    test("the response code is 400", async () => {
      let response = await request(app).post("/users").send({
        email: "someemail@anything.com",
        password: "Swordfish",
      });
      expect(response.statusCode).toBe(400);
    });

    test("a new user is not created", async () => {
      await request(app).post("/users").send({
        email: "someemail@anything.com",
        password: "Swordfish",
      });
      let users = await User.find().exec();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when email is missing", () => {
    test("the response code is 400", async () => {
      let response = await request(app).post("/users").send({
        name: "John Doe",
        password: "Swordfish",
      });
      expect(response.statusCode).toBe(400);
    });

    test("a new user is not created", async () => {
      await request(app).post("/users").send({
        name: "John Doe",
        password: "Swordfish",
      });
      let users = await User.find().exec();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when password is missing", () => {
    test("the response code is 400", async () => {
      let response = await request(app).post("/users").send({
        name: "John Doe",
        email: "someemail@anything.com",
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual("Bad request");
    });

    test("a new user is not created", async () => {
      await request(app).post("/users").send({
        name: "John Doe",
        email: "someemail@anything.com",
      });
      let users = await User.find().exec();
      expect(users.length).toEqual(0);
    });
  });
});
