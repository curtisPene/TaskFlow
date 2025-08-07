import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { UserContainer } from "../domains/user/UserContainer";

export default class ExpressServer {
  private app: Express;

  constructor(private userContainer: UserContainer) {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware() {
    this.app.use(
      cors({
        origin: process.env.CORS_ORIGIN,
        methods: ["PUT", "PATCH", "GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      })
    );

    this.app.use(bodyParser.json());
  }

  private setupRoutes() {
    this.app.get("/health-check", (req, res) => res.sendStatus(200));

    // User routes
    this.app.use("/api/auth", this.userContainer.getUserRouter());
  }

  public getApp(): Express {
    return this.app;
  }

  public listen(port: number = 8080) {
    return this.app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}
