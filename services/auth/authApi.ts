import { ApiResponse } from "@/app/types/api";
import { Account } from "@/app/types/model";
import { api } from "../api";
import {
  AccountStatusParams,
  AccountStatusResponse,
  FindAccountParams,
  FindAccountResponse,
  LoginParams,
  LoginResponse,
  RegisterParams,
  UpdatePasswordParams,
  UpdateRoleParams,
  UpdateRoleResponse,
} from "./type";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginParams>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data,
      }),
      invalidatesTags: ["User"],
    }),
    register: build.mutation<ApiResponse<unknown>, RegisterParams>({
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
    updatePassword: build.mutation<ApiResponse<unknown>, UpdatePasswordParams>({
      query: (data) => ({
        url: "/auth/accounts/password",
        method: "PUT",
        data,
      }),
    }),
    getAccounts: build.query<FindAccountResponse, FindAccountParams>({
      query: (params) => ({
        url: "/auth/accounts",
        params,
      }),
      providesTags: ["Accounts"],
    }),
    deactivateAccounts: build.mutation<
      AccountStatusResponse,
      AccountStatusParams
    >({
      query: (data) => ({
        url: "/auth/accounts/deactivation",
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Accounts"],
    }),
    activateAccounts: build.mutation<
      AccountStatusResponse,
      AccountStatusParams
    >({
      query: (data) => ({
        url: "/auth/accounts/activation",
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Accounts"],
    }),
    updateRoles: build.mutation<UpdateRoleResponse, UpdateRoleParams>({
      query: (data) => ({
        url: `/auth/accounts/roles`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Accounts"],
    }),
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
  useGetAccountsQuery,
  useDeactivateAccountsMutation,
  useActivateAccountsMutation,
  useUpdateRolesMutation,
} = authApi;
