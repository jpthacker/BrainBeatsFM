"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaPlayCircle } from "react-icons/fa";

const MainRoom = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[] | any[]>([]);

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

  const handleOpenRoom = (name: string) => {
    router.push(`/rooms/${name}`);
    window.localStorage.setItem("roomName", name);
  };

  return (
    <div className="w-screen py-32 grid grid-cols-3 gap-4 place-items-stretch h-56 p-24">
      {rooms.map((room: Room) => (
        <div
          className="flex min-w-screen flex-col items-start justify-start p-8 rounded-3xl bg-gray-300 dark:bg-[#27273F] shadow-xl"
          key={room["_id"]}>
          <div className="w-9/12 bg-gradient-to-r from-pink-400 orange-600 to-orange-600 pb-1">
            <h1 className="w-full  bg-gray-300 dark:bg-[#27273F] capitalize text-4xl py-2">
              {room["name"]}
            </h1>
          </div>
          <p className="mt-4 text-s font-bold">{room["description"]}</p>
          <div className="w-full h-32 flex items-end justify-end">
            <FaPlayCircle
              className="w-16 h-16 fill-[#FC5425] hover:fill-[#E23D93] hover:cursor-pointer"
              onClick={() => {
                handleOpenRoom(`${room["name"]}`);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainRoom;
