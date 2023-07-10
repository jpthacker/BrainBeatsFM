import Room from "../models/room";
import TokenGenerator from "../models/token_generator";
import { Request, Response } from "express";
import { CreateRoomInput } from "../schema/room.schema";

const RoomController = {
  Create: async (
    req: Request<{}, {}, CreateRoomInput["body"]>,
    res: Response
  ) => {
    try {
      const room = new Room(req.body);
      await room.save();
      res.status(201).json({ message: "OK" });
    } catch (err: any) {
      res.status(400).json({ message: "Bad request" });
    }
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
