"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logoDark from "../../../public/brainbeats-logo-dark-md.png";
import logoLight from "../../../public/brainbeats-logo-light-md.png";
import { usePathname } from "next/navigation";

type NavLink = "profile" | "rooms" | "signout" | "signup" | "signin";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [userPath, setUserPath] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [navProps, setNavProps] = useState<NavLink[]>(["signup", "signin"]);

  useEffect(() => {
    setToken(window.localStorage.getItem("token"));
    token
      ? setNavProps(["profile", "rooms", "signout"])
      : setNavProps(["signup", "signin"]);
  }, [pathname, token]);

  useEffect(() => {
    const username = window.localStorage.getItem("username");
    setUserPath(username);
  }, [navProps]);

  const removeUserDetails = () => {
    window.localStorage.clear();
    console.log(window.localStorage.getItem("token"));
    router.push("/login");
  };

  const handleLogoLinkRoute = () => {
    return navProps.includes("rooms") ? "/rooms" : "/";
  };

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
      linkText = route.replace(/^(.{4})(.*)$/, "$1 $2");
    }
    return linkText.charAt(0).toUpperCase() + linkText.slice(1);
  };

  return (
    <div className="flex flex-row items-center justify-between w-full h-24 px-12">
      <picture
        className="flex flex-col items-center justify-center h-full w-64 hover:cursor-pointer"
        onClick={() => {
          router.push(`${handleLogoLinkRoute()}`);
        }}>
        <source srcSet={logoDark.src} media="(prefers-color-scheme: dark)" />
        <Image src={logoLight} alt="My image" width={300} height={300} />
      </picture>
      <div className="flex flex-row item-center justify-between gap-12">
        {navProps.map((linkName: string) =>
          linkName === "signout" ? (
            <div key={linkName}>
              <Link
                href={handleLinkRoute(linkName)}
                className="py-2 px-4 hover:pointer-cursor font-bold"
                onClick={removeUserDetails}>
                {handleLinkText(linkName)}
              </Link>
              <div
                className={
                  pathname.includes(`${handleLinkRoute(linkName)}`)
                    ? "h-2 rounded-md bg-gradient-to-r from-orange-600 to-pink-400"
                    : "h-2"
                }></div>
            </div>
          ) : (
            <div key={linkName}>
              <Link
                href={handleLinkRoute(linkName)}
                className="py-2 px-4 hover:pointer-cursor font-bold">
                {handleLinkText(linkName)}
              </Link>
              <div
                className={
                  pathname.includes(`${handleLinkRoute(linkName)}`)
                    ? "h-2 rounded-md bg-gradient-to-r from-orange-600 to-pink-400"
                    : "h-2"
                }></div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Navbar;
