import { NextFunction, Request, Response } from "express";
import { RegisterUser, RegisterUserDTO } from "../applicaiton/RegisterUser";

export class UserExpressAdapter {
  constructor(private registerUser: RegisterUser) {}

  async postNewUser(req: Request, res: Response, next: NextFunction) {
    const registerUserDTO: RegisterUserDTO = {
      email: req.body.email,
      username: req.body.username,
      displayName: req.body.displayName,
      password: req.body.password,
    };

    const userDTO = await this.registerUser.execute(registerUserDTO);

    res.status(201).json(userDTO);
  }
}
