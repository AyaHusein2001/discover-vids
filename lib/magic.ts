
import { Magic } from "@magic-sdk/admin";


export const magic = await Magic.init(process.env.MAGIC_SERVER_KEY as string);

