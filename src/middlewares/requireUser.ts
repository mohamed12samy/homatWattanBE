import { NextFunction, Request, Response } from "express";

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user; //this middleware will be used on routes that need to require user

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};
