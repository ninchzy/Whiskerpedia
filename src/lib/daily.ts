/** A stable index for "today" (local time), so daily features change at midnight for each visitor. */
export function dayIndex(length: number, salt = 0, date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const day = Math.floor((date.getTime() - start.getTime()) / 86_400_000);
  return (day + date.getFullYear() * 7 + salt) % length;
}
