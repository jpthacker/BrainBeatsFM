"use client";
import { ComponentProps } from "react";

export type CustomOnChangeProps<T> = Omit<T, "onChange"> & {
  onChange: (value: string) => void;
};

export const CustomSelect = (
  props: CustomOnChangeProps<ComponentProps<"select">>
) => {
  return (
    <select
      {...props}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}></select>
  );
};
