<script setup lang="ts">
interface PropType {
    content: string
}

const { content } = defineProps<PropType>();
</script>
<template>
    <div class="text-start font-mono">{{content}}</div>
</template>