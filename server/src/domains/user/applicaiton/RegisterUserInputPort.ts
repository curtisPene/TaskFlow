import { IDGenerator } from "../../../lib/domain/IDGenerator";
import { Result } from "../../../lib/types/Result";
import { Email } from "../domain/Email";
import { User } from "../domain/User";
import { RegisterUser, RegisterUserDTO, UserDTO } from "./RegisterUser";
import { UserRepository } from "./UserRepository";

export class RegisterUserInputPort implements RegisterUser {
  constructor(
    private userRepo: UserRepository,
    private idGenerator: IDGenerator
  ) {}

  async execute(
    command: RegisterUserDTO
  ): Promise<Result<UserDTO, string> | Result<UserDTO, never>> {
    const id = this.idGenerator.generate();

    const { email, password, username, displayName } = command;

    const usernameExists = await this.userRepo.findUserByEmail(email);

    if (usernameExists.isSuccess()) {
      return Result.fail("Username already exists");
    }

    const emailVO = Email.create(email);

    const newUser = new User(id, emailVO, password, username, displayName);

    const result = await this.userRepo.createUser(newUser);

    const createdUser = result.getValue();

    const userDTO: UserDTO = {
      id: createdUser.id,
      email: createdUser.email.getValue(),
      username: createdUser.username,
      displayName: createdUser.displayName,
      avatar: createdUser.avatar,
      role: createdUser.role,
      accountStatus: createdUser.accountStatus,
      createdAt: createdUser.createdAt,
      lastLoginAt: createdUser.lastLoginAt,
    };

    return Result.ok(userDTO);
  }
}
