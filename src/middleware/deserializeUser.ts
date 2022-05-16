import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { reIssueAccessToken } from "../service/session.service";
import { verifyJwt } from "../utils/jwt.utils";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken = get(req, "headers.x-refresh");

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = await verifyJwt(
    accessToken,
    "accessTokenPublicKey"
  );

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    // generate a new access token
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (typeof newAccessToken === "string") {
      res.setHeader("x-access-token", newAccessToken);
      const result = await verifyJwt(newAccessToken, "accessTokenPublicKey");

      res.locals.user = result.decoded;

      return next();
    }
  }

  return next();
};
