import { useAsyncData } from "#app";
import type { DirectusTranslation } from "~/types";
import { generateCacheKey } from "~/lib/ApiLib";
import type { ApiQueryType } from "~/types/api/ApiQueryType";
import type { ApiEndpointType } from "~/types/api/ApiEndpointType";

const QUERY_PAGE_SIZE_LIMIT = 20;
const QUERY_PAGE_INITIAL = 1;

/**
 * Composable for making API requests to Directus endpoints
 *
 * Provides methods for fetching and aggregating data with caching support.
 * Uses Nuxt"s `useAsyncData` for automatic server-side rendering and client-side hydration.
 *
 * @returns Object containing API methods
 *
 * @example
 * ```ts
 * const { list, aggregate } = await useApi();
 *
 * // Fetch translation keys with custom query
 * const translations = await list("translationKeys", {
 *   limit: 10,
 *   search: "welcome",
 *   fields: ["key", "translations"]
 * });
 *
 * // Get total count of translation keys
 * const totalCount = await aggregate("translationKeys", "count");
 * ```
 */
export async function useApi() {
    const  { $directus, $readItems, $aggregate } = useNuxtApp();
    const queryDefault: ApiQueryType = {
        fields: [
            "key",
            "variables",
            "translations",
            "createdAt",
            "updatedAt",
            "translations.value",
            "translations.languages_code",
        ],
        limit: QUERY_PAGE_SIZE_LIMIT,
        page: QUERY_PAGE_INITIAL,
    };

    /**
     * Performs aggregation operations on the specified endpoint
     *
     * @param endpoint - The API endpoint to query
     * @param aggregateBy - The field to aggregate by (e.g., "count", "sum", "avg")
     * @param query - Optional query parameters to filter the aggregation
     * @returns Promise resolving to the aggregated value
     *
     * @throws {Error} When unable to retrieve aggregation data
     *
     * @example
     * ```ts
     * // Get total count of translation keys
     * const count = await aggregate("translationKeys", "count");
     *
     * // Get count with filters
     * const filteredCount = await aggregate("translationKeys", "count", {
     *   filter: { status: "published" }
     * });
     * ```
     */
    async function aggregate(endpoint: ApiEndpointType, aggregateBy: string, query?: ApiQueryType) {
        const { data } = await useAsyncData(
            generateCacheKey({ endpoint, aggregateBy, query: query ?? "" }),
            async () => {
                return await $directus.request($aggregate(endpoint, {
                    aggregate: { [aggregateBy]: "*" },
                    query,
                }));
            },
        );

        if (data.value === null) {
            throw Error("Not able to count data");
        }

        return data.value?.[0][aggregateBy];
    }

    /**
     * Fetches a list of items from the specified endpoint
     *
     * @param endpoint - The API endpoint to query
     * @param query - Optional query parameters to customize the request
     * @returns Promise resolving to an array of DirectusTranslation objects
     *
     * @example
     * ```ts
     * // Fetch with default settings
     * const translations = await list('translationKeys');
     *
     * // Fetch with custom pagination and search
     * const searchResults = await list('translationKeys', {
     *   page: 2,
     *   limit: 50,
     *   search: 'error',
     *   fields: ['key', 'translations.value']
     * });
     * ```
     */
    async function list(endpoint: ApiEndpointType, query?: ApiQueryType) {
        const queryCurrent = {
            ...queryDefault,
            ...query,
        };

        const { data } = await useAsyncData(
            generateCacheKey(queryCurrent),
            async () => {
                return await $directus.request<DirectusTranslation[]>($readItems(endpoint, queryCurrent));
            },
        );

        return data.value ?? [];
    }

    return { list, aggregate };
}