"use client";

import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { inputFieldProps } from "@/types";
import { useState } from "react";

const InputField = ({
  name,
  value,
  onChange,
  placeholder,
  type,
}: inputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-between text-sm text-background-dark dark:text-background opacity-50">
        <label htmlFor={name}>{placeholder}</label>
        {type === "password" && (
          <button
            className="flex items-center gap-1"
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <BiSolidHide /> : <BiSolidShow />}
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
      <input
        className="bg-background dark:bg-background-dark border-[1px] w-full h-12 px-3 rounded-xl border-background-dark dark:border-background opacity-50"
        type={type === "password" && showPassword ? "text" : type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter your ${placeholder}...`}
      />
    </div>
  );
};

export default InputField;
