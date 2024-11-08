"use server";
import { auth, signIn, signOut, update } from "../../auth";

export const signInWithCredentials = async (formData: FormData) => {
  console.log(typeof formData);
  console.log(formData);
  await signIn("credentials", {
    displayName: formData.get("displayName") || "", // `'null'` 문자 방지
    email: formData.get("email") || "",
    password: formData.get("password") || "",
  });
};
export const signInWithGoogle = async () => {
  await signIn("google");
};
export const signInWithKakao = async () => {
  await signIn("kakao");
};
export const signOutWithForm = async (formData: FormData) => {
  await signOut();
};
export { auth as getSession, update as updateSession };
