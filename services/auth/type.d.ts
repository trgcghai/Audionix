import { Role } from "@/app/enums";
import { ApiResponse, PaginatedResponse } from "@/app/types/api";

export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UpdatePasswordParams = {
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

export type AccountStatusParams = {
  accountIds: string[];
};

export type AccountStatusResponse = ApiResponse<{
  modifiedCount: number;
  matchedCount: number;
  notFoundIds: string[] | undefined;
  message: string;
}>;

export type UpdateRoleParams = {
  accountIds: string[];
  newRoles: Role[];
};

export type UpdateRoleResponse = ApiResponse<{
  modifiedCount: number;
  matchedCount: number;
  notFoundIds: string[] | undefined;
  updatedRoles: Role[];
  message: string;
}>;
