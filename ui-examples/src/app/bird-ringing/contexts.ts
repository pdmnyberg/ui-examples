import { createContext, useContext } from "react";
import { DataSource, StaticDataSource, DataAPI } from "./common";

export const DataSourceContext = createContext<DataSource>(new StaticDataSource({}, {}, {}, {}, [], {}, {}, {}, {}, true));

export function useDataSource() {
    return useContext(DataSourceContext);
}

export const DataContext = createContext<DataAPI | null>(null);

export function useDataAPI() {
    const data = useContext(DataContext);
    if (data) {
        return data;
    }
    throw new Error("No Data API available.")
}