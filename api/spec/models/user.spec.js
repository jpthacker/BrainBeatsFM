const mongoose = require("mongoose");
const User = require("../../models/user");

describe("User model", () => {
  it("it has an email address", () => {
    const user = new User({
      email: "someemail@anything.com",
    });
    expect(user.email).toEqual("someemail@anything.com");
  });
});
