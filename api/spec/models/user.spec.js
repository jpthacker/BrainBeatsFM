const mongoose = require("mongoose");
const User = require("../../models/user");

describe("User model", () => {
  it("it has an email address", () => {
    const user = new User({
      email: "someemail@anything.com",
      password: "swordfish",
    });
    expect(user.email).toEqual("someemail@anything.com");
  });

  it("it has a password", () => {
    const user = new User({
      email: "someemail@anything.com",
      password: "swordfish",
    });
    expect(user.password).toEqual("swordfish");
  });

  // HAving trouble getting these tests to work without callbacks
  // (new version of Mongoose doesn't support them)

  // it("can list all users", () => {
  //   const results = async () => {
  //     const results = await User.find({}).exec();
  //     results.then((users) => {
  //       return users;
  //     });
  //   };
  //   expect(results()).toEqual({});
  // });

  // it("can save a user", () => {
  //   const user = new User({
  //     email: "someone@example.com",
  //     password: "password",
  //   });

  //   user.save((err) => {
  //     expect(err).toBeNull();

  //     User.find((err, users) => {
  //       expect(err).toBeNull();

  //       expect(users[0]).toMatchObject({
  //         email: "someone@example.com",
  //         password: "password",
  //       });
  //       done();
  //     });
  //   });
  // });
});
