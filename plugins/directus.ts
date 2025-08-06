import { aggregate, createDirectus, readItem, readItems, rest } from "@directus/sdk";

const directus = createDirectus("http://localhost:3000/api").with(rest());

export default defineNuxtPlugin(() => {
    return {
        provide: { directus, readItem, readItems, aggregate },
    };
});
