"use client";
import { log } from "console";
import React from "react";

const Room = () => {
  interface Room {
    _id: number;
    name: string;
    description: string;
  }
  const [room, setRoom] = React.useState<{
    data: Room | { name: "room" };
    loading: boolean;
  }>({ data: { name: "room" }, loading: true });

  React.useEffect(() => {
    const localRoomName: string = window.localStorage.getItem("roomName")!;
    console.log(localRoomName);

    const fetchRoom = async () => {
      let response = await fetch(`/api/rooms/${localRoomName}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      let data = await response.json();
      window.localStorage.setItem("token", data.token);
      setRoom({ data: data.room, loading: false });
      console.log(data.room);
    };

    fetchRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{room.data.name}</div>;
};

export default Room;
