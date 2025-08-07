import { useAsyncData } from "#app";
import type { DirectusTranslation } from "~/types";
import type { Dictionary } from "~/types/common/Dictionary";
import { generateCacheKey } from "~/lib/ApiLib";

export type EndpointType = "translationKeys";

export interface QueryType {
    fields?: string[],
    limit?: number,
    page?: number,
    search?: string,
    filter?: Dictionary
}

const QUERY_PAGE_SIZE_LIMIT = 20;
const QUERY_PAGE_INITIAL = 1;

export async function useApi() {
    const  { $directus, $readItems, $aggregate } = useNuxtApp();
    const queryDefault: QueryType = {
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

    async function aggregate(endpoint: EndpointType, aggregateBy: string) {
        const { data } = await useAsyncData(
            generateCacheKey(endpoint + aggregateBy),
            async () => {
                return await $directus.request($aggregate(endpoint, {
                    aggregate: { [aggregateBy]: "*" },
                }));
            },
        );

        if (data.value === null) {
            throw Error("Not able to count data");
        }

        return data.value?.[0][aggregateBy];
    }

    async function list(endpoint: EndpointType, query?: QueryType) {
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

    // TODO: Add fetch/update/create

    return { list, aggregate };
}