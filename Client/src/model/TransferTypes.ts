import type {MyError} from "@/model/MyError";
export interface DataEnvelope<T> {
    data: T;
    message?: string;
    error?: MyError;
}
export interface DataListEnvelope<T> extends DataEnvelope<T[]>{
    data: T[];
    totalItems?: number;
    pageLimit?: number;
}

export type DynamicDataEnvelope<T> = T extends (infer U)[] ? DataListEnvelope<U> : DataEnvelope<T>;

