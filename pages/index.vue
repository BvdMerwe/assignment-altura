<script lang="ts" setup>
import { useApi } from "~/composables/useApi";

const api = await useApi();
const translations = await api.list("translationKeys");
const count = await api.aggregate("translationKeys", "count");
</script>
<template>
    <div class="container my-8 px-8">
        <h1 class="">Init: {{ count }}</h1>
        <div v-for="translation in translations" :key="translation.key">
            {{translation.key}}
        </div>
    </div>
</template>
