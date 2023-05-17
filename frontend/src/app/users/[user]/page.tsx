"use client";
import React, { FC, useState, useEffect } from "react";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/fontawesome-free-solid";

interface pageProps {
  params: { name: string };
}

const page: FC<pageProps> = ({ params }) => {
  const [myProfile, setMyProfile] = useState(false);
  const [user, setUser] = useState({});
  const [userFound, setUserFound] = useState(true);
  const [tracks, setTracks] = useState([]);
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
      const filteredUser = data.users.filter(
        (user) => user.name === params["user"]
      );
      isEmpty(filteredUser)
        ? (setUser([]), setUserFound(false))
        : setUser(filteredUser[0]);
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
      const filteredTracks = data.tracks.filter((track) => {
        return track.userVotes.includes(user["_id"]) === true;
      });
      setTracks(filteredTracks);
    };
    fetchTracks();
  }, [user]);

  if (userFound === false) {
    router.push("/404");
  }

  const routeToEdit = async () => {
    await router.push(`users/${user["name"]}/edit`);
  };

  const loadTracksHTML = () => {
    return (
      <div className="h-4 mt-24 flex flex-col items-center justify-start border-2">
        <p className="block w-10/12 text-left">Liked Songs</p>
        {tracks.map((t) => (
          <div
            key={t["_id"]}
            className="flex flex-col relative w-10/12 items-start justify-center p-6 rounded-xl bg-gray-300 dark:bg-[#27273F] mb-4">
            <h2 className="mb-1">{t["title"]} </h2>
            <div className="flex items-center absolute right-0 bottom-0 p-9">
              <div className="relative bg-gradient-to-r from-orange-600 to-pink-400 rounded-full p-0.5">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 dark:bg-[#27273F] text-center">
                  {t["votes"]}
                </span>
              </div>
              <div className="relative bg-gray-300 dark:bg-[#27273F] ml-6"></div>
            </div>
            <p className="mb-4">{t["owner"]}</p>
            <div className="bg-gradient-to-r from-orange-600 to-pink-400 pt-1">
              <p className="bg-gray-300 dark:bg-[#27273F] text-center py-3">
                {t["description"]}
              </p>
            </div>
            <p>{`Found in the ${t["genre"]} room`}</p>
          </div>
        ))}
      </div>
    );
  };

  if (myProfile === true) {
    return (
      <div className="w-full h-12 py-36 px-48">
        <div className="flex">
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
              <div className="flex justify-end">
                <button onClick={routeToEdit}>
                  <FontAwesomeIcon
                    className="pr-2 text-orange-600"
                    icon={faPencilAlt}
                  />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>{loadTracksHTML()}</div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-12 py-16 px-16">
        <div className="flex">
          <Image
            className="border-2 border-white rounded-full"
            src={user["image"]}
            alt="Profile picture"
            width={250}
            height={250}
          />
          <div className="flex min-h-full w-full flex-row items-center ml-16">
            <div className="w-full">
              <div className="w-80">
                <h2 className="w-full">{user["name"]}</h2>
                <p className="block">GENRES GO HERE</p>
              </div>
            </div>
          </div>
        </div>
        <div>{loadTracksHTML()}</div>
      </div>
    );
  }
};

export default page;
