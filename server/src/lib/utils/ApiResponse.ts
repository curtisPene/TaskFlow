export class ApiResponse {
  static success(data: any, message = "Success") {
    return { success: true, data, message };
  }

  static error(message: any, code = "UNKNOWN_ERROR", details = {}) {
    return {
      error: { code, message, details },
      success: false,
    };
  }
}
