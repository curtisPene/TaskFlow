export type AuthResponse =
  | {
      success: true;
      status: number;
      error: {
        message: string;
      };
    }
  | {
      success: false;
      status: number;
      data: {
        accessToken: string;
        user: {
          id: string;
          email: string;
          username: string;
          displayName: string;
        };
      };
    };
