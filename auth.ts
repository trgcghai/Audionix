import { loginSchema } from "@/app/(auth)/auth/schemas";
import { ApiResponse } from "@/app/types/api";
import { Account } from "@/app/types/model";
import { IUser } from "@/app/types/nextauth";
import axiosClient from "@/libs/axiosInstance";
import { AxiosResponse } from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);

          const { data } = await axiosClient.post<
            { email: string; password: string },
            AxiosResponse<ApiResponse<Account>>
          >("/auth/login", {
            email,
            password,
          });

          const { data: account, status } = data;

          if (status !== "success") {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            throw new Error("Invalid credentials.");
          }

          // return user object with their profile data
          return account;
        } catch (error) {
          console.error("Error during sign-in:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user as IUser;
      }
      return token;
    },
    session({ session, token }) {
      (session.user as IUser) = token.user as IUser;
      return session;
    },
    authorized({ auth }) {
      return !!auth;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});
