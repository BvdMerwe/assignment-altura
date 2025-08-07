import { useAsyncData } from "#app";
import type { DirectusTranslation } from "~/types";

export type EndpointType = "translationKeys";

export async function useApi() {
    const  { $directus, $readItems, $aggregate } = useNuxtApp();
    const query = {
        fields: [
            "key",
            "variables",
            "translations",
            "createdAt",
            "updatedAt",
            "translations.value",
            "translations.languages_code",
        ],
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

    async function list(endpoint: EndpointType) {
        const { data } = await useAsyncData(
            endpoint,
            async () => {
                return await $directus.request<DirectusTranslation[]>($readItems(endpoint, query));
            });

        return data.value ?? [];
    }

    // TODO: Add fetch/update/create

    return { list, aggregate };
}