import { NextFunction, Request, Response } from "express";
import { RegisterUser, RegisterUserDTO } from "../applicaiton/RegisterUser";
import { LoginUser, UserLoginDTO } from "../applicaiton/LoginUser";
import {
  FailureResponse,
  SuccessResponse,
} from "../../../lib/utils/ApiResponse";
import id from "zod/v4/locales/id.js";
export class UserExpressAdapter {
  constructor(
    private registerUser: RegisterUser,
    private loginUser: LoginUser
  ) {}

  async postNewUser(req: Request, res: Response, next: NextFunction) {
    const registerUserDTO: RegisterUserDTO = {
      email: req.body.email,
      username: req.body.username,
      displayName: req.body.displayName,
      password: req.body.password,
    };

    const result = await this.registerUser.execute(registerUserDTO);

    if (!result.success) {
      const fail: FailureResponse = {
        success: false,
        status: result.status,
        error: {
          message: result.error,
        },
        timestamp: new Date().toISOString(),
      };
      return res.status(result.status).json(fail);
    }

    const success: SuccessResponse = {
      success: true,
      status: result.status,
      data: {
        message: "Registration successful. Please verify your email.",
        userId: result.data.id,
      },
      timestamp: new Date().toISOString(),
    };

    return res.status(result.status).json(success);
  }

  async postUserLogin(req: Request, res: Response, next: NextFunction) {
    const UserLoginDTO: UserLoginDTO = {
      email: req.body.email,
      password: req.body.password,
    };

    const result = await this.loginUser.execute(UserLoginDTO);

    if (!result.success) {
      const fail: FailureResponse = {
        success: false,
        status: result.status,
        error: {
          message: result.error,
        },
        timestamp: new Date().toISOString(),
      };
      return res.status(result.status).json(fail);
    }

    const success: SuccessResponse = {
      success: true,
      status: result.status,
      data: {
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
        user: {
          id: result.data.id,
          email: result.data.email,
          username: result.data.username,
          displayName: result.data.displayName,
        },
      },
      timestamp: new Date().toISOString(),
    };

    return res.status(result.status).json(success);
  }
}
