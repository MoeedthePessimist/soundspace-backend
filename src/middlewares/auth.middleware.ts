import { NextFunction, Response } from "express";
import { LoginRequestSession } from "@/types/model/RequestSession";

export const checkUserLoginSession = (
  request: LoginRequestSession,
  response: Response,
  next: NextFunction
) => {
  if (request.session.user && request.session.cookie.expires > new Date()) {
    next();
  } else {
    request.session.destroy(() => response.status(401).json({ message: "Session expired" }));
  }
};
