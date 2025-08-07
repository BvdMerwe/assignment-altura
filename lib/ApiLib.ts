import type { Dictionary } from "~/types/common/Dictionary";

/**
 * Generates a cache key string from an object or array of objects.
 *
 * This function creates deterministic cache keys by flattening objects into
 * a string representation. Useful for creating unique identifiers for caching
 * API responses or other data structures.
 *
 * @param keyValue - The object or array of objects to generate a cache key from
 * @returns A flattened string representation suitable for use as a cache key
 *
 * @example
 * ```ts
 * // Single object
 * const key1 = generateCacheKey({ endpoint: 'users', page: 1, limit: 10 });
 * // Returns: "endpoint:users-page:1-limit:10"
 *
 * // Array of objects
 * const key2 = generateCacheKey([
 *   { type: 'filter', field: 'status' },
 *   { type: 'sort', field: 'name' }
 * ]);
 * // Returns: "type:filter-field:status-type:sort-field:name"
 *
 * // Nested object
 * const key3 = generateCacheKey({
 *   query: { fields: ['name', 'email'], filter: { active: true } }
 * });
 * // Returns: "query.fields:[name,email]-query.filter.active:true"
 * ```
 */
export function generateCacheKey(keyValue: object | object[]): string {
    if (Array.isArray(keyValue)) {
        return keyValue.map((obj) => flattenObject(obj)).join("-");
    }

    return flattenObject(keyValue);
}

/**
 * Recursively flattens a nested object into a string representation.
 *
 * Converts an object with potentially nested properties into a flat string
 * format where each key-value pair is represented as "key:value" and joined
 * with hyphens. Handles nested objects, arrays, null/undefined values, and
 * primitive types.
 *
 * @param obj - The object to flatten
 * @param prefix - Internal parameter for nested key prefixing (used during recursion)
 * @returns A flattened string representation of the object
 *
 * @internal This function is used internally by generateCacheKey
 *
 * @example
 * ```ts
 * // Simple object
 * flattenObject({ name: 'John', age: 30 });
 * // Returns: "name:John-age:30"
 *
 * // Object with nested properties
 * flattenObject({ user: { name: 'John', settings: { theme: 'dark' } } });
 * // Returns: "user.name:John-user.settings.theme:dark"
 *
 * // Object with array
 * flattenObject({ tags: ['javascript', 'typescript'], count: 5 });
 * // Returns: "tags:[javascript,typescript]-count:5"
 *
 * // Object with null/undefined values
 * flattenObject({ name: 'John', email: null, phone: undefined });
 * // Returns: "name:John-email:null-phone:null"
 * ```
 */
function flattenObject(obj: object, prefix: string = ""): string {
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
