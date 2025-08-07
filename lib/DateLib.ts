import { formatDistance } from "date-fns";

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