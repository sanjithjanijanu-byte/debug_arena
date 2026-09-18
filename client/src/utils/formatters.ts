/**
 * Formats a score for display so it stays clean, readable, and never overflows its container.
 * - Integer scores display cleanly without decimals (e.g. 100, 0)
 * - Decimal scores are rounded to at most 2 decimal places with trailing zeroes stripped (e.g. 66.67, 8.33)
 */
export const formatScore = (val: number | null | undefined): string => {
  if (val === null || val === undefined || isNaN(Number(val))) return '0';
  const num = Number(val);
  if (Number.isInteger(num)) return num.toString();
  return parseFloat(num.toFixed(2)).toString();
};
