import ExpressServer from "./config/ExpressServer";
import MongooseConnection from "./config/MongooseDB";
import { UserContainer } from "./domains/user/UserContainer";

import { Express } from "express";

let app: Express | null = null;

export default class Server {
  private expressServer: ExpressServer;
  private mongooseConnection: MongooseConnection;
  private userContainer: UserContainer;
  
  constructor() {
    this.userContainer = new UserContainer();
    this.expressServer = new ExpressServer(this.userContainer);
    this.mongooseConnection = new MongooseConnection();
    this.start();
  }
  private async start() {
    await this.mongooseConnection.connect();
    console.log("Connected to Database");

    this.expressServer.listen(8080);
  }

  public getApp() {
    return this.expressServer.getApp();
  }
}

if (require.main === module) {
  new Server();
}
