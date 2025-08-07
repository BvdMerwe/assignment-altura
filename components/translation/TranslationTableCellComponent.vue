<script setup lang="ts">
const { content } = defineProps<{
    content: string
}>();
</script>
<template>
    <div class="text-start font-mono">{{content}}</div>
</template>