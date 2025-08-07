import { Router } from "express";
import { RegisterUser } from "./applicaiton/RegisterUser";
import { RegisterUserInputPort } from "./applicaiton/RegisterUserInputPort";
import { UserRepository } from "./applicaiton/UserRepository";
import { UserMongooseAdapter } from "./infrastructure/UserMongooseAdapter";
import { UserExpressAdapter } from "./infrastructure/UserExpressAdapter";
import { UserRouter } from "./infrastructure/UserRouter";

import { CryptoIDGenerator } from "../../lib/utils/CryptoIDGenerator";
import { IDGenerator } from "../../lib/domain/IDGenerator";
import { LoginUserInputPort } from "./applicaiton/LoginUserInputPort";

export class UserContainer {
  private _idGenerator: IDGenerator;
  private _userRepository: UserRepository;
  private _registerUserService: RegisterUser;
  private _loginUserService: LoginUserInputPort;
  private _userExpressAdapter: UserExpressAdapter;
  private _userRouter: UserRouter;

  constructor() {
    this._idGenerator = new CryptoIDGenerator();
    this._userRepository = new UserMongooseAdapter();
    this._registerUserService = new RegisterUserInputPort(
      this._userRepository,
      this._idGenerator
    );
    this._loginUserService = new LoginUserInputPort(this._userRepository);
    this._userExpressAdapter = new UserExpressAdapter(
      this._registerUserService,
      this._loginUserService
    );
    this._userRouter = new UserRouter(this._userExpressAdapter);
  }

  getUserRouter(): Router {
    return this._userRouter.getRouter();
  }

  getRegisterUserService(): RegisterUser {
    return this._registerUserService;
  }

  getUserRepository(): UserRepository {
    return this._userRepository;
  }
}
