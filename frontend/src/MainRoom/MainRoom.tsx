"use client";
import React, { useState, useEffect } from "react";

const MainRoom = () => {
  let room;

  useEffect(() => {
    const fetchRooms = async () => {
      let response = await fetch("/api/rooms", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      const room = data.room;
      console.log(data.room[0]);
    };
    fetchRooms();
  });

  return (
    <p>{room}</p>
  )
};

export default MainRoom;
