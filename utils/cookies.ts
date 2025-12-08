"use server";

import { cookies } from "next/headers";

const cookieName = process.env.NEXT_PUBLIC_COOKIES || "";

export const getCookie = async () => {
  const cookie = await cookies();
  return cookie.get(cookieName);
};
