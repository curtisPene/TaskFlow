export interface JwtGenerator {
  generateToken(userId: string): string;
}
