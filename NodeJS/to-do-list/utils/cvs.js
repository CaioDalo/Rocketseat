import assert from 'node:assert';
import { generate } from 'csv-generate';
import { parse } from 'csv-parse';

export async function parseCSV(chunk) {
  const parser = generate(chunk)
  .pipe(parse());

  for await (const record of parser) {
    // Report current line
    // Fake asynchronous operation
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}