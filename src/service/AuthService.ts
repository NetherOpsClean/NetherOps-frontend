import api from "@/lib/axios";
import type { AuthRequest } from "@/types/request/AuthRequest";
import type { RegisterRequest } from "@/types/request/RegisterRequest";
import type { AuthResponse } from "@/types/response/AuthResponse";


export const registerUser = async (userData:RegisterRequest): Promise<Response> => {
  const response = await api.post<Response>("/auth/register",userData);
  return response.data;
}

export const loginUser = async (credentials: AuthRequest): Promise<AuthResponse> =>{
  const response = await api.post<AuthResponse>("/auth/login",credentials);
  return response.data;
}

