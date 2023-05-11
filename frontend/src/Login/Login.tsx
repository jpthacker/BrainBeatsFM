'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/api/tokens", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if(response.status !== 201) {
      setEmail("")
      setPassword("")
      console.log(response)
    } else {
      let data = await response.json()
      console.log(data);
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("userID", data.userID);
      await router.push("/");
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <section className="login">
      <form id="login-form" className="login-form" onSubmit={handleSubmit}>
        <input placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange} />
        <input placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} />
        <button id="login-form-button" type="submit" form="login-form">Submit</button>
      </form>
      <h1>{email}</h1>
      <h1>{password}</h1>
    </section>
  );

};

export default LoginForm;