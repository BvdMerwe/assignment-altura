<script setup lang="ts">
import type { DateRange } from "reka-ui";

import type { CalendarDate } from "@internationalized/date";
import {
    DateFormatter,
    getLocalTimeZone,
} from "@internationalized/date";
import { CalendarIcon, X } from "lucide-vue-next";
import { computed } from "vue";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RangeCalendar } from "@/components/ui/range-calendar";

interface Props {
    modelValue?: DateRange;
}

interface Emits {
    (e: "update:modelValue", value: DateRange): void;
}

const props = withDefaults(defineProps<Props>(), {
});

const emit = defineEmits<Emits>();

const df = new DateFormatter("en-US", {
    dateStyle: "medium",
});

const value = computed({
    get: () => props.modelValue || { start: undefined, end: undefined },
    set: (newValue: DateRange) => emit("update:modelValue", newValue),
});

const handleStartValueUpdate = (startDate: CalendarDate | undefined) => {
    value.value = {
        ...value.value,
        start: startDate,
    };
};

function clearRange() {
    emit("update:modelValue", {
        start: undefined,
        end: undefined,
    });
}
</script>

<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button
                variant="outline"
                :class="cn(
                    'w-[280px] justify-start text-left font-normal relative',
                    !value.start && 'text-muted-foreground',
                )"
            >
                <CalendarIcon class="mr-2 h-4 w-4" />
                <template v-if="value.start">
                    <template v-if="value.end">
                        <span>{{ df.format(value.start.toDate(getLocalTimeZone())) }} - {{ df.format(value.end.toDate(getLocalTimeZone())) }}</span>

                        <div class="absolute right-3 top-2 cursor-pointer" @click="clearRange">
                            <X />
                        </div>
                    </template>

                    <template v-else>
                        {{ df.format(value.start.toDate(getLocalTimeZone())) }}
                    </template>
                </template>
                <template v-else>
                    Select a date
                </template>
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
            <RangeCalendar
                v-model="value"
                initial-focus
                :number-of-months="2"
                @update:start-value="handleStartValueUpdate"
            />
        </PopoverContent>
    </Popover>
</template>