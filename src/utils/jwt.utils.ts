import jwt from "jsonwebtoken";
import config from "config";



export const signJwt = (
  payload: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) => {
  const signingKey = Buffer.from(
    config.get<string>(keyName),
    "base64"
  ).toString("ascii");

  return jwt.sign(payload, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = async (
  token: string,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
) => {
    const publicKey = Buffer.from(
      config.get<string>(keyName),
      "base64"
    ).toString("ascii");

    console.log('hello key',publicKey);


  try {
    const decoded = jwt.verify(token, publicKey);

    console.log({ decoded });

    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
};
