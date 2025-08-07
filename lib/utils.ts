import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility class by shadcn that merges HTML classes, and adds the ability for conditional classes through dictionaries.
 *
 * @param inputs - A set of string values to merge together.
 * @returns Merged and deduplicated class string
 *
 * @example
 * ```ts
 * // Basic usage
 * cn("bg-red-500", "text-white") // "bg-red-500 text-white"
 *
 * // Conditional classes
 * cn("btn", { "btn-primary": isPrimary, "btn-disabled": isDisabled })
 *
 * // Tailwind conflict resolution
 * cn("bg-red-500", "bg-blue-500") // "bg-blue-500" (last one wins)
 *
 * // Mixed usage
 * cn("base-class", someCondition && "conditional-class", {
 *   "active": isActive,
 *   "disabled": !isEnabled
 * })
 * ```
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
