import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";
import { signJWT, verifyJWT } from "../../utils/jwt.util";
import { get } from "lodash";
import { findUser } from "./user.service";
import config from "config";

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return SessionModel.find(query).lean(); // each query supposed to need lean ( will not return functions on object only plain object)
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJWT(refreshToken);

  if (!decoded || !get(decoded, "session")) {
    return false;
  }

  const session = await SessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) {
    return false;
  }

  const user = await findUser({ _id: session.user });

  if (!user) {
    return false;
  }

  const accessToken = signJWT(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get("accessTokenExpireIn") } // 15 minutes
  );

  return accessToken;
}
