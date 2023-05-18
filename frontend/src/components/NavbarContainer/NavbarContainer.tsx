"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import NotAuthNavbar from "../NotAuthNavbar/NotAuthNavbar";
import { usePathname } from "next/navigation";

const NavbarContainer = () => {
  const pathname = usePathname();
  const [token, setToken] = useState<any>();
  const getNavbar = () => {
    if (token) {
      return <Navbar />;
    }
    return <NotAuthNavbar />;
  };

  useEffect(() => {
    setToken(window.localStorage.getItem("token"));
  }, [pathname]);

  return <div>{getNavbar()}</div>;
};

export default NavbarContainer;
