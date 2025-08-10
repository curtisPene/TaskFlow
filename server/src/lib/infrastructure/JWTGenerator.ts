export interface JwtGenerator {
  generateAccessToken(payload: object | string): Promise<string>;

  generateRefreshToken(payload: object | string): Promise<string>;

  verifyRefreshToken(token: string): Promise<string>;

  verifyAccessToken(token: string): Promise<string>;
}
