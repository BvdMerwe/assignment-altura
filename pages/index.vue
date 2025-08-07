<script lang="ts" setup>
import { type QueryType, useApi } from "~/composables/useApi";
import DataTable from "~/components/ui/data-table/DataTable.vue";
import { columns } from "~/components/definitions/columns";
import { Input } from "~/components/ui/input";
import { ref  } from "vue";
import { watchDebounced } from "@vueuse/core";
import type { DirectusTranslation } from "~/types";
import DateRangePicker from "~/components/ui/filter/DateRangePicker.vue";
import type { DateRange } from "reka-ui";

const api = await useApi();
const translations = ref<DirectusTranslation[]>(await api.list("translationKeys"));
const count = ref<number>(await api.aggregate("translationKeys", "count"));
const query = ref<QueryType>({});
const dateRange = ref<DateRange>();
const searchString = ref<string>("");
const isLoading = ref<boolean>(false);

watchDebounced(dateRange, async () => {
    if (typeof dateRange.value === "undefined") {
        return;
    }

    const { start, end } = dateRange.value;

    if (start && end) {
        query.value.filter = {
            ...query.value.filter,
            "updatedAt": {
                "_between": [
                    start.toString(), end.toString(),
                ],
            },

        };
    } else {
        delete query.value.filter?.updatedAt;
    }

    await updateValues();
});

watchDebounced(searchString, async () => {
    const { value } = searchString;

    isLoading.value = true;

    if (value === "" || value.length < 3) {
        delete query.value.filter?.key;
    } else {
        query.value.filter = {
            ...query.value.filter,
            "key": {
                "_contains": value,
            },
        };
    }

    await updateValues();

    isLoading.value = false;
}, { debounce: 300 });

async function updateValues(): Promise<void> {
    translations.value = await api.list("translationKeys", query.value);
    count.value = await api.aggregate("translationKeys", "count", query.value);
}

async function setPage(page:number): Promise<void> {
    query.value.page = page;
    await updateValues();
}
</script>
<template>
    <div class="m-6">
        <div class="my-4 flex items-center space-x-2 w-full">
            <img src="/public/goose.png" width="40" alt="logo" />
            <Input
                v-model="searchString"
                class="max-w-md"
            />
            <DateRangePicker
                v-model="dateRange"
                placeholder="Select date range"
                :number-of-months="1"
                button-class="w-[200px]"
            />
        </div>

        <div class="mb-4">Total keys: {{count}}</div>
        <DataTable
            :is-loading="isLoading"
            :columns="columns"
            :data="translations"
            :row-count="count"
            @set-page="setPage"
        />
    </div>
</template>
