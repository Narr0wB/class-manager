import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import config from "@/public/config.json";
import { isAfter, isBefore, isSameDay, isSunday } from "date-fns";
import disabledList from "@/public/disabled.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocaleDate(date: Date): Date {
  return new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));
}

export function getNextDayDate(date: Date): Date {
  const nextDayDate = getLocaleDate(new Date);
  nextDayDate.setDate(date.getDate() + 1);

  return nextDayDate;
}

export function isDateManuallyDisabled(date: Date): boolean {
  const disabled = disabledList.map(disabledString => new Date(disabledString));
  return disabled.some(dd => isSameDay(dd, date));
}

export function getValidDate(): Date {
  // Note: Do not use getLocaleDate
  let date = new Date();

  // First check this case alone, as it causes an infinite loop
  if (date.getHours() >= config.min.ora_prenotazione) {
    date = getNextDayDate(date);
    date.setHours(0, 0, 0, 0);
  }

  // Only check the day from this point
  while (isDateManuallyDisabled(date) || isSunday(date)) {
    date.setDate(date.getDate() + 1);
  }

  return date;
}

export function isDateBeforeValidDate(date: Date): boolean {
  const validDate = getValidDate();
  const locale = getLocaleDate(date);

  return isBefore(locale, validDate);
}

export function getValidMonthDate(): Date {
  const validDate = getValidDate();
  const date = new Date();
  date.setMonth(validDate.getMonth());
  return date;
}

export function isDateInSchoolYear(date: Date): boolean {
  const year = date.getFullYear();
  const month = date.getMonth();
  const isSecondHalf = month >= 0 && month <= 5; // 0 = January, 5 = june
  const start = stringToDate(config.min.data, isSecondHalf ? year - 1 : year);
  const end = stringToDate(config.max.data, isSecondHalf ? year : year + 1);

  return isBefore(date, end) && isAfter(date, start);
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

  return new Date(year, month, day);
}
