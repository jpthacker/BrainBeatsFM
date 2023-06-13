"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logoDark from "../../../public/brainbeats-logo-dark-md.png";
import logoLight from "../../../public/brainbeats-logo-light-md.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavBarProps {
  links: string[];
}

const Navbar = (props: NavBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [userPath, setUserPath] = useState<string | null>(null);

  useEffect(() => {
    const username = window.localStorage.getItem("username");
    setUserPath(username);
  }, []);

  const removeUserDetails = () => {
    window.localStorage.clear();
    console.log(window.localStorage.getItem("token"));
    router.push("/login");
  };

  const renderLinks = (): React.ReactNode => {
    const handleLinkRoute = (route: string) => {
      if (route === "profile") {
        return `/users/${userPath}`;
      } else if (route === "signin" || route === "signout") {
        return "/login";
      } else {
        return `/${route}`;
      }
    };

    const handleLinkText = (route: string) => {
      let linkText = route;
      if (route.includes("sign")) {
        linkText = route.replace(/^(.{4})(.*)$/, "$1 $2 $3");
      }
      return linkText.charAt(0).toUpperCase() + linkText.slice(1);
    };

    const linksJSX = props.links.map((linkName) => {
      <div>
        <Link
          href={handleLinkRoute(linkName)}
          className="py-2 px-4 hover:pointer-cursor font-bold">
          {handleLinkText(linkName)}
        </Link>
        <div
          className={
            pathname.includes(`/${linkName}`)
              ? "h-2 rounded-md bg-gradient-to-r from-orange-600 to-pink-400"
              : "h-2"
          }></div>
      </div>;
    });
    return linksJSX;
  };

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
        {renderLinks()}
        {/* <div>
          <Link
            href={`/users/${window.localStorage.getItem("username")}`}
            className="py-2 px-4 hover:pointer-cursor font-bold">
            Profile
          </Link>
          <div
            className={
              pathname.includes("/users/")
                ? "h-2 rounded-md bg-gradient-to-r from-orange-600 to-pink-400"
                : "h-2"
            }></div>
        </div> */}
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
        {/* <div>
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
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
