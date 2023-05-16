"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logoDark from "../../../public/brainbeats-logo-dark-md.png";
import logoLight from "../../../public/brainbeats-logo-light-md.png";

const Navbar = () => {
  const router = useRouter();

  const removeUserDetails = async () => {
    localStorage.clear();
    await router.push("/login");
  };

  const routeToProfile = async () => {
    let userID = window.localStorage.getItem("username");
    await router.push(`/users/${userID}`);
  };

  // const handleGenerateHTML = () => {
  //   if (token) {
  //     // return nav with profile etc
  //   } else {
  //     // return nav with signin etc
  //   }
  // };

  // Logo either main room or landing page depending on token

  return (
    <div className="flex flex-row items-center justify-between w-full h-24 px-12">
      <picture className="flex flex-col items-center justify-center h-full w-64">
        <source srcSet={logoDark.src} media="(prefers-color-scheme: dark)" />
        <Image src={logoLight} alt="My image" width={300} height={300} />
      </picture>
      <div className="flex flex-row item-center justify-between gap-12">
        <button
          className="py-2 px-4 hover:pointer-cursor font-bold"
          onClick={routeToProfile}>
          Profile
        </button>
        <button
          className="py-2 px-4 hover:pointer-cursor font-bold"
          onClick={removeUserDetails}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
