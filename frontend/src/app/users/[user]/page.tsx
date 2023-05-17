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
        console.log(user["_id"]);
        track.userVotes.includes(user["_id"]);
      });
      setTracks(filteredTracks);
    };
    fetchTracks();
  }, [myProfile]);

  if (userFound === false) {
    router.push("/404");
  }

  const routeToEdit = async () => {
    await router.push(`users/${user["name"]}/edit`);
  };

  if (myProfile === true) {
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
            <div className="grid grid-cols-2 w-full">
              <div className="w-80">
                <h2 className="w-full">{user["name"]}</h2>
                <p className="block">GENERES GO HERE</p>
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
        <div
          className="border-2 h-4"
          onClick={() => {
            console.log(tracks);
          }}>
          {tracks.map((r) => (
            <div key={r["_id"]}>{r["title"]}</div>
          ))}
        </div>
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
      </div>
    );
  }
};

export default page;
