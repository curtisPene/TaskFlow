import { Result } from "../../../lib/types/Result";

export type RegisterUserDTO = {
  email: string;
  username: string;
  displayName: string;
  password: string;
};

export type UserDTO = {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar: string;
  role: string;
  accountStatus: string;
  createdAt: string;
  lastLoginAt: string | undefined;
};

export interface RegisterUser {
  execute(command: RegisterUserDTO): Promise<Result<UserDTO, string>>;
}
