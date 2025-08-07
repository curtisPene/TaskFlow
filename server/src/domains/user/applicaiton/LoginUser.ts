import { Result } from "../../../lib/types/Result";
import { UserDTO } from "./RegisterUser";

export type UserLoginDTO = {
  email: string;
  password: string;
};

export interface LoginUser {
  execute(command: UserLoginDTO): Promise<Result<UserDTO, string>>;
}
