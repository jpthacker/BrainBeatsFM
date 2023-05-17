"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logoDark from "../../../public/brainbeats-logo-dark-md.png";
import logoLight from "../../../public/brainbeats-logo-light-md.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const removeUserDetails = () => {
    window.localStorage.clear();
    console.log(window.localStorage.getItem("token"));
    router.push("/login");
  };

  const routeToProfile = () => {
    let userID = window.localStorage.getItem("username");
    router.push(`/users/${userID}`);
  };

  // Logo either main room or landing page depending on token

  return (
    <div className="flex flex-row items-center justify-between w-full h-24 px-12">
      <picture
        className="flex flex-col items-center justify-center h-full w-64 hover:cursor-pointer"
        onClick={() => {
          router.push("/rooms");
        }}>
        <source srcSet={logoDark.src} media="(prefers-color-scheme: dark)" />
        <Image src={logoLight} alt="My image" width={300} height={300} />
      </picture>
      <div className="flex flex-row item-center justify-between gap-12">
        <div>
          <Link
            href={`/users/${window.localStorage.getItem("username")}`}
            className="py-2 px-4 hover:pointer-cursor font-bold"
            onClick={routeToProfile}>
            Profile
          </Link>
          <div
            className={
              pathname.includes("/users/")
                ? "h-2 rounded-md bg-gradient-to-r from-orange-600 to-pink-400"
                : "h-2"
            }></div>
        </div>
        <div>
          <Link
            href="/rooms"
            className="py-2 px-4 hover:pointer-cursor font-bold">
            Rooms
          </Link>
          <div
            className={
              pathname === "/rooms"
                ? "h-2 rounded-md bg-gradient-to-r from-orange-600 to-pink-400"
                : "h-2"
            }></div>
        </div>
        <div>
          <Link
            href="/login"
            className="py-2 px-4 hover:pointer-cursor font-bold"
            onClick={removeUserDetails}>
            Sign Out
          </Link>
          <div
            className={
              pathname === "/login"
                ? "h-2 rounded-md bg-gradient-to-r from-orange-600 to-pink-400"
                : "h-2"
            }></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
