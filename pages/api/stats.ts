import { findVideoIdByUser, insertStats, updateStats } from "@/lib/db/hasura";
import jwt, { JwtPayload } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(403).json({ message: "unauthorized" });
      return;
    } 
      
    const {videoId} = req.method === "POST" ? req.body : req.query;
    if (videoId) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
      // const videoId = req.query.videoId as string;
      const userId = ((  decodedToken as JwtPayload)?.issuer ?? "");
      console.log("🚀 ~ handler ~ userId:", userId);
      const findVideo = await findVideoIdByUser(token,
        userId,videoId);
      const doesStateExist = findVideo?.length > 0;

    
      if (req.method === "POST") {
        const {favourited,watched=true} = req.body;

        if (doesStateExist) {
          const response = await updateStats(token, {userId,videoId, favourited,watched});
          res.status(200).json(response);

        }
        else {
          const response = await insertStats(token, {userId,videoId, favourited,watched});
          res.status(200).json(response);
        }
      }
      
      else {
        if (doesStateExist) {
          res.status(200).json( findVideo );
        }
        else {
          res.status(404).json({ message: "Video not found" });

        }
         
      }
         
    }
  } catch (error) {
    console.log("🚀 ~ handler ~ error:", error);
    res.status(500).json({ message: (error as string) });
  }
}