"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../../public/brainbeats-logo-dark-md.png";

const Navbar = () => {
  const router = useRouter();

  const removeUserDetails = async () => {
    localStorage.clear();
    await router.push("/login");
  };

  return (
    <div className="flex flex-row items-center justify-between w-full h-24 px-12">
      <Image src={logo} width={300} height={20} alt="brainbeatsfm logo" />
      <button
        className="py-2 px-4 hover:pointer-cursor"
        onClick={removeUserDetails}>
        Sign Out
      </button>
    </div>
  );
};

export default Navbar;
