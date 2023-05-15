"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logoDark from "../../../../public/brainbeats-logo-dark-md.png";
import logoLight from "../../../../public/brainbeats-logo-light-md.png";

const Navbar = () => {
  const router = useRouter();

  const removeUserDetails = async () => {
    localStorage.clear();
    await router.push("/login");
  };

  return (
    <div className="flex flex-row items-center justify-between w-full h-24 px-12">
      <picture className="flex flex-col items-center justify-center h-full w-64">
        <source srcSet={logoDark.src} media="(prefers-color-scheme: dark)" />
        <Image src={logoLight} alt="My image" width={300} height={300} />
      </picture>
      <button
        className="py-2 px-4 hover:pointer-cursor"
        onClick={removeUserDetails}>
        Sign Out
      </button>
    </div>
  );
};

export default Navbar;
