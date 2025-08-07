<script lang="ts" setup>
import { type QueryType, useApi } from "~/composables/useApi";
import DataTable from "~/components/ui/data-table/DataTable.vue";
import { columns } from "~/components/definitions/columns";
import { Input } from "~/components/ui/input";
import { ref  } from "vue";
import { watchDebounced } from "@vueuse/core";
import type { DirectusTranslation } from "~/types";

const searchString = ref<string>("");
const isLoading = ref<boolean>(false);
const api = await useApi();
const translations = ref<DirectusTranslation[]>(await api.list("translationKeys"));
const count = ref<number>(await api.aggregate("translationKeys", "count"));
const query = ref<QueryType>({});

watchDebounced(searchString, async () => {
    isLoading.value = true;

    if (searchString.value === "") {
        // Don't add a query.
    } else {
        query.value.filter = {
            "key": {
                "_contains": searchString.value,
            },
        };
    }

    await updateValues();

    isLoading.value = false;
}, { debounce: 300 });

async function updateValues(): Promise<void> {
    translations.value = await api.list("translationKeys", query.value);
}

async function setPage(page:number): Promise<void> {
    query.value.page = page;
    await updateValues();
}
</script>
<template>
    <div class="m-6">
        <div>{{count}}</div>
        <div class="my-4 flex items-center space-x-2 w-full">
            <img src="/public/goose.png" width="40" />
            <Input
                v-model="searchString"
                class="max-w-md"
            />
        </div>
        <DataTable
            :is-loading="isLoading"
            :columns="columns"
            :data="translations"
            :row-count="count"
            @set-page="setPage"
        />
    </div>
</template>
