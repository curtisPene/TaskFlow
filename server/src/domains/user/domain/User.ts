import { Email } from "./Email";

export class User {
  constructor(
    readonly id: string,
    readonly email: Email,
    readonly password: string, // TODO: Create a Password Value Object to enforce BR's
    readonly username: string,
    readonly displayName: string,
    readonly avatar: string = "default.png",
    readonly role: string = "user",
    readonly accountStatus: string = "active",
    readonly createdAt: string = new Date().toISOString(),
    readonly lastLoginAt: string | undefined = undefined
  ) {}
}
