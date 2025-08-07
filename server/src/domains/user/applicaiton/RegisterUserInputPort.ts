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

  async execute(command: RegisterUserDTO) {
    const id = this.idGenerator.generate();

    const { email, password, username, displayName } = command;

    const usernameExists = await this.userRepo.findUserByEmail(email);

    if (usernameExists.success) {
      return Result.fail("User already exists", 400);
    }

    const emailVO = Email.create(email);

    const newUser = new User(id, emailVO, password, username, displayName);

    const result = await this.userRepo.createUser(newUser);

    if (!result.success) {
      return Result.fail(result.error, 400);
    }

    const createdUser = result.data;

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

    return Result.success(userDTO, 201);
  }
}
