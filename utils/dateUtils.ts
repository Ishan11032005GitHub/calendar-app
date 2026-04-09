import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
} from "date-fns";

export function getMonthDays(date: Date) {
  const start = startOfMonth(date);
  const end = endOfMonth(date);

  const days = eachDayOfInterval({ start, end });

  const startDay = getDay(start);

  const prefix = Array(startDay).fill(null);

  return [...prefix, ...days];
}