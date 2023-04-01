import type { GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  // type DefaultSession,
} from "next-auth";
import { getToken } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "../env/server.mjs";
import { prisma } from "./db";
import { verify } from "argon2";

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

      authorize: async (credentials) => {
        try {
          if (!credentials) {
            throw Error("Missing email and password");
          }

          const user = await prisma.users.findFirst({
            where: {
              email: credentials.email,
            },
          });

          if (!user) {
            return null;
          }

          const creds = await prisma.credentials.findFirst({
            where: {
              userId: user.id,
            },
          });

          if (!creds) {
            return null;
          }

          const isValidPassword = await verify(
            creds.password,
            credentials.password
          );

          if (!isValidPassword) {
            throw Error("Invalid email or password.");
          }

          return {
            id: user.id,
            name: user.name,
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
