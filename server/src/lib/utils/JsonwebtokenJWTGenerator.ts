import jwt from "jsonwebtoken";
import { JwtGenerator } from "../infrastructure/JWTGenerator";

export class JsonwebtokenJWTGenerator implements JwtGenerator {
  constructor() {}

  async generateAccessToken(payload: object | string): Promise<string> {
    return new Promise((resolve, reject) => {
      return jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        { expiresIn: "15m" },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token!);
          }
        }
      );
    });
  }

  async generateRefreshToken(payload: object | string): Promise<string> {
    return new Promise((resolve, reject) => {
      return jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET as string,
        { expiresIn: "7d" },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token!);
          }
        }
      );
    });
  }

  async verifyAccessToken(access: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async verifyRefreshToken(token: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
