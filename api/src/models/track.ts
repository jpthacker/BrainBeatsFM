import mongoose from "mongoose";

export interface TrackI {
  title: string;
  owner: string;
  genre: string;
  description: string;
  url: string;
  votes: number;
  userVotes: string[];
}

export interface TrackDocument extends TrackI, mongoose.Document {}

const TrackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  owner: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  votes: { type: Number, required: true },
  userVotes: { type: Array, required: true },
});

const Track = mongoose.model<TrackDocument>("Track", TrackSchema);

export default Track;
