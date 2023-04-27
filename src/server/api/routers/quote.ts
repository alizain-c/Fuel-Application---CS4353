import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import Price from "../../../utils/price";

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
        state: z.string(),
        zip: z.string(),
        deliveryDate: z.date(),
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

        let history = false;

        const existingQuotes = await ctx.prisma.quotes.findMany({
          where: {
            user: {
              email: userEmail,
            },
          },
        });

        if (existingQuotes.length > 0) {
          history = true;
        }

        const quote = new Price(input.gallons, input.state, history);
        const total = quote.calculatePrice();

        const newQuote = await ctx.prisma.quotes.create({
          data: {
            user: {
              connect: {
                email: userEmail,
              },
            },
            gallons: input.gallons,
            address: input.address + ", " + input.state + ", " + input.zip,
            delivery: input.deliveryDate,
            price: quote.suggestedPrice,
            total: total,
          },
        });

        return newQuote;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong.",
        });
      }
    }),
});
