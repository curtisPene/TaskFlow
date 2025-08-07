import { Router } from "express";
import { UserExpressAdapter } from "./UserExpressAdapter";

export class UserRouter {
  private router: Router;
  constructor(private userAdapter: UserExpressAdapter) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.post(
      "/register",
      this.userAdapter.postNewUser.bind(this.userAdapter)
    );

    this.router.post(
      "/login",
      this.userAdapter.postUserLogin.bind(this.userAdapter)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
