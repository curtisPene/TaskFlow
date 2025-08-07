import { Result } from "../../../lib/types/Result";
import { UserDTO } from "./RegisterUser";
import { LoginUser, UserLoginDTO } from "./LoginUser";
import { UserRepository } from "./UserRepository";
import { JsonwebtokenJWTGenerator } from "../../../lib/utils/JsonwebtokenJWTGenerator";

export class LoginUserInputPort implements LoginUser {
  constructor(private userRepo: UserRepository) {}
  async execute(command: UserLoginDTO): Promise<Result<UserDTO, string>> {
    const { email, password } = command;

    const result = await this.userRepo.findUserByEmail(email);

    if (!result.success) {
      return Result.fail("User not found", 401);
    }

    const user = result.data;

    if (user.password !== password) {
      return Result.fail("Invalid password", 401);
    }

    const accessToken =
      await new JsonwebtokenJWTGenerator().generateAccessToken({
        email: user.email.getValue(),
        id: user.id,
      });

    const refreshToken =
      await new JsonwebtokenJWTGenerator().generateRefreshToken({
        email: user.email.getValue(),
        id: user.id,
      });

    const userDTO: UserDTO = {
      email: user.email.getValue(),
      username: user.username,
      displayName: user.displayName,
      avatar: user.avatar,
      role: user.role,
      accountStatus: user.accountStatus,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
      id: user.id,
      accessToken,
      refreshToken,
    };

    return Result.success(userDTO, 202);
  }
}
