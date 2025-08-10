import { z } from "zod";
import { api } from "./api-client";

const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const loginResponseSchema = z.object({
  success: true,
  status: z.number(),
  data: z.object({
    accessToken: z.string(),
    user: z.object({
      id: z.string(),
      email: z.string(),
      username: z.string(),
      displayName: z.string(),
    }),
  }),
});

export type LoginRequest = z.infer<typeof loginInputSchema>;

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const parsedData = await loginInputSchema.parseAsync(data);
  const response = await api.post<LoginResponse>("/auth/login", parsedData);
  return response.data;
};
