import { Request, Response } from "express";
import { validatePassword } from "../services/user.service";
import {
  createSession,
  findSessions,
  updateSession,
} from "../services/session.service";
import { signJWT } from "../../utils/jwt.util";
import config from "config";

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate password
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send("Invalid Username or Password");
  }

  // create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // create access token
  const accessToken = signJWT(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get("accessTokenExpireIn") } // 15 minutes
  );

  // create refresh token
  const refreshToken = signJWT(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get("refreshTokenExpireIn") } // 1 year
  );
  //return access and refresh tokens
  res.setHeader("x-access-token", accessToken);
  res.cookie("refreshToken", refreshToken, {
    maxAge: 3.15576e10, // 1 year
    httpOnly: true,
    domain: config.get("cookieDomain"),
    path: "/",
    sameSite: "strict",
    secure: config.get("cookieSecure"), // in production = true
  });
  return res.status(201).send({ accessToken, refreshToken, role:user.role });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  // in need of user id so will plant it in a middleware
  const userId = res.locals.user._id;

  const session = await findSessions({ user: userId, valid: true });

  return res.send(session);
}

export async function deleteUserSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
