import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function minutesToHourString(minutes: number): string {
  const date = new Date();
  date.setHours(Math.floor(minutes / 60), minutes % 60);

  const mins = date.getMinutes();
  const minsString = mins.toString().length > 1 ? mins.toString() : "0" + mins;

  return date.getHours() + ":" + minsString;
}

// After 13.00 it's not possible to book a classroom anymore
export function getValidDate() {
  const todayDate = new Date();
  const tomorrowDate = new Date();
  tomorrowDate.setDate(todayDate.getDate() + 1);

  return todayDate.getHours() > 13 ? tomorrowDate : todayDate;
}

export function formatHour(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}:${m <= 9 ? "0" + m : m}`;
}

/**
 * Returns the minutes of an hour string ignoring the seconds.
 *
 * @param timeString a string in the format "hh:mm:ss"
 * @return the sum of a and b
 */
export function stringToMinutes(timeString: string): number {
  const [hours, minutes, _] = timeString.split(':');
  return parseInt(hours) * 60 + parseInt(minutes);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("it", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
}