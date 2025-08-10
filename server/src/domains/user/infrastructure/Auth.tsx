import { NextFunction, Request, Response } from "express";

export class Auth {
  static isAuthenticated(req: Request, res: Response, next: NextFunction) {
    throw new Error("Method not implemented.");
  }
}
