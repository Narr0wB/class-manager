import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import config from "@/public/config.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// After 13.00 it's not possible to book a classroom anymore
export function getValidDate() {
  const todayDate = new Date(new Date().getTime() + Math.abs(new Date().getTimezoneOffset() * 60000));
  const tomorrowDate = new Date(new Date().getTime() + Math.abs(new Date().getTimezoneOffset() * 60000));
  tomorrowDate.setDate(todayDate.getDate() + 1);

  return todayDate.getHours() > config.min.ora_prenotazione ? tomorrowDate : todayDate;
}

export function minutesToString(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}:${m <= 9 ? "0" + m : m}`;
}

/**
 *
 * @param timeString a string in the format "hh:mm:ss"
 * @return the minutes of an hour string ignoring the seconds.
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

/**
 *
 * @param date a string in the format "dd/MM"
 * @param year a 4 digit number representing the year
 * @return A Date object representing the given date at the given year
 */
export function stringToDate(date: string, year: number): Date {
  const [dayString, monthString] = date.split("/");

  const day = Number(dayString.length == 0 ? "0" + dayString : dayString);

  // Because the month number starts from 0
  const month = Number(monthString) - 1;

  return new Date(`${year}-${month}-${day}`);
}