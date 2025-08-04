import axiosClient from "@/libs/axiosInstance";
import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { Account } from "@/app/types/model";
import { ApiResponse } from "@/app/types/api";
import { loginSchema, SignUpFormValues } from "@/app/(auth)/auth/schemas";
import { AxiosResponse } from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "JohnDoe@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);

          const response = await axiosClient.post<
            { email: string; password: string },
            AxiosResponse<ApiResponse<{ account: Account }>>
          >(`${process.env.NEXT_PUBLIC_BE_URL}/auth/login`, {
            email,
            password,
          });

          const { statusCode, status, data } = response.data;

          console.log({ statusCode, status, data });

          if (statusCode === 201 && status === "success") {
            return {
              ...data.account,
              id: data.account._id, // Ensure id is present for NextAuth
            };
          }
        } catch (error) {
          console.error("Error during authorization:", error);
        } finally {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 15 * 60, // 15 minutes
  },
});

export const signUp = async (data: SignUpFormValues) => {
  const { firstName, lastName, email, password } = data;
  console.log({
    firstName,
    lastName,
    email,
    password,
  });
};
