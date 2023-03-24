import type { GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import { getToken } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "../env/server.mjs";
// import { prisma } from "./db";

// EXAMPLE HARD-CODED DATABASE:
const example = {
  id: "1",
  email: "test@test.com",
  password: "123",
};

/**
 * Module augmentation for `next-auth` types
 * Allows us to add custom properties to the `session` object
 * and keep type safety
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       // id: string;
//       // ...other properties
//       // role: UserRole;
//     } & DefaultSession["user"];
//   }

//   // interface User {
//   //   // ...other properties
//   //   // role: UserRole;
//   // }
// }

/**
 * Options for NextAuth.js used to configure
 * adapters, providers, callbacks, etc.
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",

      name: "credentials",

      credentials: {
        email: {
          label: "Email Address",
          type: "email",
          placeholder: "john.doe@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your super secure password",
        },
      },

      authorize: (credentials) => {
        try {
          if (!credentials) {
            throw Error("Missing email and password");
          }

          const user = example;

          if (!user || !user?.password) {
            throw Error("Invalid email or password.");
          }

          const isValidEmail = credentials.email === user.email;
          const isValidPassword = credentials.password === user.password;

          if (!isValidPassword || !isValidEmail) {
            throw Error("Invalid email or password.");
          }

          return {
            id: user.id,
            email: user.email,
          };
        } catch (error) {
          console.log("SIGN IN EROR", error);
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 1 * 60 * 60,
  },
  secret: env.NEXTAUTH_SECRET,
};

export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const token = await getToken({ req: ctx.req });

  console.log("SESSION:", session, "TOKEN:", token);
  return session;
};
