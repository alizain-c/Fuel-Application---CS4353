import { z } from "zod";
import { hash } from "argon2";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const hashedPassword = await hash(input.password);

      const user = await ctx.prisma.users.create({
        data: {
          email: input.email,
          Credentials: {
            create: {
              password: hashedPassword,
            },
          },
        },
      });

      return user;
    }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
