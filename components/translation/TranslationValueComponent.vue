<script setup lang="ts">
import { mapLanguageCodeToEmoji } from "~/lib/LanguageLib";
import type { TranslationValue } from "~/types";
import { cn } from "~/lib/utils";

const { value, shouldClip } = defineProps<{ value: TranslationValue, shouldClip?: boolean }>();
</script>
<template>
    <div
        :class="cn(
            'flex gap-2 max-w-[300px]',
            {
                'text-wrap': shouldClip === false
            }
        )"
    >
        <span :title="value.languages_code">
            {{ mapLanguageCodeToEmoji(value.languages_code) }}
        </span>
        <span
            :class="cn({
                'overflow-hidden text-ellipsis': shouldClip
            })"
        >{{ value.value }}</span>
    </div>
</template>
