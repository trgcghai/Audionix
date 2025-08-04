/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: Account;
  }

  interface Account {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string[];
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user?: Account;
  }
}
