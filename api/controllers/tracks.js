const Track = require("../models/track");
const TokenGenerator = require("../models/token_generator");

const TracksController = {
  Create: (req, res) => {
    const track = new Track(req.body);
    track.save().then((err) => {
      if (err) {
        res.status(201).json({ message: "OK" });
      } else {
        res.status(400).json({ message: "Bad Request" });
      }
    });
  },
  Index: async (req, res) => {
    const genre = req.params.genre;
    try {
      const tracks = await Track.find({ genre: genre }).exec();
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ tracks: tracks, token: token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
  Votes: async (req, res) => {
    const title = req.params.title;
    const userID = req.body.userVotes;
    try {
      console.log(req);
      const trackFound = await Track.findOneAndUpdate(
        { title: title },
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

module.exports = TracksController;
