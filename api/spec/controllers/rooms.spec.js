const app = require("../../app");
const request = require("supertest");
const Room = require("../../models/room");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;
require("../mongodb_helper");

let token;

describe("/rooms", () => {
  beforeAll(async () => {
    const user = new User({
      imageURL: "www.placeholder-image.com",
      name: "Test",
      email: "test@test.com",
      password: "12345678",
    });
    await user.save();

    token = JWT.sign(
      {
        user_id: user.id,
        // Backdate this token of 5 minutes
        iat: Math.floor(Date.now() / 1000) - 5 * 60,
        // Set the JWT token to expire in 10 minutes
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
      },
      secret
    );
  });

  beforeEach(async () => {
    await Room.deleteMany({}).exec();
  });

  afterAll(async () => {
    await User.deleteMany({}).exec();
    await Room.deleteMany({}).exec();
  });

  describe("GET, when correct name is provided", () => {
    test("the response code is 200", async () => {
      await request(app)
        .post("/rooms")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "rock",
          description: "This is a Rock room",
        });
      console.log(await Room.findOne({ name: "rock" }).exec());
      let response = await request(app).get("/rooms/rock").send({
        name: "rock",
        description: "This is a Rock room",
      });
      expect(response.statusCode).toBe(200);
    });

    test("the correct data is returned", async () => {
      await request(app)
        .post("/rooms")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "rock",
          description: "This is a Rock room",
        });
      console.log(await Room.findOne({ name: "rock" }).exec());
      let response = await request(app).get("/rooms/rock").send({
        name: "rock",
        description: "This is a Rock room",
      });
      expect(response.body.room.name).toBe("rock");
    });
  });
});
