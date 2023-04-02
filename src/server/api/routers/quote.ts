import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const quoteRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const userEmail = ctx.session?.user?.email;

      if (!userEmail)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong.",
        });

      const quotes = await ctx.prisma.quotes.findMany({
        where: {
          user: {
            email: userEmail,
          },
        },
      });

      return quotes;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong.",
      });
    }
  }),
  create: protectedProcedure
    .input(
      z.object({
        gallons: z.number(),
        address: z.string(),
        deliveryDate: z.string(),
        suggestedPrice: z.number(),
        totalAmountDue: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const userEmail = ctx.session?.user?.email;

        if (!userEmail)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong.",
          });

        const quote = await ctx.prisma.quotes.create({
          data: {
            user: {
              connect: {
                email: userEmail,
              },
            },
            gallons: input.gallons,
            address: input.address,
            delivery: input.deliveryDate,
            price: input.suggestedPrice,
            total: input.totalAmountDue,
          },
        });

        return quote;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong.",
        });
      }
    }),
});
