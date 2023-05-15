const mongoose = require("mongoose");
const Room = require("../../models/room");
// require("../mongodb_helper");

describe("Room model", () => {
  it("it has a username", () => {
    const room = new Room({
      name: "John Doe",
    });
    expect(room.name).toEqual("John Doe");
  });

  it("it has a description", () => {
    const room = new Room({
      description: "description of anything",
    });
    expect(room.description).toEqual("description of anything");
  });
});
