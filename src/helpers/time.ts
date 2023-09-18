import {
  formatDistanceToNow,
  parseISO,
  format,
  differenceInYears,
} from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

import es from "date-fns/locale/es";

/**
 * Calculates the relative time ago and returns a formatted string representing the time difference.
 * The output format is "time ago - (formatted date)".
 *
 * @param {Date} date - The date to calculate the time ago from.
 * @returns {string} A formatted string representing the relative time ago and the formatted date.
 *
 * @example
 * const date = new Date('2023-07-04T00:33:22.000Z');
 * const result = timeAgo(date);
 * //Example output: "hace alrededor de 1 hora - (03/07/2023 a las 7:33 a.m.)"
 */
export function timeAgo(date: string): string {
  const formatedDate = parseISO(date.toString());

  const timeAgoText = formatDistanceToNow(formatedDate, {
    addSuffix: true,
    locale: es,
  });

  const formattedFullDate = format(formatedDate, "dd/MM/yyyy 'a las' h:mm a", {
    locale: es,
  });
  return `${timeAgoText}`;
}

/**
 * Calculates the age and returns a formatted string representing the age and the formatted birthday date.
 * The output format is "age - (formatted birthday date)".
 *
 * @param {Date} birthday - The date of the birthday.
 * @returns {string} A formatted string representing the age and the formatted birthday date.
 *
 * @example
 * const birthday = new Date('1999-03-07T00:00:00.000Z');
 * const result = ageAtDate(birthday);
 * // Example output: "24 años - (7 de marzo de 1999, 07/03/1999)"
 */
export function ageAtDate(birthday: Date): string {
  // Convert the input date to UTC to avoid timezone issues
  const utcBirthday = utcToZonedTime(birthday, "UTC");
  const currentDate = new Date();
  const age = differenceInYears(currentDate, utcBirthday);

  const formattedBirthday = format(
    utcBirthday,
    "d 'de' MMMM 'de' yyyy, dd/MM/yyyy",
    {
      locale: es,
    }
  );

  return `${age} años - (${formattedBirthday})`;
}

/**
 * Formats a date string in ISO 8601 format to the "MM/dd/yyyy" format.
 *
 * @param {string} date - The date string in ISO 8601 format (e.g., "1999-03-07T00:00:00.000Z").
 * @returns {string} A formatted date string in "MM/dd/yyyy" format.
 *
 * @example
 * const inputDateString = "1999-03-07T00:00:00.000Z";
 * const formattedDate = formatDate(inputDateString);
 * // Example output: "03/07/1999"
 */
export function formatDate(date: string) {
  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, "MM/dd/yyyy hh:mm");
  return formattedDate;
}
