export type Success<T> = {
  readonly success: true;
  readonly status: number;
  readonly data: T;
};

export type Failure<E> = {
  readonly success: false;
  status: number;
  readonly error: E;
};

export type Result<T, E = string> = Success<T> | Failure<E>;

export const Result = {
  success<T>(data: T, status = 200): Success<T> {
    return { success: true, status, data };
  },
  fail<E>(error: E, status = 400): Failure<E> {
    return { success: false, status, error };
  },
};
