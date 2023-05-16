const Room = require("../models/room");
const TokenGenerator = require("../models/token_generator");

const RoomController = {
  Create: (req, res) => {
    const room = new Room(req.body);
    room.save().then((err) => {
      if (err) {
        res.status(201).json({ message: "OK" });
      } else {
        res.status(400).json({ message: "Bad Request" });
      }
    });
  },
  Index: async (req, res) => {
    try {
      const rooms = await Room.find().exec();
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ rooms: rooms, token: token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
  Find: async (req, res) => {
    const roomName = req.params.name;
    try {
      const room = await Room.findOne({ name: roomName }).exec();
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ room: room, token: token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = RoomController;
