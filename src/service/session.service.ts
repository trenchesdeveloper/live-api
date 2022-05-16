import logger from "../utils/logger";
import config from "config";
import { SessionDocument } from "./../models/session.model";
import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { get } from "lodash";
import { findUser } from "./user.service";

export const createSession = async (userId: string, userAgent: string) => {
  const session = await SessionModel.create({
    user: userId,
    userAgent,
  });

  return session.toJSON();
};

export const findSesions = async (query: FilterQuery<SessionDocument>) => {
  try {
    return SessionModel.find(query).lean();
  } catch (error: any) {
    logger.error(error);
  }
};

export const updateSession = async (
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) => {
  try {
    return SessionModel.updateOne(query, update);
  } catch (error: any) {
    logger.error(error);
  }
};

export const reIssueAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const { decoded } = await verifyJwt(refreshToken, "refreshTokenPublicKey");

  if (!decoded || !get(decoded, "session")) return false;

  const session = await SessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });
  if (!user) return false;

  // create an access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    "accessTokenPrivateKey",
    {
      expiresIn: config.get<string>("accessTokenTTL"),
    }
  );

  return accessToken;
};
