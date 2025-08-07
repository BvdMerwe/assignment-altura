import type { ColumnDef } from "@tanstack/vue-table";
import type { DirectusTranslation, TranslationValue } from "~/types";
import { dateDistanceOrNull } from "~/lib/DateLib";
import { mapLanguageCodeToEmoji } from "~/lib/LanguageLib";

export const columns_b: ColumnDef<DirectusTranslation>[] = [
    {
        accessorKey: "key",
        header: () => <div class="text-start">Key</div>,
        cell: ({ row }) => {
            // TODO: Add a copy to clipboard icon here.
            return <div class="text-start font-mono">{row.getValue("key")}</div>;
        },
    },
    {
        accessorKey: "translations",
        header: () => <div class="text-start">Translations</div>,
        cell: ({ row }) => {
            return (
                <div class="">
                    <span></span>
                    {row.getValue<TranslationValue[]>("translations").map((value: TranslationValue) => (
                        <div class="flex gap-1">
                            <span title={value.languages_code}>
                                {mapLanguageCodeToEmoji(value.languages_code)}
                            </span>
                            <span>{value.value}</span>
                        </div>
                    ))}
                </div>
            );
        },
    },
    {
        accessorKey: "updatedAt",
        header: () => <div class="text-start">Last updated</div>,
        cell: ({ row }) => {
            return (
                <div class="text-start">
                    {dateDistanceOrNull(row.getValue("updatedAt")) ?? ""}
                </div>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: () => <div class="text-start">Created</div>,
        cell: ({ row }) => {
            return (
                <div class="text-start">
                    {dateDistanceOrNull(row.getValue("createdAt")) ?? ""}
                </div>
            );
        },
    },
];