"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {}

const page = () => {
  const [name, setName] = useState(
    `${window.localStorage.getItem("username")}`
  );
  const [password, setPassword] = useState(
    `${window.localStorage.getItem("password")}`
  );
  const [image, setImage] = useState(`${window.localStorage.getItem("image")}`);
  const username = window.localStorage.getItem("username");
  const router = useRouter();

  const imageOptions = {
    defaultPicture: "/images/default-picture.png",
    cello: "/images/cello.png",
    clarinet: "/images/clarinet.png",
    guitarPlayer: "/images/guitar-player.png",
    guitar: "/images/guitar.png",
    headphones: "/images/headphones.png",
    keyboard: "/images/keyboard.png",
    mc: "/images/mc.png",
    rockGuitar: "/images/rock-guitar.png",
    violin: "/images/violin.png",
    synthwave: "/images/synthwave.png",
  };

  const fetchUserProfile = async () => {
    let response = await fetch(`/api/users/${username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password, image }),
    });
    let data = await response.json();
    console.log(data);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.value;
    setImage(imageOptions[selectedImage]);
  };

  return (
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-center gap-12 p-24">
      <div
        className="py-12 flex flex-col items-center w-1/3 bg-gray-300 dark:bg-[#27273F] rounded-3xl shadow-xl"
        data-cy="sign-up-form-container">
        <form
          className="inline-flex flex-col gap-6 w-4/6"
          data-cy="sign-up-form"
          onSubmit={(e) => {
            e.preventDefault();
            fetchUserProfile();
            window.localStorage.setItem("username", name);
            window.localStorage.setItem("password", password);
            window.localStorage.setItem("image", image);
            router.push(`/users/${name}`);
          }}>
          <div className="h-full w-full bg-gradient-to-r from-orange-600 to-pink-400 pb-1">
            <h3 className="h-full w-full  bg-gray-300 dark:bg-[#27273F] text-center py-3">
              Edit Profile
            </h3>
          </div>
          <div className="flex flex-col w-full gap-3 height-12 items-start justify-center">
            <div className="w-full flex flex-col items-center mb-6">
              <Image
                className="bg-gradient-to-r from-orange-600 p-1 to-pink-400 rounded-full"
                src={image}
                alt="Profile picture"
                width={125}
                height={125}
              />
            </div>
            <label
              className="px-2 w-full"
              data-cy="sign-up-form-label-img"
              htmlFor="sign-up-form-img">
              Choose a Profile Picture
            </label>
            <select
              className="w-full p-2 rounded-md text-slate-900"
              name="image-field"
              id="sign-up-form-image"
              onChange={handleImageChange}>
              <option value="defaultPicture">Default Image</option>
              <option value="cello">Cello</option>
              <option value="clarinet">Clarinet</option>
              <option value="guitarPlayer">Guitar Player</option>
              <option value="guitar">Guitar</option>
              <option value="headphones">Headphones</option>
              <option value="keyboard">Keyboard</option>
              <option value="mc">Mic Controller</option>
              <option value="rockGuitar">Rock Guitar</option>
              <option value="violin">Violin</option>
              <option value="synthwave">Synthwave</option>
            </select>
          </div>
          <div className="flex flex-col w-full gap-3 height-12 items-start justify-center">
            <label
              className="px-2 w-full"
              data-cy="sign-up-form-label-name"
              htmlFor="sign-up-form-name">
              Current Name - <span className="font-bold">{name}</span>
            </label>
            <input
              className="w-full p-2 rounded-md text-slate-900 dark:bg-gray-700 dark:text-[#D9D9D9]"
              id="sign-up-form-name"
              placeholder="New Name"
              type="text"
              onChange={handleNameChange}
            />
          </div>
          <div className="flex flex-col w-full gap-3 height-12 items-start justify-center">
            <label
              className="px-2 w-full"
              data-cy="sign-up-form-label-password"
              htmlFor="sign-up-form-password">
              Current Password - <span className="font-bold">(hidden)</span>
            </label>
            <input
              className="w-full p-2 rounded-md text-slate-900 dark:bg-gray-700 dark:text-[#D9D9D9]"
              data-cy="sign-up-form-input-password"
              id="sign-up-form-password"
              placeholder="New Password"
              type="password"
              onChange={handlePasswordChange}
            />
          </div>
          <input
            className="mt-6 px-16 py-3 bg-gradient-to-r from-orange-600 to-pink-400 rounded-md self-center font-bold hover:cursor-pointer hover:bg-none hover:bg-rose-400"
            data-cy="sign-up-form-btn"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
};

export default page;
