import * as cookie from "cookie";

const MAX_AGE = 60 * 60 * 24 * 7; // 1 week
export const setTokenCookie = (token: string,res: any) => {
  const setCookie = cookie.serialize("token", token, {
    expires: new Date(Date.now() + MAX_AGE * 1000),
    maxAge: MAX_AGE,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

  res.setHeader("Set-Cookie", setCookie);
};