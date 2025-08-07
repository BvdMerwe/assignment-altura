import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import type { DirectusTranslation, TranslationValue } from "~/types";
import { dateDistanceOrNull } from "~/lib/DateLib";
import { mapLanguageCodeToEmoji } from "~/lib/LanguageLib";

export const columns: ColumnDef<DirectusTranslation>[] = [
    {
        accessorKey: "key",
        header: () => h("div", { class: "text-start" }, "Key"),
        cell: ({ row }) => {
            // TODO: Add a copy to clipboard icon here.
            return h("div", { class: "text-start font-mono" }, row.getValue("key"));
        },
    },
    {
        accessorKey: "translations",
        header: () => h("div", { class: "text-start" }, "Translations"),
        cell: ({ row }) => {
            return h(
                "div",
                { class: "" },
                row.getValue<TranslationValue[]>("translations").map((value: TranslationValue) =>
                    h(
                        "div",
                        { class: "flex gap-1" },
                        [
                            h("span", { title: value.languages_code }, mapLanguageCodeToEmoji(value.languages_code)),
                            h("span", value.value),
                        ],
                    ),
                ));
        },
    },
    {
        accessorKey: "updatedAt",
        header: () => h("div", { class: "text-start" }, "Last updated"),
        cell: ({ row }) => {
            return h(
                "div",
                { class: "text-start" },
                dateDistanceOrNull(row.getValue("updatedAt")) ?? "",
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: () => h("div", { class: "text-start" }, "Created"),
        cell: ({ row }) => {
            return h(
                "div",
                { class: "text-start" },
                dateDistanceOrNull(row.getValue("createdAt")) ?? "",
            );
        },
    },
];