import Track from "../models/track";
import TokenGenerator from "../models/token_generator";
import { Request, Response } from "express";

const TracksController = {
  Create: (req: Request, res: Response) => {
    const track = new Track(req.body);
    track.save().then((err) => {
      if (err) {
        res.status(201).json({ message: "OK" });
      } else {
        res.status(400).json({ message: "Bad Request" });
      }
    });
  },
  Index: async (req: Request, res: Response) => {
    const genre = req.params.genre;
    try {
      const tracks = await Track.find({ genre: genre }).exec();
      let token;
      if (tracks) {
        token = TokenGenerator.jsonwebtoken(req.user_id);
      }
      res.status(200).json({ tracks: tracks, token: token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
  User: async (req: Request, res: Response) => {
    try {
      const tracks = await Track.find({}).exec();
      let token;
      if (tracks) {
        token = TokenGenerator.jsonwebtoken(req.user_id);
      }
      res.status(200).json({ tracks: tracks, token: token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
  Votes: async (req: Request, res: Response) => {
    const trackID = req.body.trackID;
    const userID = req.body.userVotes;
    try {
      console.log(req);
      const trackFound = await Track.findOneAndUpdate(
        { _id: trackID },
        { $inc: { votes: 1 }, $push: { userVotes: userID } },
        { new: true }
      ).exec();
      res.status(200).json({ track: trackFound, test: userID });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};

export default TracksController;
