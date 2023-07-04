import Room from "../models/room";
import TokenGenerator from "../models/token_generator";
import { Request, Response } from "express";
import z from "zod";

const roomSchema = z.object({
  name: z.string().max(25),
  description: z.string().max(50),
});

const RoomController = {
  Create: (req: Request, res: Response) => {
    const parsedRoom = roomSchema.parse(req.body);
    const room = new Room(parsedRoom);
    room.save().then((err) => {
      if (err) {
        res.status(201).json({ message: "OK" });
      } else {
        res.status(400).json({ message: "Bad Request" });
      }
    });
  },

  Index: async (req: Request, res: Response) => {
    try {
      const rooms = await Room.find().exec();
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ rooms: rooms, token: token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  Find: async (req: Request, res: Response) => {
    const roomName = req.params.name;
    try {
      const room = await Room.findOne({ name: roomName }).exec();
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ room: room, token: token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};

export default RoomController;
