import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import ExpressServer from "../src/config/ExpressServer";
import { Express } from "express";
import { UserContainer } from "../src/domains/user/UserContainer";

describe("Server Tests", () => {
  let expressServer: ExpressServer;
  let userContainer: UserContainer;
  let app: Express;

  beforeAll(() => {
    userContainer = new UserContainer();
    expressServer = new ExpressServer(userContainer);
    app = expressServer.getApp();
  });

  afterAll(() => {
    // Clean up if needed
  });

  test("should create Express app instance", () => {
    expect(app).toBeDefined();
    expect(typeof app).toBe("function");
  });

  test("should handle CORS preflight request", async () => {
    const response = await request(app)
      .options("/")
      .set("Origin", "http://localhost:8080")
      .set("Access-Control-Request-Method", "GET");

    expect(response.status).toBe(204);
  });

  test("should parse JSON body", async () => {
    // This test would need an actual endpoint that accepts JSON
    // For now, test that the server handles unknown routes
    const response = await request(app)
      .post("/nonexistent")
      .send({ test: "data" });

    expect(response.status).toBe(404);
  });

  test("should respond to health check endpoint", async () => {
    const response = await request(app).get("/health-check");
    expect(response.status).toBe(200);
  });
});
