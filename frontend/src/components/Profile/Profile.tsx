"use client";
import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaPen } from "react-icons/fa";
import Link from "next/link";
import { log } from "console";

interface ProfileProps {
  params: { user: string };
}

interface User {
  id: string;
  image: string;
  name: string;
  email: string;
  password: string;
}

interface Track {
  title: string;
  owner: string;
  genre: string;
  description: string;
  url: string;
  votes: number;
  userVotes: string[];
}

const Profile = ({ params }: ProfileProps) => {
  const [myProfile, setMyProfile] = useState<boolean>(false);
  const [user, setUser] = useState<User | {}>({});
  const [userFound, setUserFound] = useState<boolean>(true);
  const [tracks, setTracks] = useState<Track[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      let response = await fetch("/api/users", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      const filteredUsers = data.users.filter(
        (user: User) => user.name === params["user"].replace(/%20/g, " ")
      );
      console.log(params["user"].replace(/%20/g, " "));
      isEmpty(filteredUsers)
        ? (setUser({}), setUserFound(false))
        : setUser(filteredUsers[0]);
    };
    fetchUsers();
  }, [params, setUser]);

  useEffect(() => {
    const myProfile = () => {
      if (user["_id"] === window.localStorage.getItem("userID")) {
        setMyProfile(true);
      } else {
        setMyProfile(false);
      }
    };
    myProfile();
  }, [user]);

  useEffect(() => {
    const fetchTracks = async () => {
      let response = await fetch(`/api/tracks`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      console.log(data);
      const filteredTracks = data.tracks.filter(
        (track: { userVotes: string | any[] }) => {
          return track.userVotes.includes(user["_id"]) === true;
        }
      );
      setTracks(filteredTracks);
    };
    fetchTracks();
  }, [user]);

  if (!userFound) {
    router.push("/404");
  }

  const redirectToEdit = () => {
    router.push(`users/${user["name"]}/edit`);
  };

  const handleOpenRoom = (name: string) => {
    window.localStorage.setItem("roomName", name);
  };

  const handleRouteToOwner = (track: Track) => {
    const owner = track["owner"];
    const ownerMatch = async () => {
      let response = await fetch(`/api/users/`);
      let data = await response.json();
      console.log(
        data.users.find((user: User) => {
          user["name"].includes(owner);
        })
      );

      const match = data.users.map((user: User) => {
        user["name"] === owner;
      });
      if (match) {
        router.push(`users/${owner}`);
      } else {
        alert("Owner not found");
      }
    };
    ownerMatch();
  };

  const loadEditProfileBtn = () => {
    if (myProfile) {
      return (
        <div className="flex justify-end">
          <button
            className="flex flex-row justify-between items-center gap-4"
            onClick={redirectToEdit}>
            <FaPen className="text-orange-600" />
            Edit Profile
          </button>
        </div>
      );
    }
  };

  return (
    <div className="w-full h-screen py-36 px-48 mb-38">
      <div className="flex h-fit mb-24">
        <Image
          className="border-2 border-white rounded-full"
          src={user["image"]}
          alt="Profile picture"
          width={250}
          height={250}
        />
        <div className="flex min-h-full w-full flex-row items-center ml-16">
          <div className="grid grid-cols-2 w-full">
            <div className="w-80">
              <h2 className="w-full">{user["name"]}</h2>
            </div>
            {loadEditProfileBtn()}
          </div>
        </div>
      </div>
      <div className="mv-24">
        <div className="h-full mv-38 flex flex-col items-center justify-start">
          <h2 className="w-10/12 text-left">Liked Songs</h2>
          {tracks.map((track: Track) => (
            <div
              key={track["_id"]}
              className="mt-12 flex flex-col relative w-10/12 items-start justify-center p-6 rounded-xl bg-gray-300 dark:bg-[#27273F] mb-4">
              <h2 className="mb-1">{track["title"]} </h2>
              <div className="flex items-center absolute right-0 bottom-0 p-9">
                <div className="relative bg-gradient-to-r from-orange-600 to-pink-400 rounded-full p-0.5">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 dark:bg-[#27273F] text-center">
                    {track["votes"]}
                  </span>
                </div>
                <div className="relative bg-gray-300 dark:bg-[#27273F] ml-6"></div>
              </div>
              <p
                className="mb-4 hover:cursor-pointer"
                onClick={() => {
                  handleRouteToOwner(track);
                }}>
                {track["owner"]}
              </p>
              <div className="bg-gradient-to-r from-orange-600 to-pink-400 pt-1">
                <p className="bg-gray-300 dark:bg-[#27273F] text-center py-3">
                  {track["description"]}
                </p>
              </div>
              <Link
                href={`/rooms/${track["genre"]}`}
                onClick={() => {
                  handleOpenRoom(track["genre"]);
                }}>
                <h3 className="underline decoration-orange-600 underline-offset-8">
                  Go to room
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
