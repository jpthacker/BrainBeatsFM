"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faCheckCircle,
} from "@fortawesome/fontawesome-free-regular";
import WaveSurfer from "wavesurfer.js";
import { FaPlayCircle, FaCheck } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { forEach } from "cypress/types/lodash";

const Room = () => {
  const router = useRouter();
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
  const [firstTrack, setFirstTrack] = useState<any>("trackloading");
  const waveSurferRef = React.useRef<any | null>(null);
  const slicedTracks = tracks.slice(1);

  React.useEffect(() => {
    setFirstTrack(tracks[0]);
  }, [tracks]);

  React.useEffect(() => {
    const sortedTracks = [...tracks].sort((a, b) => b.votes - a.votes);

    if (JSON.stringify(sortedTracks) !== JSON.stringify(tracks)) {
      setTracks(sortedTracks);
    }
  }, [tracks]);

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
      wavesurfer.load(firstTrack["url"]);
      wavesurfer.on("ready", function () {
        waveSurferRef.current = wavesurfer;
        wavesurfer.play();
      });
      return () => {
        wavesurfer.destroy();
      };
    }
  }, [audio, firstTrack]);

  const handleLoadCards = () => {
    if (firstTrack === "trackloading") {
      return <p>Loading...</p>;
    } else if (firstTrack && firstTrack.title) {
      if (cards) {
        return (
          <div className="w-full flex flex-col items-center justify-start">
            <div
              className="flex-1 flex-col items-start justify-center mb-6 p-6 rounded-xl bg-gray-300 dark:bg-[#27273F] shadow-xl w-11/12"
              key={firstTrack["_id"]}
            >
              <div className="flex flex-row items-center justify-center mb-6 gap-4 px-4">
                <FaPlayCircle
                  className="w-24 h-24 fill-[#FC5425] hover:fill-[#E23D93] hover:cursor-pointer"
                  onClick={() => {
                    waveSurferRef.current.playPause();
                  }}
                />
                <div className="flex flex-col items-start w-4/12">
                  <h2 className="mb-1">{firstTrack["title"]}</h2>
                  <Link href={`users/${firstTrack["owner"]}`}>
                    <p className="mb-4">{firstTrack["owner"]}</p>
                  </Link>
                </div>
                <div id="waveform" className="w-full"></div>
              </div>
              <div className="w-full mx-24">
                <div className="w-1/2 flex flex-col items-start justify-start bg-gradient-to-r from-orange-600 to-pink-400 pt-1">
                  <p className="w-full bg-gray-300 dark:bg-[#27273F] py-3">
                    {firstTrack["description"]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="w-full flex flex-col items-center justify-start">
            <button
              className="w-full flex justify-center"
              onClick={() => {
                setCards(true);
                setAudio(true);
              }}
            >
              <div className="flex flex-col w-11/12 items-start justify-center p-16 rounded-xl bg-gray-300 dark:bg-[#27273F] mb-4 relative">
                <h2 className="uppercase">
                  Currently Playing - {firstTrack["title"]}{" "}
                </h2>
                <FontAwesomeIcon
                  className="absolute right-0 pr-16 text-6xl"
                  icon={faArrowAltCircleRight}
                />
                <div className="bg-gradient-to-r from-orange-600 to-pink-400 pb-1 w-6/12">
                  <p className="text-sm flex bg-gray-300 dark:bg-[#27273F] text-center pb-6">
                    Click to listen!
                  </p>
                </div>
              </div>
            </button>
          </div>
        );
      }
    } else {
      return null;
    }
  };

  // const handleRouteToOwner = (t: { [x: string]: any }) => {
  //   const owner = t["owner"];
  //   const ownerMatch = async () => {
  //     let response = await fetch(`/api/users/`);
  //     let data = await response.json();
  //     console.log(
  //       data.users.find((u) => {
  //         u["name"].includes(owner);
  //       })
  //     );

  //     const match = data.users.map((u) => {
  //       u["name"] === owner;
  //     });
  //     if (match) {
  //       router.push(`users/${owner}`);
  //     } else {
  //       alert("Owner not found");
  //     }
  //   };
  //   ownerMatch();
  // };

  return (
    <div className="flex flex-col min-w-screen min-h-screen p-16">
      <div className="min-w-full flex flex-col items-start justify-around gap-4 pt-12">
        <h2 className="capitalize">{room.data.name}</h2>
        <h3>{`A room dedicated to AI ${room.data.name} music`}</h3>
        <div className="w-full">{handleLoadCards()}</div>
      </div>
      <div className="w-full flex flex-col items-center justify-start">
        {slicedTracks.map((t) => (
          <div
            className="flex flex-col relative w-10/12 items-start justify-center p-6 rounded-xl bg-gray-300 dark:bg-[#27273F] mb-4"
            key={t["_id"]}
          >
            <h2 className="mb-1">{t["title"]} </h2>
            <div className="flex items-center absolute right-0 bottom-0 p-9">
              <div className="relative bg-gradient-to-r from-orange-600 to-pink-400 rounded-full p-0.5">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 dark:bg-[#27273F] text-center">
                  {t["votes"]}
                </span>
              </div>
              {t["userVotes"].includes(userID) ? (
                <p className="flex items-center uppercase justify-center p-1 ml-4 rounded-full bg-gradient-to-r from-orange-600 to-pink-400 text-center">
                  <FontAwesomeIcon className="text-3xl" icon={faCheckCircle} />
                </p>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    let response = await fetch(`/api/tracks/${t["title"]}`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        trackID: t["_id"],
                        userVotes: userID,
                      }),
                    });

                    const updatedTracks = tracks.map((track) => {
                      if (track["_id"] === t["_id"]) {
                        return {
                          ...track,
                          votes: track["votes"] + 1,
                          userVotes: [...track["userVotes"], userID],
                        };
                      }
                      return track;
                    });

                    setTracks(updatedTracks);
                  }}
                >
                  <div className="relative bg-gray-300 dark:bg-[#27273F] ml-6">
                    <input
                      className="flex cursor-pointer items-center uppercase font-bold justify-center rounded py-2 px-12 bg-gradient-to-r from-orange-600 to-pink-400 text-center"
                      type="submit"
                      value="Vote"
                    />
                  </div>
                </form>
              )}
            </div>
            <Link href={`users/${t["owner"]}`}>
              <p className="mb-4">{t["owner"]}</p>
            </Link>
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
