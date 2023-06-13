"use client";
import { ComponentProps } from "react";
import { CustomOnChangeProps } from "../CustomSelect/CustomSelect";

export const CustomInput = (
  props: CustomOnChangeProps<ComponentProps<"input">>
) => {
  return (
    <input
      {...props}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
    />
  );
};
