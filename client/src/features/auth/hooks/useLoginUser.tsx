import { useMutation } from "@tanstack/react-query";

import {
  type LoginRequest,
  type LoginResponse,
  loginUser,
} from "../../../lib/auth";

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (data: LoginRequest): Promise<LoginResponse> => loginUser(data),
  });
};
