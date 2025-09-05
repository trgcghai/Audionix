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
