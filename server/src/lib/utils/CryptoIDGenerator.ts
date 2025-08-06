import { IDGenerator } from "../domain/IDGenerator";

export class CryptoIDGenerator implements IDGenerator {
  generate() {
    return crypto.randomUUID();
  }
}
