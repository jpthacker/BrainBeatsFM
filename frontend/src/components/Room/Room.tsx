"use client";

import React, { useState, useEffect } from "react";
import VoteButton from "../VoteButton/VoteButton";
import WaveSurfer from "wavesurfer.js";
import { FaPlayCircle } from "react-icons/fa";
import Image from "next/image";

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
  const [tracks, setTracks] = React.useState([]);
  const [cards, setCards] = React.useState(false);
  const [audio, setAudio] = React.useState(false);
  const waveSurferRef = React.useRef<any | null>(null);

  React.useEffect(() => {
    const localRoomName: string = window.localStorage.getItem("roomName")!;

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
    };

    const fetchTracks = async () => {
      let response = await fetch(`/api/tracks/${localRoomName}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      let data = await response.json();
      console.log(data.tracks);

      setTracks(data.tracks);
    };

    fetchRoom();
    fetchTracks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const userID = window.localStorage.getItem("userID");

  useEffect(() => {
    if (audio) {
      const wavesurfer = WaveSurfer.create({
        container: "#waveform",
        barGap: 6,
        barHeight: 0.6,
        barMinHeight: 1,
        barRadius: 6,
        barWidth: 6,
        progressColor: "#FC5425",
      });
      wavesurfer.load(tracks[0]["url"]);
      wavesurfer.on("ready", function () {
        waveSurferRef.current = wavesurfer;
        wavesurfer.play();
      });
      return () => {
        wavesurfer.destroy();
      };
    }
  }, [audio]);

  const handleLoadCards = () => {
    if (cards) {
      return (
        <div className="w-full">
          {tracks[0].map((t) => (
            <div
              className="w-full flex-1 flex-col items-start justify-center p-6 rounded-xl bg-gray-300 dark:bg-[#27273F] shadow-xl"
              key={t["_id"]}>
              <div className="flex flex-row items-center justify-start w-full mb-6 gap-4 px-4">
                <FaPlayCircle
                  className="w-24 h-24 fill-[#FC5425] hover:fill-[#E23D93] hover:cursor-pointer"
                  onClick={() => {
                    waveSurferRef.current.playPause();
                  }}
                />
                <div className="flex flex-col items-start w-4/12">
                  <h2 className="mb-1">{t["title"]}</h2>
                  <p className="mb-4">{t["owner"]}</p>
                </div>
                <div id="waveform" className="w-full"></div>
              </div>
              <div className="w-full mx-24">
                <div className="w-1/2 flex flex-col items-start justify-start bg-gradient-to-r from-orange-600 to-pink-400 pt-1">
                  <p className="w-full bg-gray-300 dark:bg-[#27273F] py-3">
                    {t["description"]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <button
          onClick={() => {
            setCards(true);
            setAudio(true);
          }}>
          Start Listening
        </button>
      );
    }
  };

  return (
    <div className="flex flex-col min-w-screen min-h-screen p-16">
      <div className="min-w-full flex flex-col items-start justify-around gap-4 py-12">
        <h2 className="capitalize">{room.data.name}</h2>
        <h3>{`A room dedicated to AI ${room.data.name} music`}</h3>
                <div className="w-full">{handleLoadCards()}</div>
      </div>
      <div className="w-full flex flex-col items-center justify-start">
        {tracks.slice(1, tracks.length - 1).map((t) => (
          <div
            className="flex flex-col w-10/12 items-start justify-center p-6 rounded-xl bg-gray-300 dark:bg-[#27273F]"
            key={t["_id"]}
          >
            <h2 className="mb-1">{t["title"]} </h2>
            <div>
              {t["userVotes"].includes(userID) ? (
                <p>Voted!</p>
              ) : (
                <form
                  onSubmit={async (e) => {
                    let response = await fetch(`/api/tracks/${t["title"]}`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        userVotes: userID,
                      }),
                    });
                    let data = await response.json();
                    console.log(data);
                    console.log();
                  }}
                >
                  <input
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                    value="Vote"
                  />
                </form>
              )}
              <span className="ml-2">{t["votes"]}</span>
            </div>
            <p className="mb-4">{t["owner"]}</p>
            <div className="bg-gradient-to-r from-orange-600 to-pink-400 pt-1">
              <p className="bg-gray-300 dark:bg-[#27273F] text-center py-3">
                {t["description"]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
