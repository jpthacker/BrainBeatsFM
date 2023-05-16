"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      console.log(response);
    } else {
      let data = await response.json();
      
      console.log(data);
      window.localStorage.setItem("username", data.username);
      window.localStorage.setItem("password", data.password);
      window.localStorage.setItem("image", data.image);
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("userID", data.userID);
      await router.push("/rooms");
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-center gap-12 p-24">
      <h1 data-cy="header">BrainBeatsFM</h1>
      <div
        className="py-12 flex flex-col items-center w-2/5 bg-gray-300 dark:bg-slate-800 rounded-3xl"
        data-cy="sign-up-form-container">
        <form
          className="inline-flex flex-col gap-6 w-4/6"
          data-cy="sign-up-form"
          onSubmit={handleSubmit}>
          <h3 className="w-full border-b-4 border-gray-500 dark:border-white text-center py-3 mb-6">
            Welcome Back!
          </h3>
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
            value="Login"
          />
        </form>
      </div>
    </div>
  );

};

export default LoginForm;