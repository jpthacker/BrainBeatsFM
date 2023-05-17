"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logoDark from "../../../public/brainbeats-logo-dark-md.png";
import logoLight from "../../../public/brainbeats-logo-light-md.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NotAuthNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-row items-center justify-between w-full h-24 px-12">
      <picture
        className="flex flex-col items-center justify-center h-full w-64 hover:cursor-pointer"
        onClick={() => {
          router.push("/");
        }}>
        <source srcSet={logoDark.src} media="(prefers-color-scheme: dark)" />
        <Image src={logoLight} alt="My image" width={300} height={300} />
      </picture>
      <div className="flex flex-row item-center justify-between gap-12">
        <div>
          <Link
            href="/signup"
            className="py-2 px-4 hover:pointer-cursor font-bold">
            Sign Up
          </Link>
          <div
            className={
              pathname === "/signup"
                ? "h-2 rounded-md bg-gradient-to-r from-orange-600 to-pink-400"
                : "h-2"
            }></div>
        </div>
        <div>
          <Link
            href="/login"
            className="py-2 px-4 hover:pointer-cursor font-bold">
            Sign In
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

export default NotAuthNavbar;
