"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface Props {}

const Navbar = () => {
  const router = useRouter();

  const removeUserDetails = async () => {
    localStorage.clear();
    await router.push("/login");
  };

  return (
    <div className="w-screen h-30">
      <button onClick={removeUserDetails}>Sign Out</button>
    </div>
  );
};

export default Navbar;
