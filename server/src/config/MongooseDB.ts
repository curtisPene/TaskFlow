import mongoose, { Mongoose } from "mongoose";

export default class MongooseDB {
  private connection: Mongoose | null;
  constructor() {
    this.connection = null;
  }

  async connect(): Promise<Mongoose> {
    if (this.connection) {
      return this.connection;
    }

    try {
      const connectionString =
        process.env.MONGODB_URI ||
        "mongodb+srv://curtispene:50phKOgk2A7fPzgn@devcluster.8q9ib.mongodb.net/?retryWrites=true&w=majority&appName=DevCluster";

      this.connection = await mongoose.connect(connectionString, {
        dbName: "TaskFlow",
      });

      return this.connection;
    } catch (error) {
      console.error("Databaseconnection failed:", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.disconnect();
      this.connection = null;
    }
  }

  isConnected(): boolean {
    return mongoose.connection.readyState === 1;
  }
}
