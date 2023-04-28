import { expect, test } from "vitest";
import Price from "~/utils/price";

test("Create a price quote for in state", async () => {
  const price = new Price(1500, "TX", true);

  const total = price.calculatePrice();

  expect(total).toBe(2542.5);
});

test("Create a price quote for out of state", async () => {
  const price = new Price(1500, "CA", true);

  const total = price.calculatePrice();

  expect(total).toBe(2587.5);
});
