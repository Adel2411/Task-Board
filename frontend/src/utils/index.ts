"use server";

import {
  signUpInputsType,
  signInInputsType,
  resetPasswordInputsType,
  forgotPasswordInputsType,
  boardModalInputsType,
  Board,
  taskModalInputsType,
} from "@/types";

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
    return "success";
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
      return errorData.message || "An error occurred during Sign in";
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Signin error:", err);
    return "An error occurred during Sign in";
  }
}

export async function postForgotPassword(inputs: forgotPasswordInputsType) {
  const { email } = inputs;

  if (email.trim() === "") {
    return "Please provide an email address.";
  }

  try {
    const response = await fetch(
      `${process.env.CURRENT_URL}/auth/request-password-reset`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      },
    );

    return response.ok;
  } catch (err) {
    console.error("Forgot password error:", err);
    return false;
  }
}

export async function postResetPassword(
  token: string,
  inputs: resetPasswordInputsType,
) {
  const { password, confirmPassword } = inputs;

  if (password.trim() === "") {
    return "Please provide a password.";
  } else if (password.trim() !== confirmPassword.trim()) {
    return "Passwords provided are not matching.";
  }

  try {
    const response = await fetch(
      `${process.env.CURRENT_URL}/auth/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, token }),
      },
    );

    return response.ok;
  } catch (err) {
    console.error("Forgot password error:", err);
    return false;
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

export async function getUser(token: string) {
  try {
    const response = await fetch(`${process.env.CURRENT_URL}/user/user-data`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to get user", error);
    return null;
  }
}

// Boards API
export async function getBoards(token: string) {
  try {
    const response = await fetch(`${process.env.CURRENT_URL}/boards/getAll`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to get boards", error);
    return null;
  }
}

export async function addBoard(token: string, inputs: boardModalInputsType) {
  const body = { ...inputs, is_public: true };

  if (inputs.name.trim() === "") {
    return "Please provide a title.";
  }

  try {
    const response = await fetch(`${process.env.CURRENT_URL}/boards/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Failed to add board", error);
    return false;
  }
}

export async function updateBoard(
  token: string,
  board: Board,
  inputs: boardModalInputsType,
) {
  const body = { ...inputs, is_public: true };
  const id = board._id;

  if (inputs.name.trim() === "") {
    return "Please provide a title.";
  } else if (
    inputs.name.trim() === board.name.trim() &&
    inputs.description.trim() === board.description?.trim()
  ) {
    return "No changes detected. Please make a change to update the board.";
  }

  try {
    const response = await fetch(
      `${process.env.CURRENT_URL}/boards/update/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    return response.ok;
  } catch (error) {
    console.error("Failed to update board", error);
    return false;
  }
}

export async function toggleBoardPrivacy(
  token: string,
  id: string,
  inputs: boardModalInputsType,
  isPrivate: boolean,
) {
  const body = { ...inputs, is_public: !isPrivate };

  try {
    const response = await fetch(
      `${process.env.CURRENT_URL}/boards/update/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    return response.ok;
  } catch (error) {
    console.error("Failed to update board", error);
    return false;
  }
}

export async function deleteBoard(token: string, id: string) {
  try {
    const response = await fetch(
      `${process.env.CURRENT_URL}/boards/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.ok;
  } catch (error) {
    console.error("Failed to delete board", error);
    return false;
  }
}

// Inside Board API

export async function getBoard(token: string, id: string) {
  try {
    const response = await fetch(`${process.env.CURRENT_URL}/boards/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to get board", error);
    return null;
  }
}

export async function getPublicBoard(id: string) {
  try {
    const response = await fetch(
      `${process.env.CURRENT_URL}/boards/public/${id}`,
    );

    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to get board", error);
    return null;
  }
}

export async function addTask(
  token: string,
  id: string,
  inputs: taskModalInputsType,
) {
  const body = { ...inputs, boardId: id };

  try {
    const response = await fetch(`${process.env.CURRENT_URL}/tasks/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Failed to add task", error);
    return false;
  }
}

export async function updateTask(
  token: string,
  id: string,
  inputs: taskModalInputsType,
) {
  const body = { ...inputs };
  try {
    const response = await fetch(
      `${process.env.CURRENT_URL}/tasks/update/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );
    return response.ok;
  } catch (error) {
    console.error("Failed to update task", error);
    return false;
  }
}

export async function deleteTask(token: string, id: string) {
  try {
    const response = await fetch(
      `${process.env.CURRENT_URL}/tasks/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.ok;
  } catch (error) {
    console.error("Failed to delete task", error);
    return false;
  }
}
