import logger from "../utils/logger";
import config from "config";
import { validatePassword } from "./../service/user.service";
import {
  createSession,
  findSesions,
  updateSession,
} from "./../service/session.service";
import { Request, Response } from "express";
import { signJwt } from "../utils/jwt.utils";
import { get } from "lodash";

export const createUserSessionHandler = async (req: Request, res: Response) => {
  try {
    // validate the user's password
    const user = await validatePassword(req.body);

    console.log("user", user);


    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    // create a new session for the user
    const session = await createSession(user._id, req.get("user-agent") || "");

    console.log("session", session);

    // create an access token
    const accessToken = signJwt(
      { ...user, session: session._id },
      "accessTokenPrivateKey",
      {
        expiresIn: config.get<string>("accessTokenTTL"),
      }
    );

    console.log("accessToken", accessToken);


    // create a refresh token
    const refreshToken = signJwt(
      { ...user, session: session._id },
        "refreshTokenPrivateKey",
      {
        expiresIn: config.get<string>("refreshTokenTTL"),
      }
    );
    // return access token and refresh token
    return res.send({
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    logger.error(error);
   
  }
};

export const getUserSessionHandler = async (req: Request, res: Response) => {
  // get the user's id from res.locals
  const userId = get(res.locals, "user._id");
  console.log(userId);

  const sessions = await findSesions({ user: userId, valid: true });

  return res.send(sessions);
};

export const deleteSessionHandler = async (req: Request, res: Response) => {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });
  return res.send({
    accessToken: null,
    refreshToken: null,
  });
};
