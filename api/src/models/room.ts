import mongoose from "mongoose";

export interface IRoom {
  name: string;
  description: string;
}

const RoomSchema = new mongoose.Schema<IRoom>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Room = mongoose.model<IRoom>("Room", RoomSchema);

export default Room;
