import { z } from "zod";
import { hash } from "argon2";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const hashedPassword = await hash(input.password);

      try {
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
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: `The user with email ${input.email} already exists.`,
            });
          }

          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong.",
          });
        }
      }
    }),
  update: protectedProcedure
    .input(
      z.object({
        email: z.string(),
        name: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        zip: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.prisma.users.update({
          where: {
            email: input.email,
          },
          data: {
            name: input.name,
            address: input.address,
            city: input.city,
            state: input.state,
            zip: input.zip,
          },
        });

        return user;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong.",
        });
      }
    }),
});
