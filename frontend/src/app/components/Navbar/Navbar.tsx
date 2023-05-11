"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const removeUserDetails = async () => {
    localStorage.clear();
    await router.push("/login");
  };

  return (
    <div className="flex flex-row items-center justify-end w-full h-16 px-12">
      <button
        className="py-2 px-4 hover:pointer-cursor"
        onClick={removeUserDetails}>
        Sign Out
      </button>
    </div>
  );
};

export default Navbar;
