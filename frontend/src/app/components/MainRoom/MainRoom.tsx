"use client";
import { set } from "mongoose";
import React, { useState, useEffect } from "react";

const MainRoom = () => {
  const [room, setRoom] = useState([]);

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
      console.log(data.room)
    };
    fetchRooms();
  }, []);

  return (
    <div>
      {room.map((r) => (
        <div key={r['_id']}>
          <h1>{r['name']}</h1>
          <p>{r['description']}</p>
        </div>
      ))}
    </div>
  )
  
};

export default MainRoom;
