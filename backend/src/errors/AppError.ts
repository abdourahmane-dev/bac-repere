export type AppErrorCode =
  | "INVALID_QUERY"
  | "NOT_FOUND"
  | "ROUTE_NOT_FOUND"
  | "INTERNAL_ERROR";

export class AppError extends Error {
  readonly status: number;
  readonly code: AppErrorCode;

  constructor(status: number, code: AppErrorCode, message: string) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.code = code;
  }
}
