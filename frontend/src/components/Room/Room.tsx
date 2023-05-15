"use client";
import React from "react";

const Room = () => {
  const [roomId, setRoomId] = React.useState("");
  const [room, setRoom] = React.useState();

  React.useEffect(() => {
    const localRoomId: string = window.localStorage.getItem("roomID")!;
    setRoomId(localRoomId);
    const fetchRoom = async () => {
      let response = await fetch(`/api/rooms/${roomId}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      setRoom(data.room);
      console.log(data.room);
    };

    fetchRoom();
  }, []);

  return <div>Room</div>;
};

export default Room;
