import { type inferProcedureInput } from "@trpc/server";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { appRouter, type AppRouter } from "~/server/api/root";
import { expect, test } from "vitest";
import { prisma } from "~/server/db";

test("Missing password should not be able to create a user", async () => {
  const ctx = await createInnerTRPCContext({ session: null });
  const caller = appRouter.createCaller(ctx);

  const input: inferProcedureInput<AppRouter["user"]["create"]> = {
    email: "",
    password: "",
  };

  await expect(caller.user.create(input)).rejects.toThrowError();
});

test("Should be able to create a new user.", async () => {
  const ctx = await createInnerTRPCContext({ session: null });
  const caller = appRouter.createCaller(ctx);

  const input: inferProcedureInput<AppRouter["user"]["create"]> = {
    email: "unittest@test.com",
    password: "12345678",
  };

  const user = await caller.user.create(input);

  expect(user).toBeDefined();
  expect(user?.email).toBe(input.email);

  await prisma.credentials.deleteMany({
    where: {
      userId: user?.id,
    },
  });

  await prisma.users.delete({
    where: {
      id: user?.id,
    },
  });
});
