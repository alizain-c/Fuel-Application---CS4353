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

test("Should not be able to create duplicate user", async () => {
  const ctx = await createInnerTRPCContext({ session: null });
  const caller = appRouter.createCaller(ctx);

  const input: inferProcedureInput<AppRouter["user"]["create"]> = {
    email: "unittest@test.com",
    password: "12345678",
  };

  const user = await caller.user.create(input);

  expect(user).toBeDefined();
  expect(user?.email).toBe(input.email);

  await expect(caller.user.create(input)).rejects.toThrowError();

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

test("Should be able to update a user", async () => {
  const user = await prisma.users.create({
    data: {
      email: "unittest@test.com",
    },
  });

  const ctx = await createInnerTRPCContext({
    session: {
      user,
      expires: "1",
    },
  });
  const caller = appRouter.createCaller(ctx);

  const updateInput: inferProcedureInput<AppRouter["user"]["update"]> = {
    email: user.email,
    name: "Unit Test",
    address: "1234 Test St.",
    city: "Test City",
    state: "TS",
    zip: "12345",
  };

  const updatedUser = await caller.user.update(updateInput);

  expect(updatedUser).toBeDefined();
  expect(updatedUser?.name).toBe(updateInput.name);
  expect(updatedUser?.address).toBe(updateInput.address);
  expect(updatedUser?.city).toBe(updateInput.city);
  expect(updatedUser?.state).toBe(updateInput.state);
  expect(updatedUser?.zip).toBe(updateInput.zip);

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
