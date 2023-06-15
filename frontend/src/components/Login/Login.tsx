"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CustomInput } from "../CustomInput/CustomInput";

const LoginForm = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const router = useRouter();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    let response = await fetch("/api/tokens", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (response.status !== 201) {
      setEmail("");
      setPassword("");
    } else {
      let data = await response.json();
      window.localStorage.setItem("username", data.username);
      window.localStorage.setItem("password", data.password);
      window.localStorage.setItem("image", data.image);
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("userID", data.userID);
      router.push("/rooms");
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  return (
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-center gap-12 p-24">
      <h1 data-cy="header">BrainBeatsFM</h1>
      <div
        className="flex flex-col items-center justify-center w-3/12 bg-gray-300 dark:bg-[#27273F] rounded-3xl shadow-xl py-6"
        data-cy="sign-up-form-container">
        <form
          className="inline-flex flex-col items-center justify-center gap-6 w-4/6 text-xs"
          data-cy="sign-up-form"
          onSubmit={handleSubmit}>
          <div className="h-full w-full bg-gradient-to-r from-orange-600 to-pink-400 pb-1">
            <h3 className="h-full w-full  bg-gray-300 dark:bg-[#27273F] text-center py-3">
              Welcome Back
            </h3>
          </div>
          <div className="flex flex-col w-full gap-3 height-12 items-start justify-center">
            <label
              className="px-2 w-full"
              data-cy="sign-up-form-label-email"
              htmlFor="sign-up-form-email">
              Email
            </label>
            <CustomInput
              className="w-full p-2 rounded-md text-slate-900 dark:bg-gray-700 dark:text-[#D9D9D9]"
              data-cy="sign-up-form-input-email"
              id="sign-up-form-email"
              placeholder="Email"
              type="text"
              onChange={handleEmailChange}
            />
          </div>
          <div className="flex flex-col w-full gap-3 height-12 items-start justify-center">
            <label
              className="px-2 w-full"
              data-cy="sign-up-form-label-password"
              htmlFor="sign-up-form-password">
              Password
            </label>
            <CustomInput
              className="w-full p-2 rounded-md text-slate-900 dark:bg-gray-700 dark:text-[#D9D9D9]"
              data-cy="sign-up-form-input-password"
              id="sign-up-form-password"
              placeholder="Password"
              type="password"
              onChange={handlePasswordChange}
            />
          </div>
          <input
            className="mt-6 px-16 py-3 bg-gradient-to-r from-orange-600 to-pink-400 rounded-md self-center font-bold hover:cursor-pointer hover:bg-none hover:bg-rose-400"
            data-cy="sign-up-form-btn"
            type="submit"
            value="Sign In"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
