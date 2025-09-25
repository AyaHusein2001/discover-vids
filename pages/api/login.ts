import { setTokenCookie } from "@/lib/cookies";
import { createNewUser, isNewUser } from "@/lib/db/hasura";
import { magic } from "@/lib/magic";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
type ResponseData = {
  message: string
};
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    try {

      const auth = req.headers.authorization;
      const didToken = auth?.substring(7);
      const metaData = await magic.users.getMetadataByToken(didToken as string);
    
      const token = jwt.sign(
        {
          ...metaData,
          "iat": Math.floor(Date.now() / 1000),
          "exp":Math.floor(Date.now() / 1000+7*24*60*60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-default-role": "user",
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-user-id": `${metaData?.issuer}`, 
          }   
        },
        process.env.JWT_SECRET as string
      );

      //check if user exists
      const result = await isNewUser(token,metaData?.issuer as string);
     
      if (result) {
        await createNewUser(token,metaData);
        setTokenCookie(token,res);
        res.status(200).json({ message:  "This is a new user" });
      }
      else {
        setTokenCookie(token,res);
        res.status(200).json({ message: "User already exists" });
      }

    } catch (error) {
      console.log("🚀 ~ handler ~ error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  }
  else {
    res.status(405).json({ message: "Method not allowed" });
  }
}