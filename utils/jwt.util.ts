import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get<string>("privateKey");

const publicKey = config.get<string>("publicKey");

export function signJWT(
  payload: Object,
  options?: jwt.SignOptions | undefined
) {
  return jwt.sign(payload, privateKey, {
    ...(options && options), // for checking if options was undefined
    algorithm: "RS256",
  });
}

export function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.log(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
