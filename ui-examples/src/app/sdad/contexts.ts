import { createContext, useContext } from "react";
import { DataSource, StaticDataSource } from "../common";
import { Dataset, DatasetFile, User } from "./types";


export type SDADData = {
    datasets: DataSource<Dataset>,
    files: DataSource<DatasetFile>,
    user: User,
};

export const DataContext = createContext<SDADData | null>(null);

export function useData(): SDADData {
    const data = useContext(DataContext);

    if (!data) {
        return {
            datasets: new StaticDataSource<Dataset>([]),
            files: new StaticDataSource<DatasetFile>([]),
            user: {
                username: "",
            }
        }
    }

    return data;
}