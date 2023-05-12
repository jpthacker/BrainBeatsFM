/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

const Room = () => {
  const [roomId, setRoomId] = React.useState(
    window.localStorage.getItem("roomId")
  );
  const [room, setRoom] = React.useState();

  React.useEffect(() => {
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
