"use server";
import { redirect } from "next/navigation";
import { auth, signIn, signOut, update } from "../../auth";
export const signInWithCredentials = async (formData: FormData) => {
  await signIn("credentials", {
    nickname: formData.get("nickname") || "", // `'null'` 문자 방지
    email: formData.get("email") || "",
    password: formData.get("password") || "",
    redirect: false,
  });
};
export const signInWithGoogle = async () => {
  await signIn("google", { redirectTo: "/" });
};
export const signInWithKakao = async () => {
  await signIn("kakao");
};
export const signOutWithForm = async (formData: FormData) => {
  await signOut();
};
export { auth as getSession, update as updateSession };
