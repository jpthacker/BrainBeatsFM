"use client";
import React, { useState } from "react";
import VoteButton from "../VoteButton/VoteButton";

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

  // Voting functions

  const [votes, setVotes] = useState(0);
  const [removeVoteButton, setRemoveVoteButton] = useState(false);
  const [title, setTitle] = useState("");

  const handleVoteUp = () => {
    // Make an API call to update the vote count on the server
    // You can use axios or fetch to make the request
    // Update the vote count in the component state
    setVotes(votes + 1);
    setRemoveVoteButton(true);
  };

  return (
    <div className="flex flex-col min-w-screen min-h-screen p-16">
      <div className="min-w-full flex flex-col items-start justify-around gap-4 py-12">
        <h2 className="capitalize">{room.data.name}</h2>
        <h3>{`A room dedicated to AI ${room.data.name} music`}</h3>
      </div>
      <div className="w-full flex flex-col items-center justify-start">
        {tracks.map((t) => (
          <div
            className="flex flex-col w-10/12 items-start justify-center p-6 rounded-xl bg-gray-300 dark:bg-[#27273F]"
            key={t["_id"]}
          >
            <h2 className="mb-1">{t["title"]} </h2>
            <div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  let response = await fetch(`/api/tracks/${t["title"]}`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      votes,
                    }),
                  });
                  let data = await response.json();
                  console.log(data);
                }}
              >
                <input
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                  value="Vote"
                />
              </form>
              <span className="ml-2">{votes}</span>
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
