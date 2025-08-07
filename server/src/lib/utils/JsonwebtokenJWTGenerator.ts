import jwt from "jsonwebtoken";

export class JsonwebtokenJWTGenerator {
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

  async generateToken(payload: object | string): Promise<string> {
    return this.generateAccessToken(payload);
  }
}
