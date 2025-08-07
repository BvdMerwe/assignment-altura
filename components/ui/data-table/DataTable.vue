<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef } from "@tanstack/vue-table";
import { Button } from "@/components/ui/button";
import {
    FlexRender,
    getCoreRowModel,
    useVueTable,
} from "@tanstack/vue-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const props = defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    rowCount?: number
}>();

const pagination = ref<{
    pageIndex: number;
    pageSize: number;
}>({
    pageSize: props.data.length,
    pageIndex: 0,
});

const emit = defineEmits(["setPage"]);

const paginationDisplay = computed(() => {
    const { pageIndex, pageSize } = pagination.value;
    const end = pageIndex * pageSize + pageSize;
    const totalRows = props.rowCount ?? props.data.length;
    const rowIndexEnd = Math.min(end, totalRows);
    const currentPage = pageIndex + 1;
    const rowIndexStart = pageIndex * pageSize + 1;
    const totalPages = Math.ceil((totalRows ?? 1) / pageSize);

    return {
        currentPage,
        rowIndexStart,
        rowIndexEnd,
        totalPages,
    };
});

const canPageNext = computed(() => {
    if (props.rowCount ?? 0 > 0) {
        const totalPages = Math.ceil((props.rowCount ?? 0) / pagination.value.pageSize);

        return pagination.value.pageIndex < totalPages - 1;
    } else {
        return false;
    }
});

const canPagePrevious = computed(() => {
    return pagination.value.pageIndex > 0;
});

const table = useVueTable({
    get data() { return props.data; },
    get columns() { return props.columns; },
    getCoreRowModel: getCoreRowModel(),
    rowCount: props.rowCount ?? props.data.length,
    manualPagination: true,
});

function pageNext() {
    pagination.value.pageIndex += 1;

    emit("setPage", pagination.value.pageIndex + 1);
}

function pagePrevious() {
    pagination.value.pageIndex -= 1;

    emit("setPage", pagination.value.pageIndex + 1);
}
</script>

<template>
    <div class="border rounded-md">
        <Table>
            <TableHeader>
                <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                    <TableHead v-for="header in headerGroup.headers" :key="header.id">
                        <FlexRender
                            v-if="!header.isPlaceholder"
                            :render="header.column.columnDef.header"
                            :props="header.getContext()"
                        />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <template v-if="table.getRowModel().rows?.length">
                    <TableRow
                        v-for="row in table.getRowModel().rows"
                        :key="row.id"
                        :data-state="row.getIsSelected() ? 'selected' : undefined"
                    >
                        <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                        </TableCell>
                    </TableRow>
                </template>
                <template v-else>
                    <TableRow>
                        <TableCell :colspan="columns.length" class="h-24 text-center">
                            No results.
                        </TableCell>
                    </TableRow>
                </template>
            </TableBody>
        </Table>
        <div class="flex items-center justify-end py-4 space-x-2 px-4">
            <Button
                variant="outline"
                size="sm"
                :disabled="canPagePrevious === false"
                @click="pagePrevious()"
            >
                Previous
            </Button>
            <div class="text-xs opacity-75">
                Page {{paginationDisplay.currentPage}} of {{paginationDisplay.totalPages}}
                ({{paginationDisplay.rowIndexStart}} - {{paginationDisplay.rowIndexEnd}})
            </div>
            <Button
                variant="outline"
                size="sm"
                :disabled="canPageNext === false"
                @click="pageNext()"
            >
                Next
            </Button>
        </div>
    </div>
</template>