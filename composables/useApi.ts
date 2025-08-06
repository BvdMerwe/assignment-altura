import { useAsyncData } from "#app";

export type EndpointType = "translationKeys";

export async function useApi() {
    const  { $directus, $readItems, $aggregate } = useNuxtApp();
    const query = {
        fields: ["key", "variables", "translations"],
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
        const { data } = useAsyncData(endpoint, () => {
            return $directus.request($readItems(endpoint, query));
        });

        return data;
    }

    // TODO: Add fetch/update/create

    return { list, aggregate };
}