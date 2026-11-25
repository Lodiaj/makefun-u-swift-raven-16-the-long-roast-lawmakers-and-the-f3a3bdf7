import * as fs from "node:fs";
import * as path from "node:path";

const ENTRY =
  "He wrote the bill to regulate artificial intelligence, then asked his aide to print out the internet so he could read it on the plane.";

const MAX_CHARS = 320;

function validateEntry(text: string): void {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  if (!text.endsWith(".")) {
    throw new Error("entry must be a single complete sentence");
  }
}

function main(): void {
  const text = ENTRY.trim();
  validateEntry(text);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "entry.txt");
  fs.writeFileSync(outPath, text, "utf8");
  console.log(text);
}

main();
