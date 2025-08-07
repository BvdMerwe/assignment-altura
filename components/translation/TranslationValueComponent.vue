<script setup lang="ts">
import { mapLanguageCodeToEmoji } from "~/lib/LanguageLib";
import type { TranslationValue } from "~/types";

const { value } = defineProps<{ value: TranslationValue }>();
</script>
<template>
    <div class="flex gap-2 max-w-2xl text-wrap">
        <span :title="value.languages_code">
            {{ mapLanguageCodeToEmoji(value.languages_code) }}
        </span>
        <span>{{ value.value }}</span>
    </div>
</template>
