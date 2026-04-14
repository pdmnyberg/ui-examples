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

export type Token = {
    payload: {
        iss: string;
        sub: string;
        aud: string;
        iat: number;
        exp: number;
        jti: string
    }
    header: {
        alg: string;
        typ: string;
        kid: string;
    }
}

