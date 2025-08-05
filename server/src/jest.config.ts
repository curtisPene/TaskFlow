import type { Config } from "@jest/types";
import test from "node:test";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/test/**/*.ts"],
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};

export default config;
