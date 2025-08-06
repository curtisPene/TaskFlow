import { Result } from "../../../lib/types/Result";
import { User } from "../domain/User";
import { RegisterUserDTO, UserDTO } from "./RegisterUser";

export interface UserRepository {
  findUserByEmail(email: string): Promise<Result<User, string>>;

  createUser(user: User): Promise<Result<User, string>>;
}
