import { expect, test } from "vitest";
import { mocks } from "../mocks";

test("mock data covers the health endpoint", () => {
    expect(mocks["/api/health"]).toBeDefined();
});
