import type { Dictionary } from "~/types/common/Dictionary";

export interface ApiQueryType {
    fields?: string[],
    limit?: number,
    page?: number,
    search?: string,
    filter?: Dictionary
}