export type SuccessResponse<T = any> = {
  success: true;
  status: number;
  data: T;
  timestamp: string;
};

export type FailureResponse = {
  success: false;
  status: number;
  error: {
    message: string;
    code?: string;
    details?: any;
  };
  timestamp: string;
};

export type ApiResponse<T = any> = SuccessResponse<T> | FailureResponse;

// export const ApiResponse = {
//   success<T>(data: T, status = 200): ApiResponse<T> {
//     return {
//       success: true,
//       status,
//       data,
//       timestamp: new Date().toISOString(),
//     };
//   },

//   error(message: string, status = 400, code: string): ApiResponse<never> {
//     return {
//       success: false,
//       status,
//       error: { message, code },
//       timestamp: new Date().toISOString(),
//     };
//   },
// };
