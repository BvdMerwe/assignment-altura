import { formatDistance } from "date-fns";

/**
 * Returns human-readable distance from now or null if date is invalid
 *
 * @param date - Date to calculate distance from (Date object, ISO string, or null)
 * @returns Formatted distance string (e.g., "2 hours ago") or null
 *
 * @example
 * ```ts
 * dateDistanceOrNull(new Date()) // "less than a minute ago"
 * dateDistanceOrNull("2023-01-01") // "1 year ago"
 * dateDistanceOrNull(null) // null
 * ```
 */
export function dateDistanceOrNull(date?: Date | string | null): string | null {
    const options = { addSuffix: true };
    const dateNow = new Date();

    if (typeof date === "string") {
        return formatDistance(new Date(date), dateNow, options);
    } else if (date instanceof Date) {
        return formatDistance(date, dateNow, options);
    } else {
        return null;
    }
}