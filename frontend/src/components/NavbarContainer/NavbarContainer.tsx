"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { usePathname } from "next/navigation";

const NavbarContainer = () => {
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(window.localStorage.getItem("token"));
  }, [pathname]);

  return token ? (
    <Navbar links={["profile", "rooms", "signout"]} />
  ) : (
    <Navbar links={["signup", "signin"]} />
  );
};
export default NavbarContainer;
