// Local edits in the checkout stop self-update for as long as they exist, with no signal anywhere: a host ran a
// 2-day-old release while origin had three merges waiting. The status line is now reported with the file names.
import { expect, test } from "bun:test";
import { dirtyPaths } from "../src/setup";

test("dirtyPaths names the files, not the status codes", () => {
  expect(dirtyPaths(" M app/App.tsx\n D bin/noop\n")).toBe("app/App.tsx, bin/noop");
});

test("dirtyPaths caps the list so the notice stays readable", () => {
  const status = Array.from({ length: 10 }, (_, i) => ` M src/f${i}.ts`).join("\n");
  expect(dirtyPaths(status)).toBe("src/f0.ts, src/f1.ts, src/f2.ts, src/f3.ts, src/f4.ts, src/f5.ts");
});

test("dirtyPaths on a clean tree is empty", () => {
  expect(dirtyPaths("")).toBe("");
});
