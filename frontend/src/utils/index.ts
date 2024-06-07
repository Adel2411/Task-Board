"use server";

import { signUpInputsType, signInInputsType } from "@/types";

export async function postRegister(inputs: signUpInputsType) {
  const { username, email, password, confirmPassword } = inputs;

  if (username.trim() === "") {
    return "Please provide a username.";
  } else if (email.trim() === "") {
    return "Please provide an email address.";
  } else if (password.trim() === "") {
    return "Please provide a password.";
  } else if (password.trim() !== confirmPassword.trim()) {
    return "Passwords provided are not matching.";
  }

  const body = { username, email, password };

  try {
    const response = await fetch(`${process.env.CURRENT_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData.message || "An error occurred during registration.";
    }

    return "We have sent you a confirmation email. Please verify your email address.";
  } catch (err) {
    console.error("Registration error:", err);
    return "An error occurred during registration.";
  }
}

export async function postLogin(inputs: signInInputsType) {
  const { auth_identifier, password } = inputs;

  if (auth_identifier.trim() === "") {
    return "Please provide a username or email address.";
  } else if (password.trim() === "") {
    return "Please provide a password.";
  }

  try {
    const response = await fetch(`${process.env.CURRENT_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ auth_identifier, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData.message || "An error occurred during login.";
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Login error:", err);
    return "An error occurred during login.";
  }
}

export async function checkValidToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.CURRENT_URL}/boards/getAll`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.ok;
  } catch (error) {
    console.error("Failed to verify token", error);
    return false;
  }
}
