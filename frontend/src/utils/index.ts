import { signUpInputsType, signInInputsType } from "@/types";

export async function postRegister(inputs: signUpInputsType) {
  console.log("inputs", inputs);
}

export async function postLogin(inputs: signInInputsType) {
  console.log("inputs", inputs);
}
