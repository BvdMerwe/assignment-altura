// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import type { PluginOption } from "vite";

export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    modules: ["@nuxt/eslint", "shadcn-nuxt"],
    css: ["~/assets/css/tailwind.css"],
    vite: {
        plugins: [
            tailwindcss() as PluginOption,
        ],
    },
    nitro: {
        openAPI: {
            meta: {
                title: "My Awesome Project",
                description: "This might become the next big thing.",
                version: "1.0",
            },
        },
        routeRules: {
            "/api/**": {
                proxy: "https://directus.altura.io/**",
            },
        },
    },
    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: "",
        /**
         * Directory that the component lives in.
         * @default "./components/ui"
         */
        componentDir: "./components/ui",
    },
});