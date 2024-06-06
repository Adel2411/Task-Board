"use server";

import { signUpInputsType, signInInputsType } from "@/types";

export async function postRegister(inputs: signUpInputsType) {
  const { username, email, password, confirmPassword } = inputs;

  if (username.trim() === "") {
    return "please provide a username";
  } else if (email.trim() === "") {
    return "please provide a email address";
  } else if (password.trim() === "") {
    return "please provide a password";
  } else if (password.trim() !== confirmPassword.trim()) {
    return "passwords provided are not matching";
  }

  const body = { username: username, email: email, password: password };

  try {
    const response = await fetch(`${process.env.CURRENT_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log(response);
    if (!response.ok) {
      return "Response is not OK";
    }

    const data = response.json();
    console.log(data);
    return "success";
  } catch (err) {
    console.error(err);
    return "error";
  }
}

export async function postLogin(inputs: signInInputsType) {
  const { auth_identifier, password } = inputs;
  if (auth_identifier.trim() === "") {
    return "please provide a username or email address";
  } else if (password.trim() === "") {
    return "please provide a password";
  }

  try {
    const response = await fetch(`${process.env.CURRENT_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });

    console.log(response);
    if (!response.ok) {
      return "Response is not OK";
    }

    const data = response.json();
    console.log(data);
    return "success";
  } catch (err) {
    console.error(err);
    return "error";
  }
}
