import { get } from "lodash";

import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../../utils/jwt.util";
import { reIssueAccessToken } from "../services/session.service";
import config from "config";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get from lodash make it safer to access property that we are not sure it exists


  res.setHeader('Access-Control-Expose-Headers', 'x-access-token');

  const accessToken =
    get(req, "cookies.accessToken") ||
    get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

  const refreshToken =
    get(req, "cookies.refreshToken") || get(req, "headers.x-refresh", "");

  if (!accessToken) {
    return next();
  }
  const { decoded, expired } = verifyJWT(accessToken);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    //re issue an access token    should be a service // done
    //@ts-ignore
    const newAccessToken = await reIssueAccessToken({ refreshToken });
    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
    }
    //@ts-ignore
    const result = verifyJWT(newAccessToken);

    res.locals.user = result.decoded;

    return next();
  }

  return next();
};
