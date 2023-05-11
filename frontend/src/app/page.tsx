"use client";

import React from "react";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async () => {
    const data = await fetch("/api/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    const res = await data.json();
    console.log(res.message);
  };

  const handleNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  return (
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-center gap-12 p-24">
      <h1 data-cy="header">Welcome to BrainBeatsFM</h1>
      <div
        className="py-12 flex flex-col items-center w-2/5 bg-gray-300 dark:bg-slate-800 rounded-3xl"
        data-cy="sign-up-form-container">
        <form
          className="inline-flex flex-col gap-6 w-4/6"
          data-cy="sign-up-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}>
          <h3 className="w-full border-b-4 border-gray-500 dark:border-white text-center py-3 mb-6">
            Sign Up
          </h3>
          <div className="flex flex-col w-full gap-3 height-12 items-start justify-center">
            <label
              className="px-2 w-full"
              data-cy="sign-up-form-label-name"
              htmlFor="sign-up-form-name">
              Name
            </label>
            <input
              className="w-full p-2 rounded-md text-slate-900"
              id="sign-up-form-name"
              placeholder="Name"
              type="text"
              onChange={handleNameChange}
            />
          </div>
          <div className="flex flex-col w-full gap-3 height-12 items-start justify-center">
            <label
              className="px-2 w-full"
              data-cy="sign-up-form-label-email"
              htmlFor="sign-up-form-email">
              Email
            </label>
            <input
              className="w-full p-2 rounded-md text-slate-900"
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
            <input
              className="w-full p-2 rounded-md text-slate-900"
              data-cy="sign-up-form-input-password"
              id="sign-up-form-password"
              placeholder="Password"
              type="password"
              onChange={handlePasswordChange}
            />
          </div>
          <input
            className="mt-6 px-16 py-3 bg-white text-gray-600 rounded-md self-center hover:cursor-pointer"
            data-cy="sign-up-form-btn"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Home;
