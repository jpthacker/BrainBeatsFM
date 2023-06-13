"use client";
import { useRouter } from "next/navigation";
import { ComponentProps, useState } from "react";
import Image from "next/image";

type CustomOnChangeProps<T> = Omit<T, "onChange"> & {
  onChange: (value: string) => void;
};

const CustomSelect = (props: CustomOnChangeProps<ComponentProps<"select">>) => {
  return (
    <select
      {...props}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}></select>
  );
};

const CustomInput = (props: CustomOnChangeProps<ComponentProps<"input">>) => {
  return (
    <input
      {...props}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
    />
  );
};

const SignUpForm = () => {
  const router = useRouter();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [image, setImage] = useState<string>("/images/default-picture.png");

  const imageOptions = {
    defaultPicture: "/images/default-picture.png",
    cello: "/images/cello.png",
    clarinet: "/images/clarinet.png",
    guitarPlayer: "/images/guitar-player.png",
    guitar: "/images/guitar.png",
    headphones: "/images/headphones.png",
    keyboard: "/images/keyboard.png",
    mc: "/images/mc.png",
    rockGuitar: "/images/rock-guitar.png",
    violin: "/images/violin.png",
  };

  const handleSubmit = async () => {
    const data = await fetch("/api/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        // change
        email: email,
        password: password,
        image: image,
      }),
    });
    const res = await data.json();
    console.log(res.message);
    router.push("/login");
  };

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleImageChange = (value: string) => {
    setImage(imageOptions[value]);
  };

  return (
    <div className="flex min-h-full min-w-full flex-col items-center justify-center gap-12 p-24">
      <h1 data-cy="header">Welcome to BrainBeatsFM</h1>
      <div
        className="flex flex-col items-center justify-center w-3/12 bg-gray-300 dark:bg-[#27273F] rounded-3xl shadow-xl py-6"
        data-cy="sign-up-form-container">
        <form
          className="inline-flex flex-col items-center justify-center gap-6 w-4/6 text-xs"
          data-cy="sign-up-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}>
          <div className="h-full w-full bg-gradient-to-r from-orange-600 to-pink-400 pb-1">
            <h3 className="h-full w-full  bg-gray-300 dark:bg-[#27273F] text-center py-3">
              Sign Up
            </h3>
          </div>
          <div className="flex flex-col w-full gap-3 height-12 items-start justify-center">
            <div className="w-full flex flex-col items-center mb-6">
              <Image
                className="border-2 border-white rounded-full"
                src={image}
                alt="Profile picture"
                width={125}
                height={125}
              />
            </div>
            <label
              className="px-2 w-full"
              data-cy="sign-up-form-label-img"
              htmlFor="sign-up-form-img">
              Profile Picture
            </label>
            <CustomSelect
              className="w-full p-2 rounded-md text-slate-900 dark:bg-gray-700 dark:text-[#D9D9D9]"
              name="image-field"
              id="sign-up-form-image"
              onChange={handleImageChange}>
              <option value="defaultPicture">Default Image</option>
              <option value="cello">Cello</option>
              <option value="clarinet">Clarinet</option>
              <option value="guitarPlayer">Guitar Player</option>
              <option value="guitar">Guitar</option>
              <option value="headphones">Headphones</option>
              <option value="keyboard">Keyboard</option>
              <option value="mc">Mic Controller</option>
              <option value="rockGuitar">Rock Guitar</option>
              <option value="violin">Violin</option>
            </CustomSelect>
          </div>
          <div className="flex flex-col w-full gap-3 height-12 items-start justify-center">
            <label
              className="px-2 w-full"
              data-cy="sign-up-form-label-name"
              htmlFor="sign-up-form-name">
              Name
            </label>
            <CustomInput
              className="w-full p-2 rounded-md text-slate-900 dark:bg-gray-700 dark:text-[#D9D9D9]"
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
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
