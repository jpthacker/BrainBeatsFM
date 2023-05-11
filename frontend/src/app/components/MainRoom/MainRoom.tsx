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
    <div className="grid grid-cols-3 gap-4 place-items-stretch h-56 p-24" >
      {room.map((r) => (
        <div className="flex min-w-screen flex-col items-center justify-center gap-12 p-24 rounded-3xl bg-gray-300 dark:bg-slate-800" key={r['_id']}>
          <h2>{r['name']}</h2>
          <p>{r['description']}</p>
        </div>
      ))}
    </div>
  )
  
};

export default MainRoom;
