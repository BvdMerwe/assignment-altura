import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import type { DirectusTranslation, TranslationValue } from "~/types";
import { dateDistanceOrNull } from "~/lib/DateLib";
import TranslationValuesComponent from "~/components/translation/TranslationValuesComponent.vue";
import TranslationTableCellComponent from "~/components/translation/TranslationTableCellComponent.vue";

export const columns: ColumnDef<DirectusTranslation>[] = [
    {
        accessorKey: "key",
        header: () => h("div", { class: "text-start" }, "Key"),
        cell: ({ row }) => {
            // TODO: Add a copy to clipboard icon here.
            const key = row.getValue<string>("key");

            return h(TranslationTableCellComponent, {
                class: "text-mono max-w-[300px] overflow-hidden text-ellipsis",
                title: key,
                content: key,
            });
        },
    },
    {
        accessorKey: "translations",
        header: () => h("div", { class: "text-start" }, "Translations"),
        cell: ({ row }) => {
            const translations = row.getValue<TranslationValue[]>("translations");

            return h("div",
                { class: "flex gap-4" },
                [
                    h(
                        TranslationValuesComponent,
                        {
                            values: translations,
                        },
                    ),
                ],
            );
        },
    },
    {
        accessorKey: "updatedAt",
        header: () => h("div", { class: "text-start" }, "Last updated"),
        cell: ({ row }) => {
            return h(
                TranslationTableCellComponent,
                {
                    class: "max-w-sm text-xs",
                    content: dateDistanceOrNull(row.getValue<string>("updatedAt")) ?? "",
                },
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: () => h("div", { class: "text-start" }, "Created"),
        cell: ({ row }) => {
            return h(
                TranslationTableCellComponent,
                {
                    class: "max-w-sm text-xs",
                    content: dateDistanceOrNull(row.getValue<string>("createdAt")) ?? "",
                },
            );
        },
    },
];