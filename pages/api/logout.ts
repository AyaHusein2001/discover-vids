import { deleteTokenCookie } from "@/lib/cookies";
import { magic } from "@/lib/magic";
import { verifyToken } from "@/lib/utils";
import type { NextApiRequest, NextApiResponse } from "next";
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!req.cookies.token)
      return res.status(401).json({ message: "User is not logged in" });
    const token = req.cookies.token;

    const userId = await verifyToken(token);
    deleteTokenCookie(res);
    try {
      await magic.users.logoutByIssuer(userId);
    } catch (error) {
      console.error("Error occurred while logging out magic user", error);
    }
    //redirects user to login page
    res.writeHead(302, { Location: "/login" });
    res.end();
  } catch (error) {
    console.error({ error });
    res.status(401).json({ message: "User is not logged in" });
  }
}