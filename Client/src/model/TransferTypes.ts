export interface DataEnvelope<T> {
    data: T;
    isSuccessful: boolean;
    status: number;
    message: string;
}
export interface DataListEnvelope<T> extends DataEnvelope<T[]>{
    data: T[];
    totalItems: number;
    pageLimit: number;
}

export type DynamicDataEnvelope<T> = T extends (infer U)[] ? DataListEnvelope<U> : DataEnvelope<T>;

