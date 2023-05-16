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
    <div className="w-screen py-32 grid grid-cols-3 gap-4 place-items-stretch h-56 p-24">
      {rooms.map((r) => (
        <div
          className="flex min-w-screen flex-col items-start justify-start p-8 rounded-3xl bg-gray-300 dark:bg-[#27273F] hover: cursor-pointer border-2"
          key={r["_id"]}
          onClick={() => {
            handleOpenRoom(`${r["name"]}`);
          }}>
          <div className="border-2">
            <div className="w-full bg-gradient-to-r from-orange-600 to-pink-400 pb-1">
              <h1 className="w-full  bg-gray-300 dark:bg-[#27273F]">
                {r["name"]}
              </h1>
            </div>
            <p className="mt-2 text-sm font-bold">{r["description"]}</p>
          </div>
          <div className="w-full h-32 border-2">
            <div></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainRoom;
