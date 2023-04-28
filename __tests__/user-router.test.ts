import { type inferProcedureInput } from "@trpc/server";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { appRouter, type AppRouter } from "~/server/api/root";
import { expect, test } from "vitest";

test("Missing password should not be able to create a user", async () => {
  const ctx = await createInnerTRPCContext({ session: null });
  const caller = appRouter.createCaller(ctx);

  const input: inferProcedureInput<AppRouter["user"]["create"]> = {
    email: "",
    password: "",
  };

  await expect(caller.user.create(input)).rejects.toThrowError();
});
