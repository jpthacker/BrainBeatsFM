"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const MainRoom = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      let response = await fetch("/api/rooms", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      setRooms(data.rooms);
      console.log(data.rooms);
    };
    fetchRooms();
  }, []);

  const handleOpenRoom = (name: any) => {
    router.push(`/rooms/${name}`);
    // tell the app which room has been opened.
    window.localStorage.setItem("roomName", name);
  };

  return (
    <div className="grid grid-cols-3 gap-4 place-items-stretch h-56 p-24">
      {rooms.map((r) => (
        <div
          className="flex min-w-screen flex-col items-center justify-center gap-12 p-24 rounded-3xl bg-gray-300 dark:bg-slate-800 hover: cursor-pointer"
          key={r["_id"]}
          onClick={() => {
            handleOpenRoom(`${r["name"]}`);
          }}>
          <h2>{r["name"]}</h2>
          <p>{r["description"]}</p>
        </div>
      ))}
    </div>
  );
};

export default MainRoom;
