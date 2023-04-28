import { type inferProcedureInput } from "@trpc/server";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { appRouter, type AppRouter } from "~/server/api/root";
import { expect, test } from "vitest";
import { prisma } from "~/server/db";
import Price from "~/utils/price";

test("Should not be able to get quotes without an email", async () => {
  const ctx = await createInnerTRPCContext({
    session: {
      user: {
        email: null,
      },
      expires: "1",
    },
  });
  const caller = appRouter.createCaller(ctx);

  await expect(caller.quote.getAll()).rejects.toThrowError();
});

test("Get All Quotes, should return empty array", async () => {
  const ctx = await createInnerTRPCContext({
    session: {
      user: {
        email: "unittester@test.com",
      },
      expires: "1",
    },
  });
  const caller = appRouter.createCaller(ctx);

  const quotes = await caller.quote.getAll();

  expect(quotes).toBeDefined();
  expect(quotes).toHaveLength(0);
});

test("Should be able to create a new quote", async () => {
  const ctx = await createInnerTRPCContext({
    session: {
      user: {
        email: "unittester@test.com",
      },
      expires: "1",
    },
  });
  const caller = appRouter.createCaller(ctx);

  const input: inferProcedureInput<AppRouter["quote"]["create"]> = {
    gallons: 100,
    address: "123 Test St",
    state: "TX",
    zip: "12345",
    deliveryDate: new Date(),
  };

  const quote = await caller.quote.create(input);
  const price = new Price(input.gallons, input.state, false);
  const total = price.calculatePrice();

  expect(quote).toBeDefined();
  expect(quote?.gallons).toBe(input.gallons);
  expect(quote?.address).toBe(
    input.address + ", " + input.state + ", " + input.zip
  );
  expect(quote?.delivery).toEqual(input.deliveryDate);
  expect(quote?.price).toBe(price.suggestedPrice);
  expect(quote?.total).toBe(total);

  await prisma.quotes.delete({
    where: {
      id: quote?.id,
    },
  });
});
