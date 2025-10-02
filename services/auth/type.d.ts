import { PaginatedResponse } from "@/app/types/api";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UpdatePasswordPayload = {
  newPassword: string;
  oldPassword: string;
};

export type LoginResponse = ApiResponse<{ account: Account; user: User }>;

export type FindAccountResponse = ApiResponse<PaginatedResponse<Account>>;

export type FindAccountParams = {
  email?: string;
  role?: string;
  limit?: number;
  current?: number;
  sort?: string;
};
