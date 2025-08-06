import { IDGenerator } from "../domain/IdGenerator";

export class CryptoIDGenerator implements IDGenerator {
  generate() {
    return crypto.randomUUID();
  }
}
