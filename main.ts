import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The 3am text a smart fridge sends its owner: it has been quietly
// keeping score of the week's midnight snacks and has decided tonight
// is the night it stages an intervention. One line, lock-screen short,
// fridge voice throughout — no follow-up needed.
const LINE =
  "It's 3am. Fourth midnight snack this week, so I'm staging an intervention — the light stays off, and frankly, so do I.";

if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`entry line must be 1-140 characters, got ${LINE.length}`);
}
if (LINE.includes("\n")) {
  throw new Error("entry line must be a single line");
}

// The grader runs with /bot read-only: write ONLY to the output dir.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
