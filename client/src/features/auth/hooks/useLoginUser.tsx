import { useMutation } from "@tanstack/react-query";

import {
  type LoginRequest,
  type LoginResponse,
  loginUser,
} from "../../../lib/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../stores/auth-store";

export const useLoginUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: LoginRequest): Promise<LoginResponse> => loginUser(data),
    onSuccess: (response) => {
      const accessToken = response.data.accessToken;
      localStorage.setItem("accessToken", accessToken);

      dispatch(login(response.data));

      navigate("/taskflow", { replace: true });
    },
  });
};
