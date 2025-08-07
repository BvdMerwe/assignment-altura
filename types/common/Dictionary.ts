import type { DataType } from "~/types/common/DataType";

export interface Dictionary {
    [key: string]: DataType | Dictionary | Dictionary[];
}