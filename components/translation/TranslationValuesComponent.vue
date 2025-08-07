<script setup lang="ts">

import type { TranslationValue } from "~/types";

const { values } = defineProps<{
    values: TranslationValue[];
}>();
</script>
<template>
    <div class="group relative w-full">
        <TranslationValueComponent :value="values[0]" />
        <div class="z-10 p-4 bg-white hidden gap-1 group-hover:flex flex-col absolute top-[100%] left-0 rounded-lg shadow-2xl">
            <TranslationValueComponent v-for="value in values" :key="value.id" :value="value" />
        </div>
    </div>
</template>