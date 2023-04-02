import { createTRPCRouter } from "./trpc";
import { userRouter } from "./routers/user";
import { quoteRouter } from "./routers/quote";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  quote: quoteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
