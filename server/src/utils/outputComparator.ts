export interface ComparisonResult {
  isMatch: boolean;
  actualTrimmed: string;
  expectedTrimmed: string;
  diffDetails?: string;
}

/**
 * Compares program output with expected output according to competitive programming standards:
 * - Trims trailing whitespace per line
 * - Trims trailing blank lines / newlines
 * - Normalizes Windows CRLF (\r\n) to Unix LF (\n)
 */
export function compareOutputs(
  actual: string,
  expected: string,
  exactMatch = false
): ComparisonResult {
  const normActual = (actual || '').replace(/\r\n/g, '\n');
  const normExpected = (expected || '').replace(/\r\n/g, '\n');

  if (exactMatch) {
    return {
      isMatch: normActual === normExpected,
      actualTrimmed: normActual,
      expectedTrimmed: normExpected,
    };
  }

  // Normalize each line by trimming trailing spaces and tabs
  const cleanActual = normActual
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .trim();

  const cleanExpected = normExpected
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .trim();

  return {
    isMatch: cleanActual === cleanExpected,
    actualTrimmed: cleanActual,
    expectedTrimmed: cleanExpected,
  };
}
