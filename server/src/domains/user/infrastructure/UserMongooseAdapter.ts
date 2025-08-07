import { Result } from "../../../lib/types/Result";
import { UserRepository } from "../applicaiton/UserRepository";
import { Email } from "../domain/Email";
import { User } from "../domain/User";
import { UserModel } from "./UserSchema.Mongoose";

export class UserMongooseAdapter implements UserRepository {
  async findUserByEmail(email: string): Promise<Result<User, string>> {
    const userDoc = await UserModel.findOne({ email });

    if (userDoc) {
      const email = new Email(userDoc.email);
      const user = new User(
        userDoc.id,
        email,
        userDoc.password,
        userDoc.username,
        userDoc.displayName,
        userDoc.avatar,
        userDoc.role,
        userDoc.accountStatus,
        userDoc.createdAt.toISOString(),
        userDoc.lastLoginAt?.toISOString() ?? undefined
      );
      return Result.success<User>(user);
    } else {
      return Result.fail("User not found");
    }
  }

  async createUser(user: User): Promise<Result<User, string>> {
    const newUserDoc = new UserModel({
      ...user,
      email: user.email.getValue(),
      createdAt: new Date(),
      lastLoginAt: new Date(),
    });

    await newUserDoc.save();

    const userResponse = new User(
      newUserDoc.id,
      Email.fromPersistence(newUserDoc.email),
      newUserDoc.password,
      newUserDoc.username,
      newUserDoc.displayName,
      newUserDoc.avatar,
      newUserDoc.role,
      newUserDoc.accountStatus,
      newUserDoc.createdAt.toISOString(),
      newUserDoc.lastLoginAt?.toISOString() ?? undefined
    );

    return Result.success(userResponse);
  }
}
