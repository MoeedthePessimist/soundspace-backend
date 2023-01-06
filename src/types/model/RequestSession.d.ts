import { Session, Cookie } from "@types/express-session";
import { Request } from "express";
import { User } from "./User";

interface CustomCookie extends Cookie {
  expiry: Date;
}

interface CustomSession extends Session {
  user: User;
  cookie: CustomCookie;
}

export interface LoginRequestSession extends Request {
  session: CustomSession;
}
