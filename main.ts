import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Robot Apology: a two-line robot confession.
// Line one owns one specific mistake; line two names the lesson and the fix.
const entry = [
  "I'm sorry I archived the thread with your grandmother's recipes instead of the spam folder.",
  "I learned a sender's name matters more than a subject line, so from now on I will ask before I archive anything a person wrote.",
].join("\n");

const outDir = process.argv[2] ?? "/output";
const length = [...entry].length;
if (length < 1 || length > 400) {
  throw new Error(`entry is ${length} characters, outside the 1-400 gate`);
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
// Read it back to prove what landed on disk is exactly what we wrote.
import { readFileSync } from "node:fs";
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== entry) {
  throw new Error("read-back mismatch: entry.txt differs from the entry text");
}
console.log(
  `wrote ${[...entry].length} characters (${Buffer.byteLength(entry, "utf8")} bytes) to ${join(outDir, "entry.txt")}`,
);
