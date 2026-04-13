import { EntityRef } from "../common";

export type Dataset = EntityRef<"dataset"> & {
    files: number;
    date: string;
    size: number;
}

export type DatasetFile = EntityRef<"dataset-file"> & {
    filePath: string;
    decryptedSize: number;
    checksums: string[];
    downloadUrl: string;
    dataset: EntityRef<"dataset">;
}

export type User = {
    username: string;
}