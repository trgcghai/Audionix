import { ApiResponse } from "@/app/types/api";
import { Account } from "@/app/types/model";
import { api } from "../api";
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  UpdatePasswordPayload,
} from "./type";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginPayload>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data,
      }),
      invalidatesTags: ["User"],
    }),
    register: build.mutation<ApiResponse<unknown>, RegisterPayload>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        data,
      }),
      invalidatesTags: ["User"],
    }),
    verify: build.mutation<
      ApiResponse<unknown>,
      { email: string; otp: string }
    >({
      query: ({ email, otp }) => ({
        url: "/auth/verify-otp",
        method: "POST",
        data: { email, code: otp },
      }),
    }),
    resendOtp: build.mutation({
      query: (email: string) => ({
        url: "/auth/send-otp",
        method: "POST",
        data: { email },
      }),
      invalidatesTags: ["User"],
    }),
    logout: build.mutation<ApiResponse<unknown>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    profile: build.query<ApiResponse<Account>, void>({
      query: () => ({
        url: "/auth/profile",
      }),
      providesTags: ["User"],
    }),
    updatePassword: build.mutation<ApiResponse<unknown>, UpdatePasswordPayload>(
      {
        query: (data) => ({
          url: "/auth/accounts/password",
          method: "PUT",
          data,
        }),
      },
    ),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useResendOtpMutation,
  useLogoutMutation,
  useProfileQuery,
  useUpdatePasswordMutation,
} = authApi;
