import { useAsyncData } from "#app";
import type { DirectusTranslation } from "~/types";

export type EndpointType = "translationKeys";

interface QueryType {
    fields: string[],
    limit: number,
    page: number,
    search?: string,
    filter?: { [key: string]: string }
}

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
        limit: 10,
        page: 1,
    };

    async function aggregate(endpoint: EndpointType, aggregateBy: string) {
        const { data } = await useAsyncData(endpoint, async () => {
            return await $directus.request($aggregate(endpoint, {
                aggregate: { [aggregateBy]: "*" },
            }));
        });

        if (data.value === null) {
            throw Error("Not able to count data");
        }

        return data.value?.[0][aggregateBy];
    }

    async function list(endpoint: EndpointType, query?: QueryType) {
        const { data } = await useAsyncData(
            endpoint,
            async () => {
                return await $directus.request<DirectusTranslation[]>($readItems(endpoint, {
                    ...queryDefault,
                    ...query,
                }));
            });

        return data.value ?? [];
    }

    // TODO: Add fetch/update/create

    return { list, aggregate };
}