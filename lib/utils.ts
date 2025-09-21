import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
export function verifyToken(token: string) {
  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    const userId = ((  decodedToken as JwtPayload)?.issuer ?? "");
    return userId;
  }  else {
    return null;
  } 
}