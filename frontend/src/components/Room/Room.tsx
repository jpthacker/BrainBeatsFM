"use client";
import React from "react";

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

  return (
    <div className="flex flex-col min-w-screen min-h-screen p-16">
      <div className="min-w-full flex flex-col items-start justify-around gap-4 py-12">
        <h2 className="capitalize">{room.data.name}</h2>
        <h3>{`A room dedicated to AI ${room.data.name} music`}</h3>
      </div>
      <div className="">
        {tracks.map((t) => (
          <div
            className="flex flex-col items-start justify-center p-6 rounded-xl bg-gray-300 dark:bg-[#27273F]"
            key={t["_id"]}>
            <h2 className="mb-1">{t["title"]}</h2>
            <p className="mb-4">{t["owner"]}</p>
            <div className="bg-gradient-to-r from-orange-600 to-pink-400 pt-1">
              <p className="bg-gray-300 dark:bg-[#27273F] text-center py-3">
                {t["description"]}
              </p>
            </div>
            <audio controls>
              <source src={t["url"]} type="audio/mpeg" />
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
