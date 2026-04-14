import { createContext, useContext } from "react";
import { DataSource, StaticDataSource } from "../common";
import { Dataset, DatasetFile, Token } from "./types";
import { v4 as uuidv4 } from "uuid";


export type SDADData = {
    datasets: DataSource<Dataset>,
    files: DataSource<DatasetFile>,
    token: Token,
};

export const DataContext = createContext<SDADData | null>(null);

export function createMockToken(rootUrl: string): Token {
    rootUrl = rootUrl || "http://mock-issuer.example.edu"
    return {
        payload: {
            iss: rootUrl,
            sub: "mock.user@mock.example.edu",
            aud: "abc123",
            iat: new Date().getTime(),
            exp: new Date().getTime() + 3600000,
            jti: uuidv4(),
        },
        header: {
            alg: "RS256",
            typ: "JWT",
            kid: "rsa1"
        }
    }
}

export function useData(): SDADData {
    const data = useContext(DataContext);

    if (!data) {
        const basePath = process.env.NEXT_PUBLIC_API_URL || "";
        return {
            datasets: new StaticDataSource<Dataset>([]),
            files: new StaticDataSource<DatasetFile>([]),
            token: createMockToken(basePath),
        }
    }

    return data;
}