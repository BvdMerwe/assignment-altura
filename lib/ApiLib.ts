import type { Dictionary } from "~/types/common/Dictionary";
import type { DataType } from "~/types/common/DataType";

export function generateCacheKey(keyValue: DataType | Dictionary | Dictionary[]): string {
    if (Array.isArray(keyValue)) {
        return keyValue.map((obj) => flattenObject(obj)).join("-");
    }

    return flattenObject(keyValue);
}

function flattenObject(obj: DataType | Dictionary, prefix: string = ""): string {
    const parts: string[] = [];

    for (const [key, value] of Object.entries(obj)) {
        const currentKey = prefix ? `${prefix}.${key}` : key;

        if (value === null || value === undefined) {
            parts.push(`${currentKey}:null`);
        } else if (typeof value === "object" && !Array.isArray(value)) {
            // Recursively flatten nested objects
            parts.push(flattenObject(value as Dictionary, currentKey));
        } else if (Array.isArray(value)) {
            // Handle arrays by joining their values
            parts.push(`${currentKey}:[${value.join(",")}]`);
        } else {
            // Handle primitive values
            parts.push(`${currentKey}:${String(value)}`);
        }
    }

    return parts.join("-");
}
