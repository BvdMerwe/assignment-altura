<script lang="ts" setup>
import { useApi } from "~/composables/useApi";
import DataTable from "~/components/ui/data-table/DataTable.vue";
import { columns } from "~/components/definitions/columns";

const api = await useApi();
const translations = await api.list("translationKeys");

console.log(translations);
const count = await api.aggregate("translationKeys", "count");
</script>
<template>
    <DataTable :columns="columns" :data="translations" />
</template>
