"use client";
import React, { useState, useEffect } from "react";

const MainRoom = () => {
  const [room, setRoom] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      let response = await fetch("/api/rooms", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      setRoom(data.room);
      const room = data.room;
      console.log(data.room);
    };
    fetchRooms();
  });

  return (
    <p>{room}</p>
  )
};

export default MainRoom;
