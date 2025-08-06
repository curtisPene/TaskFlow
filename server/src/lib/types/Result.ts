export class Result<T, E = string> {
  private constructor(
    public readonly isOk: boolean,
    public readonly value?: T,
    public readonly error?: E
  ) {}

  static ok<T>(value: T): Result<T, never> {
    return new Result(true, value);
  }

  static fail<T>(error: string): Result<T, string> {
    return new Result<T, string>(false, undefined, error);
  }

  isSuccess(): boolean {
    return this.isOk;
  }

  getValue(): T {
    if (!this.value) {
      throw new Error("Result value is undefined");
    }
    return this.value;
  }

  getError(): E {
    if (!this.error) {
      throw new Error("Result error is undefined");
    }
    return this.error;
  }
}
